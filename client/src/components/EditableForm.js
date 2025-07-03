import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Modal from 'react-modal';

const makeRequestAPI = async (prompt) => {
  try {
    const response = await axios.post('http://localhost:8080/diagnose', { prompt });
    return response.data;
  } catch (error) {
    throw new Error(`Error in makeRequestAPI: ${error.message}`);
  }
};

const getWeekNumber = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate - startOfYear) / 86400000 + 1;
  return Math.ceil(pastDaysOfYear / 7);
};

const EditableForm = ({ selectedPatientId, initialData }) => {
  console.log('EditableForm selectedPatientId:', selectedPatientId);
  const [formData, setFormData] = useState(initialData || {});
  const [isEditing, setIsEditing] = useState(false);
  const [diagnosisReport, setDiagnosisReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const reportRef = useRef(null);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [diagnosisReport]);

  const handleInputChange = (e, path) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    let nested = updatedFormData;
    for (let i = 0; i < path.length - 1; i++) {
      nested = nested[path[i]];
    }
    nested[path[path.length - 1]] = value;

    setFormData(updatedFormData);
  };

  const renderFields = (data, path = []) => {
    return Object.keys(data).map((key) => {
      const value = data[key];
      const currentPath = [...path, key];

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key} style={{ marginBottom: '10px' }}>
            <strong style={{ display: 'block', marginTop: '10px', marginBottom: '5px', color: 'black' }}>{key}</strong>
            {renderFields(value, currentPath)}
          </div>
        );
      } else {
        return (
          <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '5%' }}>
            <div style={{ width: '150px', height: '30px', fontWeight: '400', borderRadius: '6px', padding: '4px', textAlign: 'center', backgroundColor: '#007bff', color: '#fff' }}>
              {key}
            </div>
            <div style={{ flexGrow: 1, paddingLeft: '1rem', borderRadius: '6px', paddingTop: '4px', backgroundColor: 'transparent' }}>
              {isEditing ? (
                <input
                  className='text-dark'
                  type="text"
                  name={key}
                  value={value}
                  onChange={(e) => handleInputChange(e, currentPath)}
                  style={{ width: '100%', height: '40px', color: 'black', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', backgroundColor: 'rgba(220, 220, 220, 0.76)' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '40px',
                    color: 'black',
                    backgroundColor: 'rgba(220, 220, 220, 0.76)',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {value}
                </div>
              )}
            </div>
          </div>
        );
      }
    });
  };

  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ['gemini-ai-request'],
    onSuccess: (data) => {
      setDiagnosisReport(data.replace(/\*+/g, '').split('\n').map((line, index) => <p key={index}>{line}</p>));
      setShowModal(true);
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const prompt = JSON.stringify(formData);
    mutation.mutate(prompt);
  };

  const handleSave = async () => {
    try {
      const weekNumber = getWeekNumber();
      const dataToSave = { ...formData, userId: selectedPatientId, week: weekNumber };
      const response = await axios.post('http://localhost:8080/api/save', dataToSave);
      console.log('Save response:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setDiagnosisReport(null);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh', marginTop: '6%' }}>
      <div className='border rounded-xl' style={{ backgroundColor: 'rgba(220, 220, 220, 0.76)' }}>
        <h1 className="mb-4 text-3xl font-extrabold text-blue-600 md:text-5xl lg:text-5xl pb-2 flex items-center justify-center">
          Report Details
          <span className="ml-4">
            <img width={40} src="https://res.cloudinary.com/duwadnxwf/image/upload/v1716300380/patient_u29wkb.png" alt="patient icon" />
          </span>
        </h1>

        {renderFields(formData)}

        <div className='flex justify-center mt-5'>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-s px-4 py-2.5 text-center inline-flex items-center me-2 mb-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            {!isEditing && <img src="https://res.cloudinary.com/duwadnxwf/image/upload/v1716276383/icons8-edit-24_fpgba3.png" className="h-6 w-5 pb-1" />}
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing &&
            <button type="button"
              className="mt-3 mb-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-s px-4 py-2.5 text-center inline-flex items-center me-2 mb-2"
              onClick={handleSave}>Save</button>}
        </div>

        {!isEditing &&
          <form onSubmit={submitHandler} className='flex justify-center'>
            <button
              type="submit"
              className="mt-3 mb-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-s px-4 py-2.5 text-center inline-flex items-center me-2 mb-2"
            >
              Diagnose
            </button>
          </form>
        }

        {mutation.isPending && <p className='text-5xl'>Generating your content</p>}
        {mutation.isError && <p>{mutation.error.message}</p>}
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          },
          content: {
            maxWidth: '600px',
            margin: 'auto',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(220, 220, 220, 0.76)',
            textAlign: 'center'
          }
        }}
      >
        <h2 className='text-2xl font-bold text-dark-800 mb-2'>Diagnosis Report</h2>
        {diagnosisReport && (
          <div className='border border-gray-300 p-4 rounded-md text-dark'>
            {diagnosisReport}
          </div>
        )}
        <button
          onClick={closeModal}
          className='mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none'
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default EditableForm;
