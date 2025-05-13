from flask import Flask, request, jsonify
import pickle
import numpy as np
import os
from model import predict, load_data

app = Flask(__name__)

# Load models
def load_models():
    models = {}
    try:
        if os.path.exists('models/random_forest.pkl'):
            with open('models/random_forest.pkl', 'rb') as f:
                models['random_forest'] = pickle.load(f)
        else:
            print("Model file not found. Training new model...")
            from model import main
            main()  # Train the model
            # Try loading again
            if os.path.exists('models/random_forest.pkl'):
                with open('models/random_forest.pkl', 'rb') as f:
                    models['random_forest'] = pickle.load(f)
        return models
    except Exception as e:
        print(f"Error loading models: {e}")
        return {}

models = load_models()

@app.route('/api/predict', methods=['POST'])
def predict_winner():
    try:
        data = request.json
        
        # Validate input
        required_fields = ['team1', 'team2', 'tossWinner', 'tossDecision', 'venue']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Make prediction
        result = predict(models, data)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'models_loaded': len(models) > 0})

@app.route('/api/venues', methods=['GET'])
def get_venues():
    try:
        data = load_data()
        venues = sorted(data['Venue'].unique().tolist())
        return jsonify(venues)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/teams', methods=['GET'])
def get_teams():
    try:
        data = load_data()
        teams = sorted(list(set(data['Team1'].tolist() + data['Team2'].tolist())))
        return jsonify(teams)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
