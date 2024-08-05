import os
import requests
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import librosa
import csv
from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
from flask_cors import CORS
import speech_recognition as sr
from pydub import AudioSegment
import tempfile
import joblib
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024
CORS(app, resources={r"/*": {"origins": "*"}})

def load_wav_16k_mono(filename):
    """Load a WAV file and resample it to 16 kHz single-channel audio."""
    audio, sr = librosa.load(filename, sr=16000, mono=True)
    return audio

def class_names_from_csv(class_map_csv_text):
    """Returns list of class names corresponding to score vector."""
    class_names = []
    with tf.io.gfile.GFile(class_map_csv_text) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            class_names.append(row['display_name'])
    return class_names


commonSounds = {
    "Speech": {
        "present": "indistinct / foreign chatter",
        "presentParticle": "indistinct / foreign chatter"
    },
    "Child speech, kid speaking": {
        "present": "children speaking",
        "presentParticle": "children speaking"
    },
    "Conversation": {
        "present": "indistinct / foreign chatter",
        "presentParticle": "indistinct / foreign chatter"
    },
    "Babbling": {
        "present": "indistinct / foreign chatter",
        "presentParticle": "indistinct / foreign chatter"
    },
    "Shout": {
        "present": "shouting",
        "presentParticle": "shouts"
    },
    "Bellow": {
        "present": "shouting",
        "presentParticle": "shouts"
    },
    "Whoop": {
        "present": "shouting",
        "presentParticle": "shouts"
    },
    "Yell": {
        "present": "shouting",
        "presentParticle": "shouts"
    },
    "Children shouting": {
        "present": "children shouting",
        "presentParticle": "children shout"
    },

    "Screaming": {
        "present": "screaming",
        "presentParticle": "screams"
    },
    "Whispering": {
        "present": "whispering",
        "presentParticle": "whispers"
    },
    "Laughter": {
        "present": "laughing",
        "presentParticle": "laughs"
    },
    "Baby laughter": {
        "present": "baby laughing",
        "presentParticle": "baby laughs"
    },
    "Giggle": {
        "present": "giggling",
        "presentParticle": "giggles"
    },
    "Snicker": {
        "present": "snickering",
        "presentParticle": "snickers"
    },
    "Belly laugh": {
        "present": "laughing",
        "presentParticle": "laughs"
    },
    "Chuckle, chortle": {
        "present": "chuckling",
        "presentParticle": "chuckles"
    },
    "Crying, sobbing": {
        "present": "crying / sobbing",
        "presentParticle": "cries / sobs"
    },
    "Baby cry, infant cry": {
        "present": "baby / infant crying",
        "presentParticle": "baby / infant cries"
    },
    "Whimper": {
        "present": "whimpering",
        "presentParticle": "whimpers"
    },
    "Wail, moan": {
        "present": "wailing / moaning",
        "presentParticle": "wails / moans"
    },
    "Sigh": {
        "present": "sighing",
        "presentParticle": "sighs"
    },
    "Singing": {
        "present": "sighing",
        "presentParticle": "sighs"
    },
    "Choir": {
        "present": "sighing",
        "presentParticle": "sighs"
    },
    "Yodeling": {
        "present": "sighing",
        "presentParticle": "sighs"
    },
    "Chant": {
        "present": "chanting",
        "presentParticle": "chants"
    },
    "Mantra": {
        "present": "humming",
        "presentParticle": "hums"
    },
    "Child singing": {
        "present": "child singing",
        "presentParticle": "child sings"
    },
    "Synthetic singing": {
        "present": "synthetic singing",
        "presentParticle": "synthetic sings"
    },
    "Rapping": {
        "present": "rapping",
        "presentParticle": "raps"
    },
    "Humming": {
        "present": "humming",
        "presentParticle": "hums"
    },
    "Groan": {
        "present": "groaning",
        "presentParticle": "groans"
    },
    "Grunt": {
        "present": "grunting",
        "presentParticle": "grunts"
    },
    "Whistling": {
        "present": "whistling",
        "presentParticle": "whistles"
    },
    "Whispers": {
        "present": "whispering",
        "presentParticle": "whispers"
    },
    "Breathing": {
        "present": "breathing heavely / breathing shakily",
        "presentParticle": "breathes heavely / breathes shakily"
    },
    "Wheeze": {
        "present": "wheezing",
        "presentParticle": "wheezes"
    },
    "Snoring": {
        "present": "snoring",
        "presentParticle": "snores"
    },
    "Gasp": {
        "present": "gasping",
        "presentParticle": "gasps"
    },
    "Pant": {
        "present": "panting",
        "presentParticle": "pants"
    },
    "Snort": {
        "present": "snorting",
        "presentParticle": "snorts"
    },
    "Cough": {
        "present": "coughing",
        "presentParticle": "coughs"
    },
    "Throat clearing": {
        "present": "clearing throat",
        "presentParticle": "clears throat"
    },
    "Sneeze": {
        "present": "sneezing",
        "presentParticle": "sneezes"
    },
    "Sniff": {
        "present": "sniffing",
        "presentParticle": "sniffs"
    },
    "Run": {
        "present": "footsteps pattering",
        "presentParticle": "footsteps patter"
    },
    "Shuffle": {
        "present": "footsteps shuffling",
        "presentParticle": "footsteps shuffles"
    },
    "Walk, footsteps": {
        "present": "footsteps tapping",
        "presentParticle": "footsteps taps"
    },
    "Chewing, mastication": {
        "present": "munching",
        "presentParticle": "munches"
    },
    "Biting": {
        "present": "crunching",
        "presentParticle": "crunches"
    },
    "Gargling": {
        "present": "gargling",
        "presentParticle": "gargles"
    },
    "Stomach rumble": {
        "present": "stomach rumbling",
        "presentParticle": "stomach rumbles"
    },
    "Burping, eructation": {
        "present": "burping",
        "presentParticle": "burps"
    },
    "Hiccup": {
        "present": "hiccuping",
        "presentParticle": "hiccups"
    },
    "Fart": {
        "present": "farting",
        "presentParticle": "farts"
    },
    "Hands": {
        "present": "hands clapping",
        "presentParticle": "hands claps"
    },
    "Finger snapping": {
        "present": "snapping fingers",
        "presentParticle": "snaps fingers"
    },
    "Clapping": {
        "present": "hands clapping",
        "presentParticle": "hands claps"
    },
    "Heart sounds, heartbeat": {
        "present": "heartbeat beating",
        "presentParticle": "heartbeat beats"
    },
    "Heart murmur": {
        "present": "heart murmuring",
        "presentParticle": "Heart murmurs"
    },
    "Cheering": {
        "present": "cheering",
        "presentParticle": "cheers"
    },
    "Applause": {
        "present": "applauding",
        "presentParticle": "applauds"
    },
    "Chatter": {
        "present": "indistict chatters",
        "presentParticle": "indistict chatters"
    },
    "Crowd": {
        "present": "crowd murmuring",
        "presentParticle": "crowd murmurs"
    },
    "Hubbub, speech noise, speech babble": {
        "present": "indistict chatters",
        "presentParticle": "indistict chatters"
    },
    "Children playing": {
        "present": "children chatter",
        "presentParticle": "children chatter"
    },
    "Animal": {
        "present": "animal wailing",
        "presentParticle": "animal wails"
    },
    "Domestic animals, pets": {
        "present": "pet howling",
        "presentParticle": "pet howls"
    },
    "Dog": {
        "present": "dog howling",
        "presentParticle": "dog howls"
    },
    "Bark": {
        "present": "dog barking",
        "presentParticle": "dog barks"
    },
    "Yip": {
        "present": "dog yipping",
        "presentParticle": "dog yips"
    },
    "Howl": {
        "present": "howling",
        "presentParticle": "howls"
    },
    "Bow-wow": {
        "present": "dog barking",
        "presentParticle": "dog barks"
    },
    "Growling": {
        "present": "growling",
        "presentParticle": "growls"
    },
    "Whimper (dog)": {
        "present": "dog whimpering",
        "presentParticle": "dog whimpers"
    },
    "Cat": {
        "present": "cat roaring",
        "presentParticle": "cat roars"
    },
    "Purr": {
        "present": "cat murmuring",
        "presentParticle": "cat murmurs"
    },
    "Meow": {
        "present": "meowing",
        "presentParticle": "meows"
    },
    "Hiss": {
        "present": "hissing",
        "presentParticle": "hisses"
    },
    "Caterwaul": {
        "present": "caterwauling",
        "presentParticle": "caterwauls"
    },
    "Livestock, farm animals, working animals": {
        "present": "animal grunting",
        "presentParticle": "animal grunts"
    },
    "Horse": {
        "present": "horse nickering",
        "presentParticle": "horse nickers"
    },
    "Clip-clop": {
        "present": "horse clumping",
        "presentParticle": "horse clumps"
    },
    "Neigh, whinny": {
        "present": "horse whinnying",
        "presentParticle": "horse whinnies"
    },
    "Cattle, bovinae": {
        "present": "cattle mooing",
        "presentParticle": "cattle moos"
    },
    "Moo": {
        "present": "livestock mooing",
        "presentParticle": "livestock moos"
    },
    "Cowbell": {
        "present": "cowbell tolling",
        "presentParticle": "cowbell tolls"
    },
    "Pig": {
        "present": "pig grunting",
        "presentParticle": "pig grunts"
    },
    "Oink": {
        "present": "pig oinks",
        "presentParticle": "pig oinks"
    },
    "Goat": {
        "present": "goat bleating",
        "presentParticle": "goat bleats"
    },
    "Bleat": {
        "present": "goat bleating",
        "presentParticle": "goat bleats"
    },
    "Sheep": {
        "present": "sheep bleating",
        "presentParticle": "sheep bleats"
    },
    "Fowl": {
        "present": "fowl clucking",
        "presentParticle": "fowl clucks"
    },
    "Chicken, rooster": {
        "present": "rooster clucking",
        "presentParticle": "rooster clucks"
    },
    "Cluck": {
        "present": "chicken clucking",
        "presentParticle": "chicken clucks"
    },
    "Crowing, cock-a-doodle-doo": {
        "present": "roaster crowing",
        "presentParticle": "roster crows"
    },
    "Turkey": {
        "present": "turkey gobbling",
        "presentParticle": "turkey gobbles"
    },
    "Gobble": {
        "present": "gobbling",
        "presentParticle": "gobbles"
    },
    "Duck": {
        "present": "duck quacking",
        "presentParticle": "duck quacks"
    },
    "Quack": {
        "present": "quacking",
        "presentParticle": "quacks"
    },
    "Goose": {
        "present": "goose hissing",
        "presentParticle": "goose hisses"
    },
    "Honk": {
        "present": "goose honking",
        "presentParticle": "goose honks"
    },
    "Wild animals": {
        "present": "roaring",
        "presentParticle": "roars"
    },
    "Roaring cats (lions, tigers)": {
        "present": "big cat roaring",
        "presentParticle": "big cat roars"
    },
    "Roar": {
        "present": "roaring",
        "presentParticle": "roars"
    },
    "Bird": {
        "present": "birds chirping",
        "presentParticle": "birds chirps"
    },
    "Bird vocalization, bird call, bird song": {
        "present": "birds chirping",
        "presentParticle": "birds chirps"
    },
    "Chirp, tweet": {
        "present": "birds chirping",
        "presentParticle": "birds chirps"
    },
    "Squawk": {
        "present": "birds squawking",
        "presentParticle": "birds squawks"
    },
    "Pigeon, dove": {
        "present": "birds chirping",
        "presentParticle": "birds chirps"
    },
    "Squawk": {
        "present": "birds squawking",
        "presentParticle": "birds squawks"
    },
    "Coo": {
        "present": "dove cooing",
        "presentParticle": "dove cooing"
    },
    "Crow": {
        "present": "crow cooing",
        "presentParticle": "crow cooing"
    },
    "Caw": {
        "present": "caw cooing",
        "presentParticle": "caw cooing"
    },
    "Owl": {
        "present": "owl hissing",
        "presentParticle": "owl hisses"
    },
    "Hoot": {
        "present": "owl hooting",
        "presentParticle": "owl hoots"
    },
    "Canidae, dogs, wolves": {
        "present": "howling",
        "presentParticle": "howls"
    },
    "Rodents, rats, mice": {
        "present": "rodent squeaking",
        "presentParticle": "rodent squeaks"
    },
    "Mouse": {
        "present": "mouse squeaking",
        "presentParticle": "mouse squeaks"
    },
    "Patter": {
        "present": "pattering",
        "presentParticle": "patters"
    },
    "Insect": {
        "present": "insect chirping",
        "presentParticle": "insect chirping"
    },
    "Cricket": {
        "present": "crickets chirping",
        "presentParticle": "crickets chirp"
    },
    "Mosquito": {
        "present": "mosquito buzzing",
        "presentParticle": "mosquito buzzes"
    },
    "Fly, housefly": {
        "present": "fly buzzing",
        "presentParticle": "fly buzzes"
    },
    "Buzz": {
        "present": "buzzing",
        "presentParticle": "buzzes"
    },
    "Bee, wasp, etc.": {
        "present": "bees buzzing",
        "presentParticle": "bees buzzes"
    },
    "Frog": {
        "present": "frog croaking",
        "presentParticle": "frog croaks"
    },
    "Croak": {
        "present": "frog croaking",
        "presentParticle": "frog croaks"
    },
    "Snake": {
        "present": "snake hissing",
        "presentParticle": "snake hisses"
    },
    "Rattle": {
        "present": "snake rattling",
        "presentParticle": "snake rattles"
    },
    "Whale vocalization": {
        "present": "whale whining",
        "presentParticle": "whale whines"
    },
    "Musical instrument": {
        "present": "musical instrument",
        "presentParticle": "musical instrument"
    },
    "Plucked string instrument": {
        "present": "violin playing",
        "presentParticle": "violin plays"
    },
    "Guitar": {
        "present": "guitar playing",
        "presentParticle": "guitar plays"
    },
    "Electric guitar": {
        "present": "electrical guitar playing",
        "presentParticle": "electrical guitar plays"
    },
    "Bass guitar": {
        "present": "bass guitar playing",
        "presentParticle": "bass guitar plays"
    },
    "Acoustic guitar": {
        "present": "acoustic guitar playing",
        "presentParticle": "acoustic guitar plays"
    },
    "Steel guitar, slide guitar": {
        "present": "guitar playing",
        "presentParticle": "guitar plays"
    },
    "Tapping (guitar technique)": {
        "present": "guitar playing",
        "presentParticle": "guitar plays"
    },
    "Strum": {
        "present": "guitar playing",
        "presentParticle": "guitar plays"
    },
    "Banjo": {
        "present": "banjo playing",
        "presentParticle": "banjo plays"
    },
    "Sitar": {
        "present": "sitar playing",
        "presentParticle": "sitar plays"
    },
    "Mandolin": {
        "present": "mandolin playing",
        "presentParticle": "mandolin plays"
    },
    "Zither": {
        "present": "strings playing",
        "presentParticle": "strings play"
    },
    "Ukulele": {
        "present": "ukulele playing",
        "presentParticle": "ukulele plays"
    },
    "Keyboard (musical)": {
        "present": "keyboard playing",
        "presentParticle": "keyboard plays"
    },
    "Piano": {
        "present": "piano playing",
        "presentParticle": "piano plays"
    },
    "Electric piano": {
        "present": "piano playing",
        "presentParticle": "piano plays"
    },
    "Organ": {
        "present": "organ playing",
        "presentParticle": "organ plays"
    },
    "Electronic organ": {
        "present": "organ playing",
        "presentParticle": "organ plays"
    },
    "Hammond organ": {
        "present": "organ playing",
        "presentParticle": "organ plays"
    },
    "Synthesizer": {
        "present": "organ playing",
        "presentParticle": "organ plays"
    },
    "Sampler": {
        "present": "sampler music instrument playing",
        "presentParticle": "sampler music instrument plays"
    },
    "Harpsichord": {
        "present": "keyboard instrument playing",
        "presentParticle": "keyboard instrument plays"
    },
    "Percussion": {
        "present": "percussion sounds",
        "presentParticle": "percussion sounds"
    },

    "Drum kit": {
        "present": "drums rolling",
        "presentParticle": "drums roll"
    },
    "Drum machine": {
        "present": "drums rolling",
        "presentParticle": "drums roll"
    },
    "Drum": {
        "present": "drums rolling",
        "presentParticle": "drums roll"
    },
    "Snare drum": {
        "present": "drums rolling",
        "presentParticle": "drums roll"
    },
    "Rimshot": {
        "present": "rimshot instrument playing",
        "presentParticle": "rimshot instrument plays"
    },
    "Drum roll": {
        "present": "drums rolling",
        "presentParticle": "drums roll"
    },
    "Bass drum": {
        "present": "bass drum rolling",
        "presentParticle": "bass drum rolls"
    },
    "Timpani": {
        "present": "timpani playing",
        "presentParticle": "timpani plays"
    },
    "Tabla": {
        "present": "tabla playing",
        "presentParticle": "tabla plays"
    },
    "Cymbal": {
        "present": "cymbals playing",
        "presentParticle": "cymbals play"
    },
    "Hi-hat": {
        "present": "drum beats",
        "presentParticle": "drum beats"
    },
    "Wood block": {
        "present": "wood block playing",
        "presentParticle": "wood block plays"
    },
    "Tambourine": {
        "present": "tambourine playing",
        "presentParticle": "tambourine plays"
    },
    "Rattle (instrument)": {
        "present": "rattles playing",
        "presentParticle": "rattles play"
    },
    "Maraca": {
        "present": "rattles playing",
        "presentParticle": "rattles play"
    },
    "Gong": {
        "present": "drum beats",
        "presentParticle": "drum beats"
    },
    "Tubular bells": {
        "present": "percussion sounds",
        "presentParticle": "percussion sounds"
    },
    "Mallet percussion": {
        "present": "percussion sounds",
        "presentParticle": "percussion sounds"
    },
    "Marimba, xylophone": {
        "present": "marimba instrument playing",
        "presentParticle": "marimba instrument plays"
    },
    "Glockenspiel": {
        "present": "orchestra bells playing",
        "presentParticle": "orchestra bells plays"
    },
    "Vibraphone": {
        "present": "percussion instrument playing",
        "presentParticle": "percussion instrument plays"
    },
    "Steelpan": {
        "present": "steelpan drum playing",
        "presentParticle": "steelpan drum plays"
    },
    "Orchestra": {
        "present": "orchestra music playing",
        "presentParticle": "orchestra music plays"
    },
    "Brass instrument": {
        "present": "brass instrument playing",
        "presentParticle": "brass instrument plays"
    },
    "French horn": {
        "present": "brass instrument playing",
        "presentParticle": "brass instrument plays"
    },
    "Trumpet": {
        "present": "brass instrument playing",
        "presentParticle": "brass instrument plays"
    },
    "Trombone": {
        "present": "brass instrument playing",
        "presentParticle": "brass instrument plays"
    },
    "Bowed string instrument": {
        "present": "strings playing",
        "presentParticle": "strings play"
    },
    "String section": {
        "present": "strings playing",
        "presentParticle": "strings play"
    },
    "Violin, fiddle": {
        "present": "strings playing",
        "presentParticle": "strings play"
    },
    "Pizzicato": {
        "present": "strings playing",
        "presentParticle": "strings play"
    },
    "Cello": {
        "present": "strings playing",
        "presentParticle": "strings play"
    },
    "Double bass": {
        "present": "strings playing",
        "presentParticle": "strings play"
    },
    "Wind instrument, woodwind instrument": {
        "present": "wind instrument playing",
        "presentParticle": "wind instrument plays"
    },
    "Flute": {
        "present": "wind instrument playing",
        "presentParticle": "wind instrument plays"
    },
    "Saxophone": {
        "present": "wind instrument playing",
        "presentParticle": "wind instrument plays"
    },
    "Clarinet": {
        "present": "wind instrument playing",
        "presentParticle": "wind instrument plays"
    },
    "Harp": {
        "present": "harp playing",
        "presentParticle": "harp plays"
    },
    "Bell": {
        "present": "bell ringing",
        "presentParticle": "bell rings"
    },

    "Church bell": {
        "present": "church bell tolling",
        "presentParticle": "church bell tolls"
    },
    "Jingle bell": {
        "present": "bell ringing",
        "presentParticle": "bell rings"
    },
    "Bicycle bell": {
        "present": "bicycle bell chiming",
        "presentParticle": "bicycle bell chimes"
    },
    "Chime": {
        "present": "chimes ringing",
        "presentParticle": "chimes ring"
    },
    "Wind chime": {
        "present": "chimes ringing",
        "presentParticle": "chimes ring"
    },
    "Change ringing (campanology)": {
        "present": "bell ringing",
        "presentParticle": "bell rings"
    },

    "Harmonica": {
        "present": "harmonica playing",
        "presentParticle": "harmonica plays"
    },
    "Accordion": {
        "present": "accordion playing",
        "presentParticle": "accordion plays"
    },
    "Bagpipes": {
        "present": "bagpipe playing",
        "presentParticle": "bagpipe plays"
    },
    "Didgeridoo": {
        "present": "didgeridoo playing",
        "presentParticle": "didgeridoo plays"
    },
    "Shofar": {
        "present": "shofar playing",
        "presentParticle": "shofar plays"
    },
    "Theremin": {
        "present": "electronic instrument playing",
        "presentParticle": "electronic instrument plays"
    },
    "Pop music": {
        "present": "pop music",
        "presentParticle": "pop music"
    },
    "Hip hop music": {
        "present": "hip hop music",
        "presentParticle": "hip hop music"
    },
    "Beatboxing": {
        "present": "beatboxing",
        "presentParticle": "beatboxing"
    },
    "Rock music": {
        "present": "rock music",
        "presentParticle": "rock music"
    },
    "Heavy metal": {
        "present": "heavy metal music",
        "presentParticle": "heavy metal"
    },
    "Punk rock": {
        "present": "punk rock music",
        "presentParticle": "punk rock music"
    },
    "Grunge": {
        "present": "grunge music",
        "presentParticle": "rock music"
    },
    "Progressive rock": {
        "present": "rock music",
        "presentParticle": "rock music"
    },
    "Progressive rock": {
        "present": "rock music",
        "presentParticle": "rock music"
    },
    "Rock and roll": {
        "present": "rock and roll music",
        "presentParticle": "rock and roll music"
    },
    "Psychedelic rock": {
        "present": "rock music",
        "presentParticle": "rock music"
    },
    "Rhythm and blues": {
        "present": "rhythm and blues music",
        "presentParticle": "rhythm and blues music"
    },
    "Soul music": {
        "present": "soul music",
        "presentParticle": "soul music"
    },
    "Reggae": {
        "present": "reggae music",
        "presentParticle": "reggae music"
    },
    "Country": {
        "present": "country music",
        "presentParticle": "country music"
    },
    "Swing music": {
        "present": "swing music",
        "presentParticle": "swing music"
    },
    "Bluegrass": {
        "present": "bluegrass music",
        "presentParticle": "bluegrass music"
    },
    "Funk": {
        "present": "funk music",
        "presentParticle": "funk music"
    },
    "Folk music": {
        "present": "folk music",
        "presentParticle": "folk music"
    },
    "Middle Eastern music": {
        "present": "middle eastern music",
        "presentParticle": "middle eastern music"
    },
    "Jazz": {
        "present": "jazz music",
        "presentParticle": "jazz music"
    },
    "Disco": {
        "present": "disco music",
        "presentParticle": "disco music"
    },
    "Classical music": {
        "present": "classical music",
        "presentParticle": "classical music"
    },
    "Opera": {
        "present": "opera music",
        "presentParticle": "opera music"
    },
    "Electronic music": {
        "present": "electronic music",
        "presentParticle": "electronic music"
    },
    "House music": {
        "present": "house music",
        "presentParticle": "house music"
    },
    "Techno": {
        "present": "techno music",
        "presentParticle": "techno music"
    },
    "Dubstep": {
        "present": "dubstep music",
        "presentParticle": "dubstep music"
    },
    "Drum and bass": {
        "present": "drum and bass music",
        "presentParticle": "drum and bass music"
    },
    "Electronica": {
        "present": "electronica music",
        "presentParticle": "electronica music"
    },
    "Electronic dance music": {
        "present": "electronic dance music",
        "presentParticle": "electronic dance music"
    },
    "Ambient music": {
        "present": "ambient music",
        "presentParticle": "ambient music"
    },
    "Trance music": {
        "present": "trance music",
        "presentParticle": "trance music"
    },
    "Music of Latin America": {
        "present": "latin music",
        "presentParticle": "latin music"
    },
    "Salsa music": {
        "present": "salsa music",
        "presentParticle": "salsa music"
    },
    "Flamenco": {
        "present": "flamenco music",
        "presentParticle": "flamenco music"
    },
    "Blues": {
        "present": "blues music",
        "presentParticle": "blues music"
    },
    "Music for children": {
        "present": "child music",
        "presentParticle": "child music"
    },
    "New-age music": {
        "present": "new-age music",
        "presentParticle": "new-age music"
    },
    "Vocal music": {
        "present": "vocals",
        "presentParticle": "vocals"
    },
    "A capella": {
        "present": "acapella music",
        "presentParticle": "acapella music"
    },

    "Music of Africa": {
        "present": "african music",
        "presentParticle": "african music"
    },
    "Afrobeat": {
        "present": "afrobeat music",
        "presentParticle": "afrobeat music"
    },
    "Christian music": {
        "present": "gospel music",
        "presentParticle": "gospel music"
    },
    "Gospel music": {
        "present": "gospel music",
        "presentParticle": "gospel music"
    },
    "Music of Asia": {
        "present": "asian music",
        "presentParticle": "asian music"
    },
    "Carnatic music": {
        "present": "carnatic music",
        "presentParticle": "carnatic music"
    },
    "Music of Bollywood": {
        "present": "bollywood music",
        "presentParticle": "bollywood music"
    },
    "Ska": {
        "present": "ska music",
        "presentParticle": "ska music"
    },
    "Traditional music": {
        "present": "traditional music",
        "presentParticle": "traditional music"
    },
    "Independent music": {
        "present": "independent music",
        "presentParticle": "independent music"
    },
    "Song": {
        "present": "music playing",
        "presentParticle": "music playing"
    },
    "Background music": {
        "present": "music playing",
        "presentParticle": "music playing"
    },
    "Theme music": {
        "present": "music playing",
        "presentParticle": "music playing"
    },
    "Jingle (music)": {
        "present": "music playing",
        "presentParticle": "music playing"
    },
    "Soundtrack music": {
        "present": "music playing",
        "presentParticle": "music playing"
    },
    "Lullaby": {
        "present": "lullaby music",
        "presentParticle": "lullaby music"
    },
    "Video game music": {
        "present": "video game music",
        "presentParticle": "video game music"
    },
    "Christmas music": {
        "present": "christmas music",
        "presentParticle": "christmas music"
    },
    "Dance music": {
        "present": "dance music",
        "presentParticle": "dance music"
    },
    "Wedding music": {
        "present": "wedding music",
        "presentParticle": "wedding music"
    },
    "Happy music": {
        "present": "uplifting music",
        "presentParticle": "uplifting music"
    },
    "Sad music": {
        "present": "sombre music",
        "presentParticle": "sombre music"
    },
    "Tender music": {
        "present": "tender music",
        "presentParticle": "tender music"
    },
    "Exciting music": {
        "present": "uplifting music",
        "presentParticle": "uplifting music"
    },
    "Angry music": {
        "present": "tense music",
        "presentParticle": "tense music"
    },
    "Scary music": {
        "present": "ominous music",
        "presentParticle": "ominous music"
    },
    "Wind": {
        "present": "wind howling",
        "presentParticle": "wind howls"
    },
    "Rustling leaves": {
        "present": "leaves rustling",
        "presentParticle": "leaves rustles"
    },
    "Wind noise (microphone)": {
        "present": "wind rumbling",
        "presentParticle": "wind rumbles"
    },
    "Thunderstorm": {
        "present": "thunder banging",
        "presentParticle": "thunder bangs"
    },
    "Thunder": {
        "present": "thunder rumbling",
        "presentParticle": "thunder rumbles"
    },
    "Water": {
        "present": "water splashing",
        "presentParticle": "water splashes"
    },
    "Rain": {
        "present": "rain falling",
        "presentParticle": "rain falls"
    },
    "Raindrop": {
        "present": "rain falling",
        "presentParticle": "rain falls"
    },
    "Rain on surface": {
        "present": "rain falling",
        "presentParticle": "rain falls"
    },
    "Stream": {
        "present": "water streaming",
        "presentParticle": "water streams"
    },
    "Waterfall": {
        "present": "waterfall crashing",
        "presentParticle": "waterfall crashes"
    },
    "Ocean": {
        "present": "ocean rumbling",
        "presentParticle": "ocean rumbles"
    },
    "Waves, surf": {
        "present": "waves crashing",
        "presentParticle": "waves crash"
    },
    "Steam": {
        "present": "steam rising",
        "presentParticle": "steam rises"
    },
    "Gurgling": {
        "present": "water gurgling",
        "presentParticle": "water gurgles"
    },
    "Fire": {
        "present": "fire crackling",
        "presentParticle": "fire crackles"
    },
    "Crackle": {
        "present": "crackling",
        "presentParticle": "crackles"
    },
    "Vehicle": {
        "present": "vehicle noises",
        "presentParticle": "vehicle noises"
    },
    "Boat, Water vehicle": {
        "present": "vessel moving",
        "presentParticle": "vessel moves"
    },
    "Sailboat, sailing ship": {
        "present": "vessel moving",
        "presentParticle": "vessel moves"
    },
    "Rowboat, canoe, kayak": {
        "present": "vessel moving",
        "presentParticle": "vessel moves"
    },
    "Motorboat, speedboat": {
        "present": "motorized vessel",
        "presentParticle": "motorized vessel"
    },
    "Ship": {
        "present": "motorized vessel",
        "presentParticle": "motorized vessel"
    },
    "Motor vehicle (road)": {
        "present": "vehicle noises",
        "presentParticle": "vehicle noises"
    },
    "Car": {
        "present": "car noises",
        "presentParticle": "car noises"
    },
    "Vehicle horn, car horn, honking": {
        "present": "car honking",
        "presentParticle": "car honks"
    },
    "Toot": {
        "present": "honking",
        "presentParticle": "honks"
    },
    "Car alarm": {
        "present": "car alarm ringing",
        "presentParticle": "car alarm ringing"
    },
    "Power windows, electric windows": {
        "present": "window gliding",
        "presentParticle": "window glides"
    },
    "Skidding": {
        "present": "tire skidding",
        "presentParticle": "tire skids"
    },
    "Tire squeal": {
        "present": "tire squealing",
        "presentParticle": "tire squeals"
    },
    "Car passing by": {
        "present": "vehicle noises",
        "presentParticle": "vehicle noises"
    },
    "Race car, auto racing": {
        "present": "vehicle noises",
        "presentParticle": "vehicle noises"
    },
    "Truck": {
        "present": "truck noises",
        "presentParticle": "truck noises"
    },
    "Air brake": {
        "present": "air brake bursting",
        "presentParticle": "air brake bursting"
    },
    "Air horn, truck horn": {
        "present": "truck honking",
        "presentParticle": "truck honks"
    },
    "Reversing beeps": {
        "present": "reverse sensor beeping",
        "presentParticle": "reverse sensor beeps"
    },
    "Ice cream truck, ice cream van": {
        "present": "ice cream truck ringing",
        "presentParticle": "ice cream truck rings"
    },
    "Bus": {
        "present": "bus noises",
        "presentParticle": "bus noises"
    },
    "Emergency vehicle": {
        "present": "sirens wailing",
        "presentParticle": "sirens wail"
    },
    "Police car (siren)": {
        "present": "sirens wailing",
        "presentParticle": "sirens wail"
    },
    "Ambulance (siren)": {
        "present": "sirens wailing",
        "presentParticle": "sirens wail"
    },
    "Fire engine, fire truck (siren)": {
        "present": "sirens wailing",
        "presentParticle": "sirens wail"
    },
    "Motorcycle": {
        "present": "motorcycle noise",
        "presentParticle": "motorcycle noise"
    },
    "Traffic noise, roadway noise": {
        "present": "traffic bustling",
        "presentParticle": "traffic bustles"
    },
    "Rail transport": {
        "present": "rail transport noise",
        "presentParticle": "rail transport noise"
    },
    "Train": {
        "present": "train whistling",
        "presentParticle": "train whistles"
    },
    "Train whistle": {
        "present": "train whistling",
        "presentParticle": "train whistles"
    },
    "Train horn": {
        "present": "train sounds",
        "presentParticle": "train sounds"
    },
    "Railroad car, train wagon": {
        "present": "train sounds",
        "presentParticle": "train sounds"
    },
    "Train wheels squealing": {
        "present": "train sounds",
        "presentParticle": "train sounds"
    },
    "Subway, metro, underground": {
        "present": "subway sounds",
        "presentParticle": "subway sounds"
    },
    "Aircraft": {
        "present": "aircraft sounds",
        "presentParticle": "aircraft sounds"
    },
    "Aircraft engine": {
        "present": "aircraft sounds",
        "presentParticle": "aircraft sounds"
    },
    "Jet engine": {
        "present": "aircraft sounds",
        "presentParticle": "aircraft sounds"
    },
    "Propeller, airscrew": {
        "present": "aircraft sounds",
        "presentParticle": "aircraft sounds"
    },
    "Helicopter": {
        "present": "helicopter hovering",
        "presentParticle": "helicopter hovers"
    },
    "Fixed-wing aircraft, airplane": {
        "present": "aircraft sounds",
        "presentParticle": "aircraft sounds"
    },
    "Bicycle": {
        "present": "bicycle ticking",
        "presentParticle": "bicycle ticks"
    },
    "Yell": {
        "present": "shouting",
        "presentParticle": "shouts"
    },
    "Skateboard": {
        "present": "skateboard",
        "presentParticle": "skateboard"
    },
    "Engine": {
        "present": "engine roaring",
        "presentParticle": "engine roars"
    },
    "Light engine (high frequency)": {
        "present": "engine roaring",
        "presentParticle": "engine roars"
    },
    "Dental drill, dentist's drill": {
        "present": "drill ringing",
        "presentParticle": "drill rings"
    },
    "Lawn mower": {
        "present": "lawn mover whirring",
        "presentParticle": "lawn mover whirs"
    },
    "Chainsaw": {
        "present": "chainsaw grinding",
        "presentParticle": "chainsaw grinds"
    },
    "Medium engine (mid frequency)": {
        "present": "engine roaring",
        "presentParticle": "engine roars"
    },
    "Heavy engine (low frequency)": {
        "present": "engine roaring",
        "presentParticle": "engine roars"
    },
    "Engine knocking": {
        "present": "engine sounds",
        "presentParticle": "engine sounds"
    },
    "Engine starting": {
        "present": "engine sounds",
        "presentParticle": "engine sounds"
    },
    "Idling": {
        "present": "engine sounds",
        "presentParticle": "engine sounds"
    },
    "Accelerating, revving, vroom": {
        "present": "engine revving",
        "presentParticle": "engine revs"
    },
    "Door": {
        "present": "door sounds",
        "presentParticle": "door sounds"
    },
    "Doorbell": {
        "present": "doorbell ringing",
        "presentParticle": "doorbell rings"
    },
    "Ding-dong": {
        "present": "doorbell ringing",
        "presentParticle": "doorbell rings"
    },
    "Sliding door": {
        "present": "door sliding",
        "presentParticle": "door slides"
    },
    "Slam": {
        "present": "slamming",
        "presentParticle": "slams"
    },
    "Knock": {
        "present": "knocking",
        "presentParticle": "knocks"
    },
    "Tap": {
        "present": "tapping",
        "presentParticle": "taps"
    },
    "Squeak": {
        "present": "squeaking",
        "presentParticle": "squeaks"
    },
    "Cupboard open or close": {
        "present": "cupboard door sounds",
        "presentParticle": "cupboard door sounds"
    },
    "Drawer open or close": {
        "present": "drawer sounds",
        "presentParticle": "drawer sounds"
    },
    "Dishes, pots, and pans": {
        "present": "clinking",
        "presentParticle": "clinks"
    },
    "Cutlery, silverware": {
        "present": "clinking",
        "presentParticle": "clinks"
    },
    "Chopping (food)": {
        "present": "knife gobbling",
        "presentParticle": "knife gobbles"
    },
    "Frying (food)": {
        "present": "food sizzling",
        "presentParticle": "food sizzles"
    },
    "Microwave oven": {
        "present": "microwave beeping",
        "presentParticle": "microwave beeps"
    },
    "Blender": {
        "present": "blender grinding",
        "presentParticle": "blender grinds"
    },
    "Water tap, faucet": {
        "present": "water splashing",
        "presentParticle": "water splashes"
    },
    "Sink (filling or washing)": {
        "present": "water splashing",
        "presentParticle": "water splashes"
    },
    "Bathtub (filling or washing)": {
        "present": "water splashing",
        "presentParticle": "water splashes"
    },
    "Hair dryer": {
        "present": "hair dryer noise",
        "presentParticle": "hair dryer noise"
    },
    "Toilet flush": {
        "present": "toilet flushing",
        "presentParticle": "toilet flushes"
    },
    "Toothbrush": {
        "present": "toothbrush rubbing",
        "presentParticle": "toothbrush rubs"
    },
    "Electric toothbrush": {
        "present": "toothbrush rubbing",
        "presentParticle": "toothbrush rubs"
    },
    "Vacuum cleaner": {
        "present": "vacuum cleaner humming",
        "presentParticle": "vacuum cleaner hums"
    },
    "Zipper (clothing)": {
        "present": "zip sounds",
        "presentParticle": "zip sounds"
    },
    "Keys jangling": {
        "present": "keys jingling",
        "presentParticle": "keys jingles"
    },
    "Coin (dropping)": {
        "present": "coin clinking",
        "presentParticle": "coin clinks"
    },
    "Scissors": {
        "present": "scissors snipping",
        "presentParticle": "scissors snip"
    },
    "Electric shaver, electric razor": {
        "present": "shaver humming",
        "presentParticle": "shaver hums"
    },
    "Shuffling cards": {
        "present": "cards shuffling",
        "presentParticle": "cards shuffle"
    },
    "Typing": {
        "present": "keyboard clicking",
        "presentParticle": "keyboard clicks"
    },
    "Typewriter": {
        "present": "typewriter clicking",
        "presentParticle": "typewriter clicks"
    },
    "Computer keyboard": {
        "present": "keyboard clicking",
        "presentParticle": "keyboard clicks"
    },
    "Writing": {
        "present": "rustling",
        "presentParticle": "rustles"
    },
    "Alarm": {
        "present": "alarm blaring",
        "presentParticle": "alarm blares"
    },
    "Telephone": {
        "present": "telephone ringing",
        "presentParticle": "telephone rings"
    },
    "Telephone bell ringing": {
        "present": "telephone bell ringing",
        "presentParticle": "telephone bell rings"
    },
    "Ringtone": {
        "present": "cellphone ringing",
        "presentParticle": "cellphone rings"
    },
    "Telephone dialing, DTMF": {
        "present": "telephone dialing",
        "presentParticle": "telephone dials"
    },
    "Dial tone": {
        "present": "telephone dialing",
        "presentParticle": "telephone dials"
    },
    "Busy signal": {
        "present": "busy signal blaring",
        "presentParticle": "busy signal blares"
    },
    "Alarm clock": {
        "present": "alarm clock buzzing",
        "presentParticle": "alarm clock buzzes"
    },
    "Siren": {
        "present": "sirens wailing",
        "presentParticle": "sirens wails"
    },
    "Civil defense siren": {
        "present": "sirens wailing",
        "presentParticle": "sirens wails"
    },
    "Buzzer": {
        "present": "buzzer whirring",
        "presentParticle": "buzzer whirring"
    },
    "Smoke detector, smoke alarm": {
        "present": "smoke detector beeping / smoke alarm beeping",
        "presentParticle": "smoke detector beeps / smoke alarm beeps"
    },
    "Fire alarm": {
        "present": "fire alarm beeping",
        "presentParticle": "fire alarm beeps"
    },
    "Foghorn": {
        "present": "horn blaring",
        "presentParticle": "horn blares"
    },
    "Whistle": {
        "present": "whistling",
        "presentParticle": "whistles"
    },
    "Steam whistle": {
        "present": "steam whistling",
        "presentParticle": "steam whistles"
    },
    "Mechanisms": {
        "present": "mechanical sounds",
        "presentParticle": "mechanical sounds"
    },
    "Ratchet, pawl": {
        "present": "ratchet tightening",
        "presentParticle": "ratchet tightens"
    },
    "Clock": {
        "present": "clock ticking",
        "presentParticle": "clock ticks"
    },
    "Tick": {
        "present": "clock ticking",
        "presentParticle": "clock ticks"
    },
    "Tick-tock": {
        "present": "clock ticking",
        "presentParticle": "clock ticks"
    },
    "Gears": {
        "present": "gear rattling",
        "presentParticle": "gear rattles"
    },
    "Pulleys": {
        "present": "squealing",
        "presentParticle": "squealing"
    },
    "Sewing machine": {
        "present": "sewing machine humming",
        "presentParticle": "sewing machine hums"
    },
    "Mechanical fan": {
        "present": "mechanical sounds",
        "presentParticle": "mechanical sounds"
    },
    "Air conditioning": {
        "present": "air condtioner humming",
        "presentParticle": "air conditioner hums"
    },
    "Cash register": {
        "present": "cash register beeping",
        "presentParticle": "cash regitser beeps"
    },
    "Printer": {
        "present": "printer whirring",
        "presentParticle": "printer whirs"
    },
    "Camera": {
        "present": "camera shutter clicking",
        "presentParticle": "camera shutter clicks"
    },
    "Single-lens reflex camera": {
        "present": "camera shutter clicking",
        "presentParticle": "camera shutter clicks"
    },
    "Tools": {
        "present": "tools clanging",
        "presentParticle": "tools clangs"
    },
    "Hammer": {
        "present": "hammer banging",
        "presentParticle": "hammer bangs"
    },
    "Jackhammer": {
        "present": "hammer banging",
        "presentParticle": "hammer bangs"
    },
    "Sawing": {
        "present": "buzzing",
        "presentParticle": "buzzes"
    },
    "Filing (rasp)": {
        "present": "rasping",
        "presentParticle": "rasps"
    },
    "Sanding": {
        "present": "sanding",
        "presentParticle": "sands"
    },
    "Power tool": {
        "present": "power tool grinding",
        "presentParticle": "power tool grinds"
    },
    "Drill": {
        "present": "drilling",
        "presentParticle": "drills"
    },
    "Explosion": {
        "present": "loud explosion",
        "presentParticle": "loud explosion"
    },
    "Gunshot, gunfire": {
        "present": "gun firing",
        "presentParticle": "gun fires"
    },
    "Machine gun": {
        "present": "machine gun firing",
        "presentParticle": "machine gun fires"
    },
    "Fusillade": {
        "present": "shots firing",
        "presentParticle": "shots fires"
    },
    "Artillery fire": {
        "present": "artillery firing",
        "presentParticle": "artillery fires"
    },
    "Cap gun": {
        "present": "cap gun firing",
        "presentParticle": "cap gun fires"
    },
    "Fireworks": {
        "present": "fireworks crackling",
        "presentParticle": "fireworks crackles"
    },
    "Firecracker": {
        "present": "fireworks crackling",
        "presentParticle": "fireworks crackles"
    },
    "Burst, pop": {
        "present": "bursting",
        "presentParticle": "bursts"
    },
    "Eruption": {
        "present": "bursting",
        "presentParticle": "bursts"
    },
    "Boom": {
        "present": "bursting",
        "presentParticle": "bursts"
    },
    "Wood": {
        "present": "wood creaking",
        "presentParticle": "wood creaks"
    },
    "Chop": {
        "present": "chopping",
        "presentParticle": "chops"
    },
    "Splinter": {
        "present": "splintering",
        "presentParticle": "splinters"
    },
    "Crack": {
        "present": "cracking",
        "presentParticle": "cracks"
    },
    "Glass": {
        "present": "glass clinking",
        "presentParticle": "glass clinks"
    },
    "Chink, clink": {
        "present": "clinking",
        "presentParticle": "clinks"
    },
    "Shatter": {
        "present": "shattering",
        "presentParticle": "shatters"
    },
    "Liquid": {
        "present": "liquid splashing",
        "presentParticle": "liquid splashes"
    },
    "Splash, splatter": {
        "present": "splashing",
        "presentParticle": "splashes"
    },
    "Slosh": {
        "present": "splashing",
        "presentParticle": "splashes"
    },
    "Squish": {
        "present": "splashing",
        "presentParticle": "splashes"
    },
    "Drip": {
        "present": "splashing",
        "presentParticle": "splashes"
    },
    "Pour": {
        "present": "trickling",
        "presentParticle": "trickles"
    },
    "Trickle, dribble": {
        "present": "trickling",
        "presentParticle": "trickles"
    },
    "Gush": {
        "present": "liquid splashing",
        "presentParticle": "liquid splashes"
    },
    "Fill (with liquid)": {
        "present": "shouting",
        "presentParticle": "shouts"
    },
    "Spray": {
        "present": "spray spritzing",
        "presentParticle": "spray spritzes"
    },
    "Pump (liquid)": {
        "present": "liquid splashing",
        "presentParticle": "liquid splashes"
    },
    "Stir": {
        "present": "blending",
        "presentParticle": "blends"
    },
    "Boiling": {
        "present": "boiling",
        "presentParticle": "boils"
    },
    "Sonar": {
        "present": "sonar whistling",
        "presentParticle": "sonar whistles"
    },
    "Arrow": {
        "present": "arrow whooshing",
        "presentParticle": "arrow whooshes"
    },
    "Whoosh, swoosh, swish": {
        "present": "whooshing",
        "presentParticle": "whooshes"
    },
    "Thump, thud": {
        "present": "thudding",
        "presentParticle": "thuds"
    },
    "Thunk": {
        "present": "thudding",
        "presentParticle": "thuds"
    },
    "Electronic tuner": {
        "present": "tuner pitching",
        "presentParticle": "tuner pitches"
    },
    "Effects unit": {
        "present": "effects humming",
        "presentParticle": "effects humming"
    },
    "Chorus effect": {
        "present": "chorus sounds",
        "presentParticle": "chorus sounds"
    },
    "Basketball bounce": {
        "present": "ball bouncing",
        "presentParticle": "ball blunces"
    },
    "Bang": {
        "present": "banging",
        "presentParticle": "bangs"
    },
    "Slap, smack": {
        "present": "smacking",
        "presentParticle": "smacks"
    },
    "Smash, crash": {
        "present": "crashing",
        "presentParticle": "crashes"
    },
    "Breaking": {
        "present": "breaking",
        "presentParticle": "breaks"
    },
    "Bouncing": {
        "present": "bouncing",
        "presentParticle": "bounces"
    },
    "Whip": {
        "present": "whipping",
        "presentParticle": "whips"
    },
    "Flap": {
        "present": "flapping",
        "presentParticle": "flaps"
    },
    "Scratch": {
        "present": "scratching",
        "presentParticle": "scratches"
    },
    "Scrape": {
        "present": "scraping",
        "presentParticle": "scrapes"
    },
    "Rub": {
        "present": "rubbing",
        "presentParticle": "rubs"
    },
    "Roll": {
        "present": "rattling",
        "presentParticle": "rattles"
    },
    "Crushing": {
        "present": "crushing",
        "presentParticle": "crushes"
    },
    "Crumpling, crinkling": {
        "present": "crinkling",
        "presentParticle": "crinkles"
    },
    "Tearing": {
        "present": "ripping",
        "presentParticle": "ripping"
    },
    "Beep, bleep": {
        "present": "beeping",
        "presentParticle": "beeps"
    },
    "Ping": {
        "present": "rattling",
        "presentParticle": "rattles"
    },
    "Ding": {
        "present": "chiming",
        "presentParticle": "chimes"
    },
    "Clang": {
        "present": "clanging",
        "presentParticle": "clangs"
    },
    "Squeal": {
        "present": "squealing",
        "presentParticle": "squeals"
    },
    "Creak": {
        "present": "creaking",
        "presentParticle": "creaks"
    },
    "Rustle": {
        "present": "rustling",
        "presentParticle": "rustles"
    },
    "Whir": {
        "present": "whirring",
        "presentParticle": "whirs"
    },
    "Clatter": {
        "present": "clattering",
        "presentParticle": "clatters"
    },
    "Sizzle": {
        "present": "sizzling",
        "presentParticle": "sizzles"
    },
    "Clicking": {
        "present": "clicking",
        "presentParticle": "clicks"
    },
    "Clickety-clack": {
        "present": "clicking",
        "presentParticle": "clicks"
    },
    "Rumble": {
        "present": "rumbling",
        "presentParticle": "rumbles"
    },
    "Plop": {
        "present": "plopping",
        "presentParticle": "plops"
    },
    "Jingle, tinkle": {
        "present": "tinkling",
        "presentParticle": "tinkles"
    },
    "Hum": {
        "present": "humming",
        "presentParticle": "hums"
    },
    "Zing": {
        "present": "zinging",
        "presentParticle": "zings"
    },
    "Boing": {
        "present": "boinging",
        "presentParticle": "boings"
    },
    "Crunch": {
        "present": "crunching",
        "presentParticle": "crunches"
    },
    "Sine wave": {
        "present": "waving",
        "presentParticle": "waves"
    },
    "Harmonic": {
        "present": "harmony resonating",
        "presentParticle": "harmony resonates"
    },
    "Chirp tone": {
        "present": "chirping",
        "presentParticle": "chirping"
    },
    "Sound effect": {
        "present": "sound effects",
        "presentParticle": "sound effects"
    },
    "Pulse": {
        "present": "pulsing",
        "presentParticle": "pulse"
    },
    "Inside, small room": {
        "present": "dampened sounds",
        "presentParticle": "dampened sounds"
    },
    "Inside, large room or hall": {
        "present": "echoeing sounds",
        "presentParticle": "echoeing sounds"
    },
    "Inside, public space": {
        "present": "public sounds",
        "presentParticle": "public sounds"
    },
    "Outside, urban or manmade": {
        "present": "city bustle",
        "presentParticle": "city bustle"
    },
    "Outside, rural or natural": {
        "present": "natural sounds",
        "presentParticle": "natural sounds"
    },
    "Reverberation": {
        "present": "reverbing",
        "presentParticle": "reverbs"
    },
    "Echo": {
        "present": "echoing",
        "presentParticle": "echoes"
    },
    "Noise": {
        "present": "clamouring",
        "presentParticle": "clamours"
    },
    "Environmental noise": {
        "present": "environmental sounds",
        "presentParticle": "environmental sounds"
    },
    "Static": {
        "present": "static noise",
        "presentParticle": "static noise"
    },
    "Mains hum": {
        "present": "mains humming",
        "presentParticle": "mains hums"
    },
    "Distortion": {
        "present": "distortion noise",
        "presentParticle": "distortion noise"
    },
    "Sidetone": {
        "present": "sidetone ringing",
        "presentParticle": "sidetone rings"
    },
    "Cacophony": {
        "present": "jarring sound",
        "presentParticle": "jarring sound"
    },
    "White noise": {
        "present": "hissing",
        "presentParticle": "hisses"
    },
    "Pink noise": {
        "present": "flickering",
        "presentParticle": "flickers"
    },
    "Throbbing": {
        "present": "throbbing",
        "presentParticle": "throbs"
    },
    "Vibration": {
        "present": "vibrating",
        "presentParticle": "vibrates"
    },
    "Television": {
        "present": "television sounds",
        "presentParticle": "television sounds"
    },
    "Radio": {
        "present": "radio sounds",
        "presentParticle": "radio sounds"
    }
}
# sound_simplification = {
#     'mallet percussion': 'Percussion',
#     'glockenspiel': 'Percussion',
#     'chime': 'Percussion',
#     "Dog": "Dog Barking",
#     "Whimper": "Dog Whimpering",
#     "Domestic animals, pets": "Pet Sound",
#     "Animal": "Animal Sound",
#     "Bicycle":"Bicycle Sound",
#     "Mouse": "Squeak",
#     "Shatter": "Crash",
#     "Bark":"Dog Bark",
#   "Yip":"Dog yip",
#   "Howl":"Dog Howl",
#   "Bow-wow":"Dog Bow-wow",
#   "Growling":"Dog Growling",
# }


