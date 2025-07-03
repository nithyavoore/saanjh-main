import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientSel = ({ onSelectPatient }) => {
  const [patientIds, setPatientIds] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  useEffect(() => {
    fetchPatientIds();
  }, []);

  const fetchPatientIds = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/userIds');
      setPatientIds(response.data); 
      console.log(patientIds);
    } catch (error) {
      console.error('Error fetching patient IDs:', error);
    }
  };

  const handlePatientIdChange = (e) => {
    setSelectedPatientId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelectPatient(selectedPatientId); // Notify parent component (Form) of selected patient ID
  };

  return (
    <div className="p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h2 className="mb-4 text-3xl font-extrabold text-primary text-center md:text-5xl lg:text-5xl pb-2">Upload Data</h2>
        <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="patientId" className="block text-dark text-sm font-bold mb-2">Select Patient ID</label>
            <select
              className="form-select block w-full mt-1"
              id="patientId"
              name="patientId"
              value={selectedPatientId}
              onChange={handlePatientIdChange}
            >
              <option className='text-dark'value="" disabled>-- Select Patient ID --</option>
              {patientIds.map(patient => (
                <option key={patient.userId} value={patient.userId}>{patient.userId} - {patient.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientSel;
