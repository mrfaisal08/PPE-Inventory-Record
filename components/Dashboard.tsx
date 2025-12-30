
import React, { useMemo } from 'react';
import { IPPERecord } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface Props {
  records: IPPERecord[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b', '#06b6d4'];

const Dashboard: React.FC<Props> = ({ records }) => {
  const stats = useMemo(() => {
    const totalItems = records.reduce((acc, curr) => acc + curr.quantity, 0);
    const vesselUsage: Record<string, number> = {};
    const categoryUsage: Record<string, number> = {};
    const requestorUsage: Record<string, number> = {};

    records.forEach(r => {
      vesselUsage[r.vesselName] = (vesselUsage[r.vesselName] || 0) + r.quantity;
      categoryUsage[r.categoryId] = (categoryUsage[r.categoryId] || 0) + r.quantity;
      requestorUsage[r.requestorName] = (requestorUsage[r.requestorName] || 0) + r.quantity;
    });

    const categoryData = Object.keys(categoryUsage).map(key => ({
      name: key,
      value: categoryUsage[key]
    }));

    const vesselData = Object.keys(vesselUsage).map(key => ({
      name: key,
      value: vesselUsage[key]
    }));

    const topRequestor = Object.entries(requestorUsage).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      totalItems,
      activeVessels: Object.keys(vesselUsage).length,
      topRequestor,
      categoryData,
      vesselData
    };
  }, [records]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Items Issued</p>
          <p className="text-4xl font-bold text-slate-900 mt-2">{stats.totalItems}</p>
          <div className="mt-4 flex items-center text-green-600 text-sm font-medium">
            <span>↑ Trending Up</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Vessels</p>
          <p className="text-4xl font-bold text-slate-900 mt-2">{stats.activeVessels}</p>
          <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
             <span>Across Fleet</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Top Recipient</p>
          <p className="text-2xl font-bold text-slate-900 mt-2 truncate">{stats.topRequestor}</p>
          <div className="mt-4 flex items-center text-purple-600 text-sm font-medium">
             <span>Frequent Requestor</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-6">Distribution by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {stats.categoryData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span className="truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-6">Vessel Usage Comparison</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.vesselData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
