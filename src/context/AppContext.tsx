import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Doctor, Booking, ConsultationType } from '../utils/dummyData';
import { CallState } from '../navigation/types';

// State interface
export interface AppState {
  // Selected concern
  selectedConcern: string | null;
  
  // Selected doctor
  selectedDoctor: Doctor | null;
  
  // Consultation type
  selectedConsultationType: ConsultationType | null;
  
  // Selected date
  selectedDate: {
    date: string;
    day: string;
    dayName: string;
    fullDate: string;
  } | null;
  
  // Selected time slot
  selectedTimeSlot: string | null;
  
  // Concern details
  concernDetails: {
    concern: string;
    severity: string;
    duration: string;
    durationUnit: string;
  } | null;
  
  // Basic info
  basicInfo: {
    gender: string;
    age: string;
    height: string;
    weight: string;
  } | null;
  
  // Bookings
  bookings: Booking[];
  
  // Selected booking for details view
  selectedBooking: Booking | null;
  
  // Call state
  callState: CallState;
  
  // Wallet balance
  walletBalance: number;
  
  // Loading state
  isLoading: boolean;
  
  // Error state
  error: string | null;
}

// Initial state
const initialState: AppState = {
  selectedConcern: null,
  selectedDoctor: null,
  selectedConsultationType: null,
  selectedDate: null,
  selectedTimeSlot: null,
  concernDetails: null,
  basicInfo: null,
  bookings: [],
  selectedBooking: null,
  callState: 'idle',
  walletBalance: 660,
  isLoading: false,
  error: null,
};

// Action types
type AppAction =
  | { type: 'SET_CONCERN'; payload: string }
  | { type: 'SET_DOCTOR'; payload: Doctor }
  | { type: 'SET_CONSULTATION_TYPE'; payload: ConsultationType }
  | { type: 'SET_DATE'; payload: AppState['selectedDate'] }
  | { type: 'SET_TIME_SLOT'; payload: string }
  | { type: 'SET_CONCERN_DETAILS'; payload: AppState['concernDetails'] }
  | { type: 'SET_BASIC_INFO'; payload: AppState['basicInfo'] }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'UPDATE_WALLET_BALANCE'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_BOOKING_FLOW' }
  | { type: 'LOAD_BOOKINGS'; payload: Booking[] }
  | { type: 'SET_SELECTED_BOOKING'; payload: Booking | null }
  | { type: 'SET_CALL_STATE'; payload: CallState };

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_CONCERN':
      return { ...state, selectedConcern: action.payload };
    
    case 'SET_DOCTOR':
      return { ...state, selectedDoctor: action.payload };
    
    case 'SET_CONSULTATION_TYPE':
      return { ...state, selectedConsultationType: action.payload };
    
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };
    
    case 'SET_TIME_SLOT':
      return { ...state, selectedTimeSlot: action.payload };
    
    case 'SET_CONCERN_DETAILS':
      return { ...state, concernDetails: action.payload };
    
    case 'SET_BASIC_INFO':
      return { ...state, basicInfo: action.payload };
    
    case 'ADD_BOOKING':
      return { 
        ...state, 
        bookings: [...state.bookings, action.payload] 
      };
    
    case 'UPDATE_WALLET_BALANCE':
      return { ...state, walletBalance: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'RESET_BOOKING_FLOW':
      return {
        ...state,
        selectedConcern: null,
        selectedDoctor: null,
        selectedConsultationType: null,
        selectedDate: null,
        selectedTimeSlot: null,
        concernDetails: null,
        basicInfo: null,
      };
    
    case 'LOAD_BOOKINGS':
      return { ...state, bookings: action.payload };
    
    case 'SET_SELECTED_BOOKING':
      return { ...state, selectedBooking: action.payload };
    
    case 'SET_CALL_STATE':
      return { ...state, callState: action.payload };
    
    default:
      return state;
  }
};

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  
  // Helper functions
  setConcern: (concern: string) => void;
  setDoctor: (doctor: Doctor) => void;
  setConsultationType: (type: ConsultationType) => void;
  setDate: (date: AppState['selectedDate']) => void;
  setTimeSlot: (timeSlot: string) => void;
  setConcernDetails: (details: AppState['concernDetails']) => void;
  setBasicInfo: (info: AppState['basicInfo']) => void;
  addBooking: (booking: Booking) => void;
  updateWalletBalance: (amount: number) => void;
  resetBookingFlow: () => void;
  makePayment: (amount: number) => boolean;
  setSelectedBooking: (booking: Booking | null) => void;
  setCallState: (callState: CallState) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Helper functions
  const setConcern = (concern: string) => {
    dispatch({ type: 'SET_CONCERN', payload: concern });
  };
  
  const setDoctor = (doctor: Doctor) => {
    dispatch({ type: 'SET_DOCTOR', payload: doctor });
  };
  
  const setConsultationType = (type: ConsultationType) => {
    dispatch({ type: 'SET_CONSULTATION_TYPE', payload: type });
  };
  
  const setDate = (date: AppState['selectedDate']) => {
    dispatch({ type: 'SET_DATE', payload: date });
  };
  
  const setTimeSlot = (timeSlot: string) => {
    dispatch({ type: 'SET_TIME_SLOT', payload: timeSlot });
  };
  
  const setConcernDetails = (details: AppState['concernDetails']) => {
    dispatch({ type: 'SET_CONCERN_DETAILS', payload: details });
  };
  
  const setBasicInfo = (info: AppState['basicInfo']) => {
    dispatch({ type: 'SET_BASIC_INFO', payload: info });
  };
  
  const addBooking = (booking: Booking) => {
    dispatch({ type: 'ADD_BOOKING', payload: booking });
  };
  
  const updateWalletBalance = (amount: number) => {
    dispatch({ type: 'UPDATE_WALLET_BALANCE', payload: amount });
  };
  
  const resetBookingFlow = () => {
    dispatch({ type: 'RESET_BOOKING_FLOW' });
  };
  
  const makePayment = (amount: number): boolean => {
    if (state.walletBalance >= amount) {
      dispatch({ type: 'UPDATE_WALLET_BALANCE', payload: state.walletBalance - amount });
      return true;
    }
    return false;
  };
  
  const setSelectedBooking = (booking: Booking | null) => {
    dispatch({ type: 'SET_SELECTED_BOOKING', payload: booking });
  };
  
  const setCallState = (callState: CallState) => {
    dispatch({ type: 'SET_CALL_STATE', payload: callState });
  };
  
  const value: AppContextType = {
    state,
    dispatch,
    setConcern,
    setDoctor,
    setConsultationType,
    setDate,
    setTimeSlot,
    setConcernDetails,
    setBasicInfo,
    addBooking,
    updateWalletBalance,
    resetBookingFlow,
    makePayment,
    setSelectedBooking,
    setCallState,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
