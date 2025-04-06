import { useState } from 'react';
import { FiHome, FiUpload, FiFileText, FiAward, FiSettings } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import DataUpload from './components/DataUpload';
import AnalysisReport from './components/AnalysisReport';
import SoldierForm from './components/SoldierForm.tsx';

const performanceData = [
  { name: 'Physical', score: 85 },
  { name: 'Mental', score: 75 },
  { name: 'Combat', score: 90 },
  { name: 'Leadership', score: 70 },
];

const gradeDistribution = [
  { name: 'A Grade', value: 30 },
  { name: 'B Grade', value: 40 },
  { name: 'C Grade', value: 20 },
  { name: 'D Grade', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [predictedGrade, setPredictedGrade] = useState('');
  const renderContent = () => {
    switch (activeMenu) {
      case 'upload':
        return <DataUpload />;
      case 'report':
        return <AnalysisReport />;
      case 'grades':
        return <SoldierForm onGradePredicted={(grade) => {
          setPredictedGrade(grade);
          setActiveMenu('report');
        }} />;
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
              <BarChart width={500} height={300} data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#4F46E5" />
              </BarChart>
            </div>

            {/* Grade Distribution */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Grade Distribution</h2>
              <PieChart width={500} height={300}>
                <Pie
                  data={gradeDistribution}
                  cx={250}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={entry => entry.name}
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.name} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            {/* Recent Assessments */}
            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Recent Assessments</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soldier ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Physical Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Psychological Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Grade</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">001</td>
                      <td className="px-6 py-4 whitespace-nowrap">Rajesh Kumar</td>
                      <td className="px-6 py-4 whitespace-nowrap">A</td>
                      <td className="px-6 py-4 whitespace-nowrap">B+</td>
                      <td className="px-6 py-4 whitespace-nowrap">A-</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">002</td>
                      <td className="px-6 py-4 whitespace-nowrap">Priya Sharma</td>
                      <td className="px-6 py-4 whitespace-nowrap">A-</td>
                      <td className="px-6 py-4 whitespace-nowrap">A</td>
                      <td className="px-6 py-4 whitespace-nowrap">A</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">003</td>
                      <td className="px-6 py-4 whitespace-nowrap">Amit Patel</td>
                      <td className="px-6 py-4 whitespace-nowrap">B+</td>
                      <td className="px-6 py-4 whitespace-nowrap">A-</td>
                      <td className="px-6 py-4 whitespace-nowrap">B+</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">004</td>
                      <td className="px-6 py-4 whitespace-nowrap">Deepika Singh</td>
                      <td className="px-6 py-4 whitespace-nowrap">A</td>
                      <td className="px-6 py-4 whitespace-nowrap">A</td>
                      <td className="px-6 py-4 whitespace-nowrap">A</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">005</td>
                      <td className="px-6 py-4 whitespace-nowrap">Sahitya</td>
                      <td className="px-6 py-4 whitespace-nowrap">B</td>
                      <td className="px-6 py-4 whitespace-nowrap">A+</td>
                      <td className="px-6 py-4 whitespace-nowrap">A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-6">Content for {activeMenu}</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Military Admin</h2>
        </div>
        <nav className="mt-8">
          <SidebarItem icon={<FiHome />} text="Dashboard" active={activeMenu === 'dashboard'} onClick={() => setActiveMenu('dashboard')} />
          <SidebarItem icon={<FiUpload />} text="Data Upload" active={activeMenu === 'upload'} onClick={() => setActiveMenu('upload')} />
          <SidebarItem icon={<FiFileText />} text="Analysis Report" active={activeMenu === 'report'} onClick={() => setActiveMenu('report')} />
          <SidebarItem icon={<FiAward />} text="Grade Assignment" active={activeMenu === 'grades'} onClick={() => setActiveMenu('grades')} />
          <SidebarItem icon={<FiSettings />} text="Settings" active={activeMenu === 'settings'} onClick={() => setActiveMenu('settings')} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-4 py-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
            </h1>
          </div>
        </header>

        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
    // <div className="min-h-screen bg-gray-100 p-8">
    //   <SoldierForm />
    // </div>

}

function SidebarItem({ icon, text, active, onClick }: { icon: React.ReactNode; text: string; active: boolean; onClick: () => void }) {
  return (
    <button
      className={`w-full flex items-center px-4 py-3 text-sm ${
        active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700'
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      {text}
    </button>
  );
}



export default App;