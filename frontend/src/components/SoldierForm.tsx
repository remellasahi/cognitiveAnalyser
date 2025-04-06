import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from "axios"
interface SoldierFormProps{
  onGradePredicted: (grade: string) => void;
}
console.log("SoldierForm component mounted");

const SoldierForm: React.FC<SoldierFormProps> = ({ onGradePredicted}) => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    pulse_rate: '',
    systolic_bp: '',
    diastolic_bp: '',
    body_temp: '',
    skin_response: '',
    cognitive_load: '',
    stress_level: '',
    decision_speed: '',
    resilience_score: '',
    situational_awareness: '',
    emotional_stability: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("submit button triggered");

  try {
    const response = await axios.post('http://127.0.0.1:8000/predict/', {
      ...formData,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      pulse_rate: parseFloat(formData.pulse_rate),
      systolic_bp: parseFloat(formData.systolic_bp),
      diastolic_bp: parseFloat(formData.diastolic_bp),
      body_temp: parseFloat(formData.body_temp),
      skin_response: parseFloat(formData.skin_response),
      cognitive_load: parseFloat(formData.cognitive_load),
      stress_level: parseFloat(formData.stress_level),
      decision_speed: parseFloat(formData.decision_speed),
      resilience_score: parseFloat(formData.resilience_score),
      emotional_stability: parseFloat(formData.emotional_stability),
      situational_awareness: formData.situational_awareness,
    });

    console.log("✅ Axios response:", response.data);
    const predictedGrade = response.data.grade;
    onGradePredicted(predictedGrade);
    // navigate('/report', { state: { grade: predictedGrade } }); // optional
  } catch (error) {
    console.error("Axios POST error:", error);
    alert('Prediction failed. Check console for more info.');
  }
};


  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Soldier Data Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ['weight', 'Weight (kg)'],
          ['height', 'Height (cm)'],
          ['pulse_rate', 'Pulse Rate (bpm)'],
          ['systolic_bp', 'Systolic BP (mmHg)'],
          ['diastolic_bp', 'Diastolic BP (mmHg)'],
          ['body_temp', 'Body Temperature (°C)'],
          ['skin_response', 'Skin Response (µS)'],
          ['cognitive_load', 'Cognitive Load (1–10)'],
          ['stress_level', 'Stress Level (1–10)'],
          ['decision_speed', 'Decision Speed (s)'],
          ['resilience_score', 'Resilience Score (1–10)'],
          ['emotional_stability', 'Emotional Stability (1–10)'],
          ['situational_awareness', 'situational_awareness']
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block font-medium mb-1" htmlFor={name}>{label}</label>
            <input
              type="number"
              name={name}
              id={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
              step="any"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1" htmlFor="situational_awareness">Situational Awareness</label>
          <select
            name="situational_awareness"
            id="situational_awareness"
            value={formData.situational_awareness}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button
          type="submit"
          onClick={() => console.log("✅ Submit button clicked")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Predict Grade
        </button>
      </form>
      {/* <button onClick={() => alert("JS is working")}>Test JS</button> */}


    </div>
  );
};

export default SoldierForm;
