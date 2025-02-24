import { FreezableSet } from '../set';
import { palette } from '@/styles/theme';


export interface Category {
  readonly categoryId: string;
  readonly publicShortCode: string;
  readonly name: string;
  readonly icon: string | null;
  readonly color: string | null;
  readonly createdAt: string;
}


const categories: ReadonlySet<Category> = new FreezableSet([
  {
    categoryId: '1bfdd48e8d9c',
    publicShortCode: 're',
    name: 'Reverse Engineering',
    color: palette.theme.orange.toUpperCase(),
    icon: 'engineering',
    createdAt: '2025-02-23T23:35:34.454Z',
  },
  {
    categoryId: 'e9736e82bc79',
    publicShortCode: 'net',
    name: 'Networking',
    color: palette.theme.blue.toUpperCase(),
    icon: 'lan',
    createdAt: '2025-02-23T23:35:34.454Z',
  },
  {
    categoryId: 'c48c1faea646',
    publicShortCode: 'ig',
    name: 'Information Gathering',
    icon: 'info-log',
    color: palette.theme.teal.toUpperCase(),
    createdAt: '2025-02-23T23:35:34.454Z',
  },
  {
    categoryId: '167254d0bf1c',
    publicShortCode: 'back',
    name: 'Backdoors',
    icon: 'door-open',
    color: palette.theme.red.toUpperCase(),
    createdAt: '2025-02-23T23:35:34.454Z',
  },
  {
    categoryId: '06fcab15834f',
    publicShortCode: 'exp',
    name: 'Exploits',
    icon: 'bug',
    color: palette.theme['yellow-dark'].toUpperCase(),
    createdAt: '2025-02-23T23:35:34.454Z',
  },
  {
    categoryId: '6f6255f05d81',
    publicShortCode: 'hrd',
    name: 'Hardware Devices',
    icon: 'memory-chip',
    color: palette.theme.green.toUpperCase(),
    createdAt: '2025-02-23T23:35:34.454Z',
  },
  {
    categoryId: '4cd6335f5cf3',
    publicShortCode: 'crypto',
    name: 'Crypto & Passwords',
    icon: 'user-key',
    color: palette.theme.indigo.toUpperCase(),
    createdAt: '2025-02-23T23:35:34.454Z',
  },
  {
    categoryId: '111d3366d58e',
    publicShortCode: 'db',
    name: 'Databases',
    icon: 'database',
    color: palette.theme['gray-dark'].toUpperCase(),
    createdAt: '2025-02-23T23:35:34.454Z',
  },
  {
    categoryId: 'dae1bea955b5',
    publicShortCode: 'rf',
    name: 'Radio & RFID',
    icon: 'cell-tower',
    color: palette.theme['cyan-dark'].toUpperCase(),
    createdAt: '2025-02-23T23:35:34.454Z',
  },
  {
    publicShortCode: 'fs',
    name: 'Forensics',
    color: palette.theme['magenta-light'].toUpperCase(),
    icon: 'mystery',
    categoryId: 'f858b3b72988',
    createdAt: '2025-02-24T15:00:38.090Z',
  },
] satisfies Category[]).freeze();


export function findCategories(c: string): Category | null;
export function findCategories(c: string[]): Category[];
export function findCategories(c: string | string[]): Category | Category[] | null {
  const s = [ ...categories ];

  if(typeof c === 'string') {
    const found = s.find(item => {
      return (
        item.categoryId === c ||
        item.publicShortCode.toLowerCase() === c.trim().toLowerCase()
      );
    });

    return found || null;
  }

  return s.filter(item => {
    return (
      c.includes(item.categoryId) ||
      c.map(item => item.toLowerCase().trim()).includes(item.publicShortCode.toLowerCase())
    );
  });
}


export default Object.freeze([ ...categories ].sort((a, b) => a.name.localeCompare(b.name))) as readonly Category[];
