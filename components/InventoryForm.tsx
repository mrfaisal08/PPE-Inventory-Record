
import React, { useState, useMemo } from 'react';
import { PPE_ITEMS } from '../constants';
import { PPECategory, IPPERecord } from '../types';

interface Props {
  onSubmit: (record: IPPERecord) => void;
}

const InventoryForm: React.FC<Props> = ({ onSubmit }) => {
  const [vesselName, setVesselName] = useState('');
  const [requestorName, setRequestorName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState<PPECategory>(PPECategory.HEAD);
  const [selectedItemName, setSelectedItemName] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isVerified, setIsVerified] = useState(false);

  const filteredItems = useMemo(() => {
    const items = PPE_ITEMS.filter(i => i.category === selectedCategory);
    if (items.length > 0 && !items.find(i => i.name === selectedItemName)) {
        setSelectedItemName(items[0].name);
        setSize(items[0].sizes[0]);
        setColor(items[0].colors?.[0] || 'N/A');
    }
    return items;
  }, [selectedCategory]);

  const currentItem = useMemo(() => {
    return PPE_ITEMS.find(i => i.name === selectedItemName);
  }, [selectedItemName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vesselName || !requestorName || !selectedItemName || !isVerified) {
      alert("Please fill all required fields and verify the quantity.");
      return;
    }

    const newRecord: IPPERecord = {
      id: crypto.randomUUID(),
      vesselName,
      requestorName,
      date,
      categoryId: selectedCategory,
      itemName: selectedItemName,
      size,
      color,
      quantity,
      isVerified,
      timestamp: Date.now()
    };

    onSubmit(newRecord);
    // Reset partial form
    setRequestorName('');
    setIsVerified(false);
    setQuantity(1);
    alert("PPE Request Recorded Successfully!");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-4">
        <h2 className="text-white font-semibold text-lg flex items-center gap-2">
          <span>📝</span> PPE Issuance Form
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vessel & Requestor */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vessel Name</label>
              <input 
                type="text" 
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                placeholder="e.g. MT OCEAN VOYAGER"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Requestor Name</label>
              <input 
                type="text" 
                value={requestorName}
                onChange={(e) => setRequestorName(e.target.value)}
                placeholder="e.g. John Doe (Chief Mate)"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date Issued</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
          </div>

          {/* PPE Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as PPECategory)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              >
                {Object.values(PPECategory).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
              <select 
                value={selectedItemName}
                onChange={(e) => {
                    setSelectedItemName(e.target.value);
                    const item = PPE_ITEMS.find(i => i.name === e.target.value);
                    if (item) {
                        setSize(item.sizes[0]);
                        setColor(item.colors?.[0] || 'N/A');
                    }
                }}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              >
                {filteredItems.map(item => (
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Size</label>
                <select 
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                >
                  {currentItem?.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Color/Type</label>
                <select 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                >
                  {currentItem?.colors ? currentItem.colors.map(c => <option key={c} value={c}>{c}</option>) : <option value="N/A">N/A</option>}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Quantity Taken</label>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center border border-slate-300 rounded-lg hover:bg-slate-50 active:bg-slate-100"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                readOnly
                className="w-16 text-center font-semibold bg-slate-50 border border-slate-300 rounded-lg py-2"
              />
              <button 
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center border border-slate-300 rounded-lg hover:bg-slate-50 active:bg-slate-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
            <input 
              type="checkbox" 
              id="verify"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="mt-1 w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="verify" className="text-sm text-blue-800 font-medium cursor-pointer select-none">
              I verify that the information provided above is accurate and I have received the specified quantity of PPE.
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all transform active:scale-95 ${isVerified ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-slate-300 cursor-not-allowed'}`}
            disabled={!isVerified}
          >
            Confirm & Record Issuance
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
