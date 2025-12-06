// Navigation type definitions

export type RootStackParamList = {
  Concerns: undefined;
  DoctorList: { concern?: string };
  Scheduling: undefined;
  ChooseDate: undefined;
  TimeSlot: undefined;
  Filling: undefined;
  BasicInfo: undefined;
  AppointmentDetails: undefined;
  Payment: undefined;
  MyBookings: undefined;
  Call: { roomId: string; doctorName: string };
  // Zego Call Screen
  CallScreen: { callID: string; userID: string; userName: string };
  // Developer Test Screen
  TestCallEntry: undefined;
  // New screens for booking details flow
  BookingDetails: { bookingId: string };
  WaitingForDoctor: { doctorName: string; doctorImage: string };
  DoctorNotAvailable: { doctorName: string; doctorImage: string };
};

// Call state type
export type CallState = 'idle' | 'waiting' | 'accepted' | 'declined';

// Screen names as constants
export const SCREENS = {
  CONCERNS: 'Concerns',
  DOCTOR_LIST: 'DoctorList',
  SCHEDULING: 'Scheduling',
  CHOOSE_DATE: 'ChooseDate',
  TIME_SLOT: 'TimeSlot',
  FILLING: 'Filling',
  BASIC_INFO: 'BasicInfo',
  APPOINTMENT_DETAILS: 'AppointmentDetails',
  PAYMENT: 'Payment',
  MY_BOOKINGS: 'MyBookings',
  CALL: 'Call',
  CALL_SCREEN: 'CallScreen',
  BOOKING_DETAILS: 'BookingDetails',
  WAITING_FOR_DOCTOR: 'WaitingForDoctor',
  DOCTOR_NOT_AVAILABLE: 'DoctorNotAvailable',
} as const;