def classify_audio(audio_file_path):
    yamnet_model_handle = 'https://tfhub.dev/google/yamnet/1'
    yamnet_model = hub.load(yamnet_model_handle)

    wav_data = load_wav_16k_mono(audio_file_path)

    scores, embeddings, spectrogram = yamnet_model(wav_data)

    frame_duration = 0.48

    class_map_path = yamnet_model.class_map_path().numpy().decode('utf-8')
    class_names = class_names_from_csv(class_map_path)

    predicted_classes = np.argmax(scores.numpy(), axis=1)

    results = []
    previous_class = None
    start_time = 0

    for i, pred_class in enumerate(predicted_classes):
        current_sound = class_names[pred_class]
        simplified_sound = commonSounds.get(current_sound, {"present": current_sound, "presentParticle": current_sound})
        end_time = (i + 1) * frame_duration

        if simplified_sound not in ["Speech", "Animal Sound"]:
            if simplified_sound != previous_class:
                if previous_class is not None:
                    results.append({
                        "start_time": start_time,
                        "end_time": i * frame_duration,
                        "sound": previous_class
                    })
                start_time = i * frame_duration
                previous_class = simplified_sound

    if previous_class not in ["Speech", "Animal Sound","Pet Sound","Silence"]:
        results.append({
            "start_time": start_time,
            "end_time": end_time,
            "sound": previous_class
        })

    merged_results = []
    for result in results:
        if merged_results and result['sound'] == merged_results[-1]['sound']:
            merged_results[-1]['end_time'] = result['end_time']
        else:
            merged_results.append(result)

    return merged_results



