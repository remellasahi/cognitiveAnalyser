import { useState } from 'react';
import { FiUpload, FiX, FiCheck } from 'react-icons/fi';
import { useData } from '../context/DataContext';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';

interface FileStatus {
  name: string;
  status: 'pending' | 'validating' | 'valid' | 'invalid';
  message?: string;
}

interface ManualEntryData {
  // General Information
  soldierId: string;
  name: string;
  age: string;
  gender: string;
  department: string;

  // Physiological Parameters
  weight: string;
  height: string;
  pulseRate: string;
  systolicBP: string;
  diastolicBP: string;
  bodyTemperature: string;
  skinResponse: string;

  // Psychological Parameters
  cognitiveLoad: string;
  stressLevel: string;
  decisionSpeed: string;
  resilienceScore: string;
  situationalAwareness: 'low' | 'medium' | 'high' | '';
  emotionalStability: string;
}

const initialManualData: ManualEntryData = {
  soldierId: '',
  name: '',
  age: '',
  gender: '',
  department: '',
  weight: '',
  height: '',
  pulseRate: '',
  systolicBP: '',
  diastolicBP: '',
  bodyTemperature: '',
  skinResponse: '',
  cognitiveLoad: '',
  stressLevel: '',
  decisionSpeed: '',
  resilienceScore: '',
  situationalAwareness: '',
  emotionalStability: ''
};

