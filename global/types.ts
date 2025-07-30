import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {ReactNode} from 'react';
export type Routine = 'Morning' | 'Afternoon' | 'Evening';

export type Auth = {
  id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
  isLoggedIn?: boolean;
  password?: string;
  date_of_birth?: Date | null;
  avatar?: string;
  gender?: string | null;
  verify?: boolean;
  code?: number;
};

export type NotificationContent = {
  subject: string;
  body: object;
  type: string;
  view: boolean;
  _id: string;
  createdAt?: string;
  action: (_id: string) => void;
};

export type Disease = {
  _id: string;
  name: string;
};

export type NotifcationContentProps = NotificationContent & {
  action: (_id: string) => void;
};
export type Notification = {
  _id?: string;
  notification_content: NotificationContent[];
  socket_id: string;
  push_notification?: boolean;
  device_token?: string;
};

type BodyType = {
  [key: string]: any;
};
type RequestType = {
  url: string;
  method?: string;
  headers?: HeadersInit_;
};
export type PostRequestType = RequestType & {
  body?: BodyType;
};

export type PutRequestTypes = RequestType & {
  body: BodyType;
};

export type PatchRequestType = RequestType & {
  body: BodyType;
};
export type GetRequestType = RequestType;

export type DeleteRequestType = RequestType & {params: string | number};

export type Option = {
  icon: IconDefinition;
  title: string;
  action: () => void;
};

export type Medication = {
  _id?: string;
  name?: string;
  disease?: string;
  days?: number;
  start_date?: Date | null;
  end_date?: Date | null;
  doses?: Dose[] | null;
  status?: string;
};

export type OptionArray = Option[];

export type Dose = {
  plans?: any;
  medicine_type: string;
  quantity: number;
  medicine_name: string;
  routine: string[] | string;
};

export type StackParams = {
  Register: undefined;
  Startup: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  Auth: undefined;
  AccountSetting: undefined;
  PrescribedPlan: undefined;
  PrescribedMedicine: undefined;
  Main: undefined;
  NotificationSetting: undefined;
  LanguageSetting: undefined;
  Anatomy: undefined;
  ReminderScreen: {
    medication_id: string;
    routine: string;
  };
  MedicationDetail: {
    medication_id: string;
  };
};

export type TabParams = {
  Home: undefined;
  Notification: undefined;
  Medication: undefined;
  History: undefined;
  Setting: undefined;
};

export type NotificationSettingType = {
  push_notification?: boolean;
  device_token?: string;
};

export type NotificationTile = {
  notification?: {
    title?: string;
    body?: string;
    data?: {
      routine?: string;
      medication_id?: string;
      type?: string;
    };
  };
};

export type Track = {
  id?: number;
  date: string;
  taken: boolean;
  routine: string;
};

export type Anatomy = {
  name: string;
  svgIcon: ReactNode;
};

export type AnatomyArray = Anatomy[];

export type TrackArray = Track[];