# Load the VGGish model from TensorFlow Hub
vggish_model = hub.KerasLayer('https://tfhub.dev/google/vggish/1', trainable=False)


# Load the trained classifier and label encoder
pipeline = joblib.load('genre_classifier.pkl')
label_encoder = joblib.load('label_encoder.pkl')


app = Flask(__name__)


def preprocess_audio(file_path, target_length=16000):
    try:
        y, sr = librosa.load(file_path, sr=16000, mono=True)
        if len(y) > target_length:
            y = y[:target_length]
        elif len(y) < target_length:
            y = np.pad(y, (0, target_length - len(y)), 'constant')
        return y
    except Exception as e:
        print(f"Could not process file {file_path}: {e}")
        return None


def extract_vggish_features(waveform):
    waveform = np.squeeze(waveform)  # Ensure the waveform is a 1D array
    waveform = tf.convert_to_tensor(waveform, dtype=tf.float32)
    embeddings = vggish_model(waveform)
    embeddings = embeddings.numpy().flatten()
    
    # Ensure the feature vector length is consistent
    expected_length = 3968  # Match this with the training length
    if len(embeddings) > expected_length:
        embeddings = embeddings[:expected_length]
    elif len(embeddings) < expected_length:
        embeddings = np.pad(embeddings, (0, expected_length - len(embeddings)), 'constant')
    
    return embeddings



