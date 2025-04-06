from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import joblib
import math


model = joblib.load("soldierapi/model.pkl")  #  Ensure correct path


@api_view(["GET"])
def api_home(request):
    return Response({"message": "Hello, API is working!"})


@api_view(["POST"])
def predict_grade(request):
    print("API endpoint was hit!")
    try:
        print("ml model is being hit")
        data = request.data
        print(" Incoming Data:", data)

        def safe_float(val):
            try:
                return float(val)
            except:
                return float('nan')

        # Convert situational awareness to numeric
        sa = data.get("situational_awareness", "Medium")
        sa_encoded = 1.0 if sa == "High" else 0.5 if sa == "Medium" else 0.0

        # Prepare input features
        features = [
            safe_float(data.get("weight")),
            safe_float(data.get("height")),
            safe_float(data.get("pulse_rate")),
            safe_float(data.get("systolic_bp")),
            safe_float(data.get("diastolic_bp")),
            safe_float(data.get("body_temp")),
            safe_float(data.get("skin_response")),
            safe_float(data.get("cognitive_load")),
            safe_float(data.get("stress_level")),
            safe_float(data.get("decision_speed")),
            safe_float(data.get("resilience_score")),
            sa_encoded,
            safe_float(data.get("emotional_stability"))
        ]

        print("🚀 Features:", features)

        # Step 2: Check for NaN
        if any(math.isnan(f) for f in features):
            return Response({
                "error": "NaN detected in input features. Please check input values.",
                "features": features
            }, status=status.HTTP_400_BAD_REQUEST)

        # If you used a scaler during training, use it here too
        # features = scaler.transform([features])  # Uncomment if applicable

        # Predict
        prediction = model.predict([features])[0]
        return Response({"grade": round(prediction, 2)})

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
