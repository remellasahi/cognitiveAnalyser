import { createContext, useContext, useState, ReactNode } from 'react';

interface SoldierData {
  soldierId: string;
  name: string;
  physicalScore?: number;
  mentalScore?: number;
  combatScore?: number;
  mlGrade?: number;
  recommendation?: string;
  fileData: any;
}

interface DataContextType {
  uploadedData: SoldierData[];
  addData: (data: SoldierData[]) => void;
  updateGrades: (soldierId: string, grades: Partial<SoldierData>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [uploadedData, setUploadedData] = useState<SoldierData[]>([]);

  const addData = (data: SoldierData[]) => {
    setUploadedData(prev => [...prev, ...data]);
  };

  const updateGrades = (soldierId: string, grades: Partial<SoldierData>) => {
    setUploadedData(prev => 
      prev.map(soldier => 
        soldier.soldierId === soldierId 
          ? { ...soldier, ...grades }
          : soldier
      )
    );
  };

  return (
    <DataContext.Provider value={{ uploadedData, addData, updateGrades }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}