export default function DataUpload() {
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { addData } = useData();
  const [manualData, setManualData] = useState<ManualEntryData>(initialManualData);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateFileFormat = (file: File): boolean => {
    const allowedFormats = ['.csv', '.avro', '.xlsx'];
    return allowedFormats.some(format => 
      file.name.toLowerCase().endsWith(format)
    );
  };

  const processFileData = async (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result;
      const mockSoldierData = {
        soldierId: `SOL${Math.floor(Math.random() * 1000)}`,
        name: file.name.split('.')[0],
        fileData: content
      };
      
      addData([mockSoldierData]);
      setSubmitStatus('success');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    };

    reader.readAsText(file);
  };

  const handleFiles = async (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      name: file.name,
      status: 'validating' as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach(async (fileStatus, index) => {
      const file = fileList[index];
      const isValid = validateFileFormat(file);

      if (isValid) {
        await processFileData(file);
      }

      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.name === fileStatus.name 
            ? {
                name: f.name,
                status: isValid ? 'valid' : 'invalid',
                message: isValid ? 'File format is valid' : 'Invalid file format. Only .csv, .avro, and .xlsx files are allowed.'
              }
            : f
        ));
      }, 1000);
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    
    try {
      const soldierData = {
        soldierId: manualData.soldierId,
        name: manualData.name,
        fileData: {
          generalInfo: {
            age: parseFloat(manualData.age),
            gender: manualData.gender,
            department: manualData.department
          },
          physiological: {
            weight: parseFloat(manualData.weight),
            height: parseFloat(manualData.height),
            pulseRate: parseFloat(manualData.pulseRate),
            systolicBP: parseFloat(manualData.systolicBP),
            diastolicBP: parseFloat(manualData.diastolicBP),
            bodyTemperature: parseFloat(manualData.bodyTemperature),
            skinResponse: parseFloat(manualData.skinResponse)
          },
          psychological: {
            cognitiveLoad: parseFloat(manualData.cognitiveLoad),
            stressLevel: parseFloat(manualData.stressLevel),
            decisionSpeed: parseFloat(manualData.decisionSpeed),
            resilienceScore: parseFloat(manualData.resilienceScore),
            situationalAwareness: manualData.situationalAwareness,
            emotionalStability: parseFloat(manualData.emotionalStability)
          }
        }
      };

      addData([soldierData]);
      setManualData(initialManualData);
      setSubmitStatus('success');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setManualData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
            <Tab className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }>
              File Upload
            </Tab>
            <Tab className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }>
              Manual Entry
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${
                  isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Drop your files here, or{' '}
                      <span className="text-indigo-600 hover:text-indigo-500">browse</span>
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept=".csv,.avro,.xlsx"
                      onChange={handleFileInput}
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Supported formats: CSV, AVRO, XLSX
                  </p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Files</h3>
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.name}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          {file.status === 'validating' && (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent" />
                          )}
                          {file.status === 'valid' && (
                            <FiCheck className="h-4 w-4 text-green-500" />
                          )}
                          {file.status === 'invalid' && (
                            <FiX className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm font-medium text-gray-900">{file.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          {file.message && (
                            <span className={`text-sm ${
                              file.status === 'valid' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {file.message}
                            </span>
                          )}
                          <button
                            onClick={() => removeFile(file.name)}
                            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                          >
                            <FiX className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Tab.Panel>

            <Tab.Panel>
              <form onSubmit={handleManualSubmit} className="space-y-8">
                {/* General Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">General Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Soldier ID</label>
                      <input
                        type="text"
                        name="soldierId"
                        value={manualData.soldierId}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={manualData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={manualData.age}
                        onChange={handleInputChange}
                        required
                        min="18"
                        max="60"
                        step="0.1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <select
                        name="gender"
                        value={manualData.gender}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={manualData.department}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Physiological Parameters */}
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Physiological Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        value={manualData.weight}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="30"
                        max="150"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                      <input
                        type="number"
                        name="height"
                        value={manualData.height}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="120"
                        max="220"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pulse Rate (bpm)</label>
                      <input
                        type="number"
                        name="pulseRate"
                        value={manualData.pulseRate}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="40"
                        max="200"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Systolic BP (mmHg)</label>
                      <input
                        type="number"
                        name="systolicBP"
                        value={manualData.systolicBP}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="70"
                        max="200"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Diastolic BP (mmHg)</label>
                      <input
                        type="number"
                        name="diastolicBP"
                        value={manualData.diastolicBP}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="40"
                        max="130"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Body Temperature (°C)</label>
                      <input
                        type="number"
                        name="bodyTemperature"
                        value={manualData.bodyTemperature}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="35"
                        max="42"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Skin Response (µS)</label>
                      <input
                        type="number"
                        name="skinResponse"
                        value={manualData.skinResponse}
                        onChange={handleInputChange}
                        required
                        step="0.01"
                        min="0"
                        max="100"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Psychological Parameters */}
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Psychological Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cognitive Load (1-10)</label>
                      <input
                        type="number"
                        name="cognitiveLoad"
                        value={manualData.cognitiveLoad}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="1"
                        max="10"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stress Level (1-10)</label>
                      <input
                        type="number"
                        name="stressLevel"
                        value={manualData.stressLevel}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="1"
                        max="10"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Decision Speed (seconds)</label>
                      <input
                        type="number"
                        name="decisionSpeed"
                        value={manualData.decisionSpeed}
                        onChange={handleInputChange}
                        required
                        step="0.01"
                        min="0"
                        max="60"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Resilience Score (1-10)</label>
                      <input
                        type="number"
                        name="resilienceScore"
                        value={manualData.resilienceScore}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="1"
                        max="10"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Situational Awareness</label>
                      <select
                        name="situationalAwareness"
                        value={manualData.situationalAwareness}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      >
                        <option value="">Select Level</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Emotional Stability (1-10)</label>
                      <input
                        type="number"
                        name="emotionalStability"
                        value={manualData.emotionalStability}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="1"
                        max="10"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setManualData(initialManualData)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Submit Data
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg shadow-xl z-10 max-w-md w-full mx-4">
                      <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                          <FiCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">Data submitted successfully!</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          You can now check the Analysis Report section to view the ML model's assessment.
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={() => setSubmitStatus('idle')}
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            View Analysis Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                    Error submitting data. Please try again.
                  </div>
                )}
              </form>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}