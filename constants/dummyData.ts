import {Notification} from '../global/types/Notification';
import {Dose} from '../global/types/Dose';

const doses: Dose[] = [
  {medicineName: 'A', quantity: 1, type: 'Tablet'},
  {medicineName: 'B', quantity: 2, type: 'Capsule'},
];
export const notification: Notification = {
  disease: 'Typhoid',
  doseType: 'Morning',
  doses: doses,
  time: new Date(),
};
