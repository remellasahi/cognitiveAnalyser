import numpy as np
import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.svm import SVR
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import mean_squared_error, r2_score
import pickle
from django.conf import settings
# Load dataset
df_path = os.path.join(settings.BASE_DIR, "soldierapi", "data", "synthetic_soldier_data.csv")
df = pd.read_csv(df_path)

# Convert categorical column "Situational_Awareness" into numerical values
label_encoder = LabelEncoder()
df["Situational_Awareness"] = label_encoder.fit_transform(df["Situational_Awareness"])

X = df.drop(columns=["Final_Grade"])  # Input features
y = df["Final_Grade"]  # Target variable (continuous)

# Split into Train and Test Sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize Features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = SVR(kernel="rbf", C=10, epsilon=0.1, gamma="scale")
model.fit(X_train, y_train)

# Predict using trained model
y_pred = model.predict(X_test)

# Evaluate model performance
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Model MSE: {mse:.2f}")
print(f"Model R² Score: {r2:.2f}")

# Save Model, Scaler, and Label Encoder
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(scaler, open("scaler.pkl", "wb"))
pickle.dump(label_encoder, open("label_encoder.pkl", "wb"))