def scrape_imdb(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extracting the cast information
    cast_list = []
    for cast_member in soup.select('.cast_list tr'):
        actor = cast_member.select_one('.primary_photo + td a')
        character = cast_member.select_one('.character')
        image = cast_member.select_one('.primary_photo img')
        if actor and character and image:
            # Modifying the URL to fetch higher resolution images
            image_url = image['loadlate'] if 'loadlate' in image.attrs else image['src']
            high_res_image_url = image_url.replace('._V1_UX32_CR0,0,32,44_AL_', '._V1_UX200_CR0,0,200,280_AL_')
            cast_list.append({
                'actor': actor.get_text(strip=True),
                'character': character.get_text(strip=True),
                'image_url': high_res_image_url
            })

    # Extracting the crew information
    crew_list = []
    for crew_member in soup.select('.simpleTable .name'):
        role = crew_member.find_previous('h4').get_text(strip=True)
        name = crew_member.get_text(strip=True)
        crew_list.append({
            'name': name,
            'role': role
        })

    return {
        'cast': cast_list,
        'crew': crew_list
    }


def segment_audio(file_path, segment_duration=5000):
    """Break audio into segments of given duration (in milliseconds) and return segments with timestamps in seconds."""
    audio = AudioSegment.from_file(file_path)
    length = len(audio)
    segments = []
    for i in range(0, length, segment_duration):
        start_time = i / 1000  # Convert milliseconds to seconds
        end_time = (i + segment_duration) / 1000  # Convert milliseconds to seconds
        segment = audio[i:i+segment_duration]
        segments.append((segment, start_time, end_time))
    return segments

def merge_segments(segments):
    """Merge consecutive segments with the same lyrics."""
    if not segments:
        return []

    merged_segments = []
    current_segment = segments[0]

    for segment in segments[1:]:
        if segment['lyrics'] == current_segment['lyrics']:
            # Extend the current segment's end time
            current_segment['end_time'] = segment['end_time']
        else:
            # Add the current segment to the list and start a new one
            merged_segments.append(current_segment)
            current_segment = segment

    # Add the last segment
    merged_segments.append(current_segment)

    return merged_segments

@app.route('/extract_speaker_embeddings', methods=['POST'])
def extract_speaker_embeddings():
    audio_file = request.files['audio']
    audio_path = '/tmp/audio.wav'
    audio_file.save(audio_path)
    
    wav = preprocess_wav(audio_path)
    segments = librosa.effects.split(wav, top_db=20)
    embeddings = []
    for start, end in segments:
        segment = wav[start:end]
        embedding = encoder.embed_utterance(segment)
        embeddings.append(embedding.tolist())
    
    segments = segments.tolist()
    
    return jsonify({
        'message': 'Speaker embeddings and segments extracted and saved.',
        'embeddings': embeddings,
        'segments': segments
    })

@app.route('/extract_lyrics', methods=['POST'])
def extract_lyrics():
    # Get the audio file from the POST request
    audio_file = request.files['audio']

    # Save the audio file to a temporary location
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_mp3:
        audio_file.save(temp_mp3.name)

        # Segment audio into smaller parts with their corresponding timelines
        segments = segment_audio(temp_mp3.name, segment_duration=5000)  # 5 seconds per segment

        # Initialize recognizer class
        recognizer = sr.Recognizer()
        results = []

        for segment, start, end in segments:
            # Convert segment to WAV format and process
            with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_wav:
                segment.export(temp_wav.name, format="wav")

                with sr.AudioFile(temp_wav.name) as source:
                    audio_data = recognizer.record(source)

                try:
                    # Recognize speech from the audio segment
                    text = recognizer.recognize_google(audio_data)
                    results.append({'start_time': start, 'end_time': end, 'lyrics': "# "+ text +" #"})
                except sr.UnknownValueError:
                    # No speech could be understood in this segment
                    results.append({'start_time': start, 'end_time': end, 'lyrics': "♪ music ♪"})
                except sr.RequestError as e:
                    return jsonify({'error': str(e)}), 500
            os.unlink(temp_wav.name)

        # Clean up temporary files
        os.unlink(temp_mp3.name)

    # Merge the results to consolidate segments with identical lyrics
    merged_results = merge_segments(results)

    # Return the segmented results with timelines
    return jsonify({
        'segments': merged_results
    })




@app.route('/classify', methods=['POST'])
def classify():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        file_path = os.path.join('/tmp', file.filename)
        try:
            file.save(file_path)
            results = classify_audio(file_path)
            return jsonify(results)
        finally:
            # Ensure the temporary file is removed
            if os.path.exists(file_path):
                os.remove(file_path)    

@app.route('/scrape', methods=['GET'])
def scrape_imdb_endpoint():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL parameter is required"}), 400
    data = scrape_imdb(url)
    return jsonify(data)


@app.route('/genre', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join('/tmp', filename)
        file.save(file_path)
        
        waveform = preprocess_audio(file_path)
        if waveform is None:
            return jsonify({'error': 'Could not process audio file'}), 500
        
        features = extract_vggish_features(waveform)
        features = np.expand_dims(features, axis=0)
        
        try:
            prediction = pipeline.predict(features)
            predicted_label = label_encoder.inverse_transform(prediction)[0]
            return jsonify({'genre': predicted_label})
        except ValueError as e:
            return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)