import os
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import librosa
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Load the VGGish model from TensorFlow Hub
vggish_model = hub.KerasLayer('https://tfhub.dev/google/vggish/1', trainable=False)

# Directory containing your dataset
dataset_dir = 'dataset'
# List of labels
labels = []
# List of features
features = []

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

# Feature extraction
for root, _, files in os.walk(dataset_dir):
    for file in files:
        if file.endswith('.wav'):
            file_path = os.path.join(root, file)
            label = os.path.basename(root)  # Assuming directory name is the label
            waveform = preprocess_audio(file_path)
            if waveform is not None:
                labels.append(label)
                feature = extract_vggish_features(waveform)
                features.append(feature)

# Convert to numpy arrays
X = np.array(features)
y = np.array(labels)

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Split data into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Train classifier
pipeline = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))  # Increase max_iter
pipeline.fit(X_train, y_train)

# Save the classifier and label encoder
joblib.dump(pipeline, 'genre_classifier.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

# Evaluate the model on the validation set
y_pred = pipeline.predict(X_val)
y_true = label_encoder.inverse_transform(y_val)
y_pred_labels = label_encoder.inverse_transform(y_pred)

print(classification_report(y_true, y_pred_labels))

print("Classifier and label encoder saved successfully.")