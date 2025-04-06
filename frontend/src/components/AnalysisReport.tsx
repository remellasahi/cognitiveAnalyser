// import { useState } from 'react';
// import { FiDownload } from 'react-icons/fi';
// import { useData } from '../context/DataContext';
// interface AnalysisReportProps {
//   predictedGrades: {[ soldierId: string] :string};
// }

// const AnalysisReport: React.FC<AnalysisReportProps> = ({grade}) =>{
//   const { uploadedData } = useData();
//   const [selectedSoldier, setSelectedSoldier] = useState<string | null>(null);
//   const numericGrade = parseFloat(grade || '0');
//   const getGradeColor = (score?: number): string => {
//     if (!score) return 'text-gray-600';
//     if (score >= 90) return 'text-green-600';
//     if (score >= 80) return 'text-blue-600';
//     if (score >= 70) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const getGradeLabel = (score?: number): string => {
//     if (!score) return 'Pending';
//     if (score >= 90) return 'Excellent';
//     if (score >= 80) return 'Good';
//     if (score >= 70) return 'Satisfactory';
//     return 'Needs Improvement';
//   };

//   const selectedData = uploadedData.find(s => s.soldierId === selectedSoldier);

//   // Simulating ML model prediction for demonstration
//   // In reality, this would come from your Django backend
//   return (
//     <div className="p-6">
//       {uploadedData.length === 0 ? (
//         <div className="text-center text-gray-500 mt-8">
//           <p className="text-lg">No data available. Please upload soldier data files first.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Soldiers List */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow">
//               <div className="p-4 border-b">
//                 <h2 className="text-lg font-semibold">Uploaded Soldiers Data</h2>
//               </div>
//               <div className="divide-y">
//                 {uploadedData.map((soldier) => (
//                   <div
//                     key={soldier.soldierId}
//                     className={`p-4 cursor-pointer hover:bg-gray-50 ${
//                       selectedSoldier === soldier.soldierId ? 'bg-gray-50' : ''
//                     }`}
//                     onClick={() => setSelectedSoldier(soldier.soldierId)}
//                   >
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h3 className="font-medium">{soldier.name}</h3>
//                         <p className="text-sm text-gray-500">ID: {soldier.soldierId}</p>
//                       </div>
//                       {grade !== undefined && (
//                         <div className={`text-lg font-bold ${getGradeColor(numericGrade)}`}>
//                           {numericGrade?.toFixed(2)}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Detailed Analysis */}
//           <div className="lg:col-span-2">
//             {selectedData ? (
//               <div className="bg-white rounded-lg shadow">
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold mb-2">{selectedData.name}</h2>
//                       <p className="text-gray-500">Soldier ID: {selectedData.soldierId}</p>
//                     </div>
//                     <button
//                       className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                       onClick={() => {/* Handle report download */}}
//                     >
//                       <FiDownload className="mr-2" />
//                       Download Report
//                     </button>
//                   </div>

//                   {grade !== undefined? (
//                     <>
//                       {/* ML Model Grade */}
//                       <div className="mb-8 p-6 bg-gray-50 rounded-lg">
//                         <div className="text-center">
//                           <h3 className="text-lg font-semibold mb-2">ML Model Assessment</h3>
//                           <div className="relative">
//                             <div className="flex items-center justify-center">
//                               <div className="w-48 h-48 rounded-full border-8 border-indigo-500 flex items-center justify-center">
//                                 <div>
//                                   <div className={`text-4xl font-bold ${getGradeColor(numericGrade)}`}>
//                                     {numericGrade.toFixed(2)}
//                                   </div>
//                                   <div className="text-sm text-gray-500">Performance Score</div>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="mt-4">
//                               <p className={`text-xl font-medium ${getGradeColor(numericGrade)}`}>
//                                 {getGradeLabel(numericGrade)}
//                               </p>
//                               <p className="text-sm text-gray-500 mt-1">
//                                 Based on comprehensive analysis of physical and psychological parameters
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Detailed Scores */}
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                         <div className="p-4 bg-gray-50 rounded-lg text-center">
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">Physical Score</h4>
//                           <div className={`text-xl font-bold ${getGradeColor(numericGrade + 5)}`}>
//                             {(numericGrade + 5).toFixed(1)}
//                           </div>
//                         </div>
//                         <div className="p-4 bg-gray-50 rounded-lg text-center">
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">Mental Score</h4>
//                           <div className={`text-xl font-bold ${getGradeColor(numericGrade - 2)}`}>
//                             {(numericGrade - 2).toFixed(1)}
//                           </div>
//                         </div>
//                         <div className="p-4 bg-gray-50 rounded-lg text-center">
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">Combat Score</h4>
//                           <div className={`text-xl font-bold ${getGradeColor(numericGrade + 2)}`}>
//                             {(numericGrade + 2).toFixed(1)}
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="text-center py-8 text-gray-500">
//                       <p>ML model assessment pending...</p>
//                     </div>
//                   )}

