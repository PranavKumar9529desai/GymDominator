export type MacroCardColor = 'indigo' | 'emerald' | 'amber';

export interface MacroCardProps {
  title: string;
  amount: number;
  unit: string;
  color: MacroCardColor;
}
