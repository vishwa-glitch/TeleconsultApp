// Dummy data for the appointment booking app

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  otherSpecialties: string[];
  languages: string[];
  experience: number;
  rating: number;
  pricePerMin: number;
  freeMinutes: number;
  imageUrl: string;
  isOnline: boolean;
}

export interface Concern {
  id: string;
  name: string;
  icon: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  available: boolean;
}

export interface Booking {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  consultationType: 'Phone' | 'Video' | 'Chat';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  prescription?: string;
}

export interface ConsultationType {
  id: string;
  name: string;
  price: number;
  duration: string;
  description?: string;
}

// Concerns/Categories
export const concerns: Concern[] = [
  { id: '1', name: 'Hypertension', icon: 'heart-pulse' },
  { id: '2', name: 'Anxiety', icon: 'brain' },
  { id: '3', name: 'Obesity', icon: 'weight' },
  { id: '4', name: 'Diabetes', icon: 'diabetes' },
  { id: '5', name: 'Obesity', icon: 'weight' },
  { id: '6', name: 'Hypertension', icon: 'heart-pulse' },
  { id: '7', name: 'Rubella', icon: 'virus' },
  { id: '8', name: 'Hypothermia', icon: 'thermometer' },
  { id: '9', name: 'Frostbite', icon: 'snowflake' },
  { id: '10', name: 'Arthritis', icon: 'bone' },
  { id: '11', name: 'Migraine', icon: 'head' },
  { id: '12', name: 'Insomnia', icon: 'moon' },
];

// Doctors list
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Prem',
    specialty: 'Gynecology',
    otherSpecialties: ['Obstetrics', 'Infertility'],
    languages: ['Hindi', 'English', 'Telugu'],
    experience: 7,
    rating: 4.5,
    pricePerMin: 15,
    freeMinutes: 5,
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Dr. Deepa Godara',
    specialty: 'Orthodontist',
    otherSpecialties: ['Dental Care'],
    languages: ['Hindi', 'English'],
    experience: 5,
    rating: 4.8,
    pricePerMin: 20,
    freeMinutes: 5,
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Dr. Rahul Sharma',
    specialty: 'Cardiology',
    otherSpecialties: ['Internal Medicine'],
    languages: ['Hindi', 'English', 'Punjabi'],
    experience: 12,
    rating: 4.9,
    pricePerMin: 25,
    freeMinutes: 5,
    imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    isOnline: false,
  },
  {
    id: '4',
    name: 'Dr. Priya Menon',
    specialty: 'Dermatology',
    otherSpecialties: ['Cosmetology'],
    languages: ['Hindi', 'English', 'Malayalam'],
    experience: 8,
    rating: 4.6,
    pricePerMin: 18,
    freeMinutes: 5,
    imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    isOnline: true,
  },
];

// Consultation types
export const consultationTypes: ConsultationType[] = [
  {
    id: 'phone',
    name: 'Phone Consultation',
    price: 15,
    duration: '20min',
  },
  {
    id: 'video',
    name: 'Video Consultation',
    price: 35,
    duration: '30min',
  },
  {
    id: 'chat',
    name: 'Chat Consultation',
    price: 50,
    duration: '30 conversation texts',
    description: 'Valid: 72 hours',
  },
];

// Time slots
export const timeSlots: TimeSlot[] = [
  // Morning
  { id: '1', time: '09:00 AM', period: 'Morning', available: true },
  { id: '2', time: '09:35 AM', period: 'Morning', available: true },
  { id: '3', time: '10:05 AM', period: 'Morning', available: true },
  // Afternoon
  { id: '4', time: '12:00 PM', period: 'Afternoon', available: true },
  { id: '5', time: '12:35 PM', period: 'Afternoon', available: true },
  { id: '6', time: '01:05 PM', period: 'Afternoon', available: true },
  // Evening
  { id: '7', time: '06:00 PM', period: 'Evening', available: true },
  { id: '8', time: '07:00 PM', period: 'Evening', available: true },
  { id: '9', time: '08:05 PM', period: 'Evening', available: true },
  { id: '10', time: '12:00 PM', period: 'Evening', available: false },
  { id: '11', time: '12:35 AM', period: 'Evening', available: true },
  { id: '12', time: '01:05 PM', period: 'Evening', available: true },
];

// Generate dates for the next 2 weeks
export const generateDates = (): { date: string; day: string; dayName: string }[] => {
  const dates: { date: string; day: string; dayName: string }[] = [];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push({
      date: `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]}`,
      day: date.getDate().toString().padStart(2, '0'),
      dayName: dayNames[date.getDay()],
    });
  }
  
  return dates;
};

// Bookings
export const bookings: Booking[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Prem',
    doctorSpecialty: 'Orthodontist',
    doctorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'Tuesday, 13/09/2023',
    time: '10:30 AM',
    consultationType: 'Video',
    status: 'Upcoming',
    prescription: 'Dr. Deepa has suggested some solution',
  },
  {
    id: '2',
    doctorId: '2',
    doctorName: 'Dr. Deepa Godara',
    doctorSpecialty: 'Orthodontist',
    doctorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Tuesday, 13/09/2023',
    time: '10:30 AM',
    consultationType: 'Phone',
    status: 'Completed',
  },
];

// Filter categories for doctor list
export const filterCategories = ['All', 'Hair', 'Diabetes', 'Dental', 'Heart', 'Skin'];

// Severity levels
export const severityLevels = ['Mild', 'Moderate', 'Severe'];

// Duration units
export const durationUnits = ['Days', 'Weeks', 'Months', 'Year'];

// Gender options
export const genderOptions = ['Male', 'Female', 'Prefer not to say'];
