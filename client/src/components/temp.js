import React, { useState } from 'react';
import axios from 'axios';

// const makePredictionRequest = async (formData) => {
//   console.log('before going Form data:', formData);
//   try {
//     const response = await axios.post('http://localhost:8080/query', {
//       inputs: JSON.stringify(formData+"what is the diagnosis") // Convert formData to JSON string
//     });
//     console.log('Prediction response:', response.data[0]);
//     return response.data;
//   } catch (error) {
//     console.error('Error making prediction:', error);
//     throw error;
//   }
// };

const makePredictionRequest = async (formData) => {
  console.log('before going Form data:', formData);

  // Convert formData to a string
  let formDataString = "";
  for (const [key, value] of Object.entries(formData)) {
    formDataString += `${key}: ${value}\n`;
  }

  try {
    const response = await axios.post('http://localhost:8080/query', {
      inputs: formDataString + "what is the disease name in 150 words"
    });
    console.log('Prediction response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error making prediction:', error);
    throw error;
  }
};


const EditableForm = ({ initialData }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [isEditing, setIsEditing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null); // State to store prediction result
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleInputChange = (e, path) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    let nested = updatedFormData;
    for (let i = 0; i < path.length - 1; i++) {
      nested = nested[path[i]];
    }
    nested[path[path.length - 1]] = value;

    setFormData(updatedFormData);
    console.log('Updated form data:', updatedFormData)
  };

  const renderFields = (data, path = []) => {
    return Object.keys(data).map((key) => {
      const value = data[key];
      const currentPath = [...path, key];

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key}>
            <strong style={{ display: 'block', marginTop: '10px', marginBottom: '5px' }}>{key}</strong>
            {renderFields(value, currentPath)}
          </div>
        );
      } else {
        return (
          <div key={key} style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', fontSize: '15px' }}>
            <div className="text-light bg-primary" style={{ textAlign: 'center', justifyContent: 'center', width: '150px', fontWeight: '400', borderRadius: '6px', padding: '4px' }}>
              {key}
            </div>
            <div className="text-light bg-dark" style={{ width: '200px', paddingLeft: '1rem', backgroundColor: 'ButtonHighlight', borderRadius: '6px', paddingTop: '4px' }}>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={(e) => handleInputChange(e, currentPath)}
                  style={{ backgroundColor: 'ButtonHighlight', color: 'black' }}
                />
              ) : (
                <span>{value}</span>
              )}
            </div>
          </div>
        );
      }
    });
  };

  const handleSave = async () => {
    try {
      // Call function to save data
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handlePredict = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const prediction = await makePredictionRequest(formData);
      setPredictionResult(prediction[0]); // Set prediction result to state
    } catch (error) {
      console.error('Error making prediction:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after prediction
    }
  };

  return (
    <div className="pl-10 pr-10 flex flex-col items-center">
      <h1 className="mb-4 text-3xl font-extrabold text-light md:text-5xl lg:text-5xl pb-2 flex items-center">
        Report Details
        <span className="ml-4">
          <img width={40} src="https://res.cloudinary.com/duwadnxwf/image/upload/v1716300380/patient_u29wkb.png" alt="patient icon" />
        </span>
      </h1>

      {renderFields(formData)}

      <button
        type="button"
        className="mt-3 text-light bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-s px-4 py-2.5 text-center inline-flex items-center me-2 mb-2"
        onClick={() => setIsEditing(!isEditing)}
      >
        {!isEditing && <img src="https://res.cloudinary.com/duwadnxwf/image/upload/v1716276383/icons8-edit-24_fpgba3.png" className="h-6 w-5 pb-1" />}
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      {isEditing && (
        <button
          type="button"
          className="mt-3 mb-5 text-dark bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-s px-4 py-2.5 text-center inline-flex items-center me-2 mb-2"
          onClick={handleSave}
        >
          Save
        </button>
      )}

      <button
        type="button"
        className="mt-3 mb-5 text-black bg-blue-700 font-medium rounded-lg text-s px-4 py-2.5 text-center inline-flex items-center me-2 mb-2"
        onClick={handlePredict}
      >
        Predict
      </button>

      {isLoading ? (
        <div className="text-center text-5xl mt-4">
          <h1>Loading...</h1>
        </div>
      ) : (
        predictionResult && (
          <div className="flex justify-center w-5/6 mt-4 mx-1.5">
            <div className="border border-gray-300 rounded p-4">
              <h2 className="text-xl font-semibold mb-2 text-center">Prediction Result</h2>
              <p>{predictionResult.generated_text.slice(62,-1).replace(/^.*: /, '')}</p> {/* Remove prompt from generated text */}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default EditableForm;
