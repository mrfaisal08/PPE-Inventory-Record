
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from './constants';
import { IPPERecord } from './types';
import InventoryForm from './components/InventoryForm';
import Dashboard from './components/Dashboard';
import HistoryLog from './components/HistoryLog';
import AISafetyAdvisor from './components/AISafetyAdvisor';

const CompanyLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shadow-lg shadow-teal-500/20 rounded-lg">
    <rect width="100" height="100" rx="16" fill="#2E7BB8" />
    <circle cx="50" cy="50" r="36" stroke="#87E6D0" strokeWidth="6" />
    <path d="M50 25L28 72H37L50 44L63 72H72L50 25Z" fill="#87E6D0" />
    <path d="M38 58H62V64H38V58Z" fill="#87E6D0" />
  </svg>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [records, setRecords] = useState<IPPERecord[]>([]);

  // Load initial demo data
  useEffect(() => {
    const saved = localStorage.getItem('vessel_ppe_records');
    if (saved) {
      setRecords(JSON.parse(saved));
    } else {
      // Mock some data if empty
      const mockRecords: IPPERecord[] = [
        {
          id: '1',
          vesselName: 'MT SEAFARER',
          requestorName: 'Erik Janssen',
          date: '2023-11-20',
          categoryId: 'Hand Protection' as any,
          itemName: 'Impact Gloves',
          size: 'L',
          color: 'High-Viz Orange',
          quantity: 2,
          isVerified: true,
          timestamp: Date.now() - 86400000 * 2
        },
        {
          id: '2',
          vesselName: 'MT SEAFARER',
          requestorName: 'Jane Smith',
          date: '2023-11-21',
          categoryId: 'Head Protection' as any,
          itemName: 'Hard Hat',
          size: 'Standard',
          color: 'White',
          quantity: 1,
          isVerified: true,
          timestamp: Date.now() - 86400000
        }
      ];
      setRecords(mockRecords);
    }
  }, []);

  const handleAddRecord = (record: IPPERecord) => {
    const newRecords = [record, ...records];
    setRecords(newRecords);
    localStorage.setItem('vessel_ppe_records', JSON.stringify(newRecords));
    setActiveTab('history');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard records={records} />;
      case 'record':
        return <InventoryForm onSubmit={handleAddRecord} />;
      case 'history':
        return <HistoryLog records={records} />;
      case 'ai-insights':
        return <AISafetyAdvisor history={records} />;
      default:
        return <Dashboard records={records} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 bg-[#0F172A] text-slate-300 md:fixed md:h-screen z-10 border-r border-slate-800">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-10">
            <CompanyLogo />
            <div>
              <h1 className="text-white font-bold leading-tight tracking-tight">VesselFlow</h1>
              <p className="text-[10px] text-teal-400 uppercase tracking-widest font-bold">Safety Division</p>
            </div>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 hidden md:block">
           <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
              <p className="text-xs font-bold text-slate-500 mb-2 uppercase">Fleet Status</p>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                 System Synchronized
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 bg-slate-50 min-h-screen">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {NAV_ITEMS.find(n => n.id === activeTab)?.label}
            </h2>
            <p className="text-slate-500 text-sm mt-1">Enterprise PPE Inventory Control System</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-600 border border-slate-200">
              JD
            </div>
            <div className="pr-3">
              <p className="text-xs font-bold text-slate-900 leading-none mb-1">Chief Officer</p>
              <p className="text-[10px] text-slate-500 font-medium">Fleet Admin</p>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
        
        <footer className="mt-12 text-center text-slate-400 text-xs border-t border-slate-200 pt-8 pb-4">
          <p>© 2024 VesselFlow PPE Management. Powered by Gemini AI for Maritime Excellence.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
