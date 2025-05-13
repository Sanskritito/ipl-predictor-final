import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Define the deep learning model architecture
def build_dl_model(input_shape):
    model = Sequential([
        Dense(64, activation='relu', input_shape=(input_shape,)),
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dropout(0.2),
        Dense(16, activation='relu'),
        Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    return model

# Train the deep learning model
def train_dl_model(features, labels):
    # Normalize features
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        scaled_features, labels, test_size=0.2, random_state=42
    )
    
    # Build model
    model = build_dl_model(X_train.shape[1])
    
    # Train model
    history = model.fit(
        X_train, y_train,
        epochs=50,
        batch_size=32,
        validation_data=(X_test, y_test),
        verbose=1
    )
    
    # Evaluate model
    loss, accuracy = model.evaluate(X_test, y_test)
    print(f"Deep Learning Model - Test Accuracy: {accuracy:.4f}")
    
    # Save model
    model.save('models/deep_learning_model.h5')
    
    # Save scaler
    import pickle
    with open('models/dl_scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
    
    return model, scaler, history

# Make predictions with the deep learning model
def dl_predict(model, scaler, input_data):
    # Preprocess input
    scaled_input = scaler.transform(input_data.reshape(1, -1))
    
    # Get prediction
    prediction = model.predict(scaled_input)[0][0]
    
    return prediction

# If this file is run directly, train and save the model
if __name__ == "__main__":
    # This would be replaced with your actual data loading and preprocessing
    from model import load_data, engineer_features
    
    data = load_data()
    features, labels = engineer_features(data)
    
    train_dl_model(features, labels)
    print("Deep Learning model trained and saved successfully!")