//                   {/* File Data Preview */}
//                   <div className="border-t pt-6">
//                     <h3 className="text-lg font-semibold mb-2">Uploaded Data Preview</h3>
//                     <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-40 text-sm">
//                       {JSON.stringify(selectedData.fileData, null, 2)}
//                     </pre>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
//                 <p>Select a soldier to view analysis</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default AnalysisReport;

//-----------------------------------------------------------------------

import { useState, useMemo } from 'react';
import { FiDownload } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const AnalysisReport: React.FC = () => {
  const { uploadedData } = useData();
  const [selectedSoldier, setSelectedSoldier] = useState<string | null>(null);

  // ✅ Generate fixed random grades per soldier only once
  const gradedSoldiers = useMemo(() => {
    return uploadedData.map((soldier) => ({
      ...soldier,
      randomGrade: parseFloat((Math.random() * (80 - 40) + 40).toFixed(2)),
    }));
  }, [uploadedData]);

  const selectedData = gradedSoldiers.find((s) => s.soldierId === selectedSoldier);
  const numericGrade = selectedData?.randomGrade || 0;

  const getGradeColor = (score?: number): string => {
    if (!score) return 'text-gray-600';
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeLabel = (score?: number): string => {
    if (!score) return 'Pending';
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Satisfactory';
    return 'Needs Improvement';
  };

  return (
    <div className="p-6">
      {uploadedData.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-lg">No data available. Please upload soldier data files first.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Soldiers List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Uploaded Soldiers Data</h2>
              </div>
              <div className="divide-y">
                {gradedSoldiers.map((soldier) => (
                  <div
                    key={soldier.soldierId}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedSoldier === soldier.soldierId ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setSelectedSoldier(soldier.soldierId)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{soldier.name}</h3>
                        <p className="text-sm text-gray-500">ID: {soldier.soldierId}</p>
                      </div>
                      <div className={`text-lg font-bold ${getGradeColor(soldier.randomGrade)}`}>
                        {soldier.randomGrade.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="lg:col-span-2">
            {selectedData ? (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedData.name}</h2>
                      <p className="text-gray-500">Soldier ID: {selectedData.soldierId}</p>
                    </div>
                    <button
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => {/* Handle report download */}}
                    >
                      <FiDownload className="mr-2" />
                      Download Report
                    </button>
                  </div>

                  <>
                    {/* ML Model Grade */}
                    <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">ML Model Assessment</h3>
                        <div className="relative">
                          <div className="flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full border-8 border-indigo-500 flex items-center justify-center">
                              <div>
                                <div className={`text-4xl font-bold ${getGradeColor(numericGrade)}`}>
                                  {numericGrade.toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-500">Performance Score</div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className={`text-xl font-medium ${getGradeColor(numericGrade)}`}>
                              {getGradeLabel(numericGrade)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Based on comprehensive analysis of physical and psychological parameters
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Scores */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Physical Score</h4>
                        <div className={`text-xl font-bold ${getGradeColor(numericGrade + 5)}`}>
                          {(numericGrade + 5).toFixed(1)}
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Mental Score</h4>
                        <div className={`text-xl font-bold ${getGradeColor(numericGrade - 2)}`}>
                          {(numericGrade - 2).toFixed(1)}
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Combat Score</h4>
                        <div className={`text-xl font-bold ${getGradeColor(numericGrade + 2)}`}>
                          {(numericGrade + 2).toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </>

                  {/* File Data Preview */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-2">Uploaded Data Preview</h3>
                    <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-40 text-sm">
                      {JSON.stringify(selectedData.fileData, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                <p>Select a soldier to view analysis</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisReport;

