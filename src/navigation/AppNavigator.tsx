import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// Direct imports to avoid circular dependency issues
import ConcernsScreen from '../screens/ConcernsScreen';
import DoctorListScreen from '../screens/DoctorListScreen';
import SchedulingScreen from '../screens/SchedulingScreen';
import ChooseDateScreen from '../screens/ChooseDateScreen';
import TimeSlotScreen from '../screens/TimeSlotScreen';
import FillingScreen from '../screens/FillingScreen';
import BasicInfoScreen from '../screens/BasicInfoScreen';
import AppointmentDetailsScreen from '../screens/AppointmentDetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import LegacyCallScreen from '../screens/LegacyCallScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';
import WaitingForDoctorScreen from '../screens/WaitingForDoctorScreen';
import DoctorNotAvailableScreen from '../screens/DoctorNotAvailableScreen';
import TestCallEntryScreen from '../screens/TestCallEntryScreen';
import CallScreen from '../screens/CallScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Concerns"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Concerns" component={ConcernsScreen} />
        <Stack.Screen name="DoctorList" component={DoctorListScreen} />
        <Stack.Screen name="Scheduling" component={SchedulingScreen} />
        <Stack.Screen name="ChooseDate" component={ChooseDateScreen} />
        <Stack.Screen name="TimeSlot" component={TimeSlotScreen} />
        <Stack.Screen name="Filling" component={FillingScreen} />
        <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
        <Stack.Screen name="Call" component={LegacyCallScreen} />
        <Stack.Screen 
          name="CallScreen" 
          component={CallScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="TestCallEntry" component={TestCallEntryScreen} />
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
        <Stack.Screen name="WaitingForDoctor" component={WaitingForDoctorScreen} />
        <Stack.Screen name="DoctorNotAvailable" component={DoctorNotAvailableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
