
import { PPECategory, PPEItem } from './types';

export const PPE_ITEMS: PPEItem[] = [
  { id: 'h1', category: PPECategory.HEAD, name: 'Hard Hat', sizes: ['Standard', 'Large'], colors: ['White', 'Yellow', 'Blue', 'Red'] },
  { id: 'h2', category: PPECategory.HEAD, name: 'Balaclava', sizes: ['Universal'], colors: ['Black', 'Navy'] },
  
  { id: 'e1', category: PPECategory.EYE_FACE, name: 'Safety Glasses', sizes: ['Standard', 'Over-spec'], colors: ['Clear', 'Tinted'] },
  { id: 'e2', category: PPECategory.EYE_FACE, name: 'Safety Goggles', sizes: ['Standard'], colors: ['Clear'] },
  { id: 'e3', category: PPECategory.EYE_FACE, name: 'Face Shield', sizes: ['Full'], colors: ['Clear'] },

  { id: 'he1', category: PPECategory.HEARING, name: 'Ear Plugs', sizes: ['Universal'], colors: ['Orange', 'Green'] },
  { id: 'he2', category: PPECategory.HEARING, name: 'Ear Muffs', sizes: ['Standard'], colors: ['Red', 'Yellow'] },

  { id: 'r1', category: PPECategory.RESPIRATORY, name: 'N95 Mask', sizes: ['S', 'M', 'L'], colors: ['White'] },
  { id: 'r2', category: PPECategory.RESPIRATORY, name: 'Half-Face Respirator', sizes: ['M', 'L'], colors: ['Grey'] },
  { id: 'r3', category: PPECategory.RESPIRATORY, name: 'SCBA Cylinder', sizes: ['6L', '9L'], colors: ['Yellow'] },

  { id: 'ha1', category: PPECategory.HAND, name: 'Nitrile Gloves', sizes: ['S', 'M', 'L', 'XL'], colors: ['Blue'] },
  { id: 'ha2', category: PPECategory.HAND, name: 'Leather Gloves', sizes: ['M', 'L', 'XL'], colors: ['Yellow', 'Tan'] },
  { id: 'ha3', category: PPECategory.HAND, name: 'Impact Gloves', sizes: ['M', 'L', 'XL'], colors: ['High-Viz Orange'] },
  { id: 'ha4', category: PPECategory.HAND, name: 'Chemical Resistant Gloves', sizes: ['L', 'XL'], colors: ['Green'] },

  { id: 'b1', category: PPECategory.BODY, name: 'Cotton Coveralls', sizes: ['38', '40', '42', '44', '46', '48'], colors: ['Navy', 'Orange'] },
  { id: 'b2', category: PPECategory.BODY, name: 'Flame Retardant Coveralls', sizes: ['38', '40', '42', '44', '46', '48'], colors: ['Red'] },
  { id: 'b3', category: PPECategory.BODY, name: 'Rain Suit', sizes: ['M', 'L', 'XL'], colors: ['Yellow'] },
  { id: 'b4', category: PPECategory.BODY, name: 'Life Jacket', sizes: ['Universal'], colors: ['Orange'] },

  { id: 'f1', category: PPECategory.FOOT, name: 'Safety Boots (Steel Toe)', sizes: ['7', '8', '9', '10', '11', '12'], colors: ['Black', 'Brown'] },
  { id: 'f2', category: PPECategory.FOOT, name: 'Rubber Deck Boots', sizes: ['8', '9', '10', '11'], colors: ['Yellow', 'Blue'] },

  { id: 'fl1', category: PPECategory.FALL, name: 'Full Body Harness', sizes: ['Standard', 'XL'], colors: ['Yellow/Black'] },
  { id: 'fl2', category: PPECategory.FALL, name: 'Lanyard with Shock Absorber', sizes: ['2m'], colors: ['White/Red'] },
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'record', label: 'Record PPE Out', icon: '📝' },
  { id: 'history', label: 'Usage Logs', icon: '📋' },
  { id: 'ai-insights', label: 'AI Safety Advisor', icon: '🤖' },
];
