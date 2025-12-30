
import React, { useState } from 'react';
import { IPPERecord } from '../types';

interface Props {
  records: IPPERecord[];
}

const HistoryLog: React.FC<Props> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter(r => 
    r.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.requestorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="font-semibold text-slate-900">Issuance History Log</h2>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search vessels, names, items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Vessel</th>
              <th className="px-6 py-4">Requestor</th>
              <th className="px-6 py-4">PPE Item</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4 text-center">Qty</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRecords.length > 0 ? filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{record.date}</td>
                <td className="px-6 py-4 text-slate-600">{record.vesselName}</td>
                <td className="px-6 py-4 text-slate-600">{record.requestorName}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded bg-slate-100 text-slate-800 text-xs font-medium mr-2">
                    {record.categoryId}
                  </span>
                  <span className="text-slate-900 font-medium">{record.itemName}</span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {record.size} / {record.color}
                </td>
                <td className="px-6 py-4 text-center font-bold text-blue-600">{record.quantity}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-green-600 font-medium text-xs">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Verified
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                  No records found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLog;
