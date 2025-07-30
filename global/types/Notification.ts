import { Dose } from './Dose';

export type DoseType = 'Morning' | 'Evening' | 'Night';

export type Notification = {
  disease: string;
  time?: Date;
  doseType: DoseType;
  doses: Dose[];
};
