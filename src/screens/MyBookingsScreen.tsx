import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, BookingCard, TabSwitch, DisclaimerPopup } from '../components';
import { useApp } from '../context/AppContext';
import { bookings as dummyBookings, Booking } from '../utils/dummyData';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type MyBookingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyBookings'>;
};

const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ navigation }) => {
  const { state, setSelectedBooking, setCallState } = useApp();
  const [activeTab, setActiveTab] = useState('Appointments');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [selectedBookingForCall, setSelectedBookingForCall] = useState<Booking | null>(null);
  
  const allBookings = [...state.bookings, ...dummyBookings];

  const handleViewDetails = (bookingId: string) => {
    const booking = allBookings.find(b => b.id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      navigation.navigate('BookingDetails', { bookingId });
    }
  };

  const handleStartCall = (bookingId: string) => {
    const booking = allBookings.find(b => b.id === bookingId);
    if (booking) {
      setSelectedBookingForCall(booking);
      setShowDisclaimer(true);
    }
  };

  const handleDisclaimerProceed = () => {
    setShowDisclaimer(false);
    if (selectedBookingForCall) {
      // Navigate to Zego CallScreen
      navigation.navigate('CallScreen', {
        callID: `room_${Date.now()}`,
        userID: `user_${Date.now()}`,
        userName: 'Patient',
      });
    }
  };

  const handleDisclaimerCancel = () => {
    setShowDisclaimer(false);
    setSelectedBookingForCall(null);
  };

  const handleCheckPrescription = (bookingId: string) => {
    console.log('Check prescription for booking:', bookingId);
  };

  const handleBackPress = () => {
    navigation.navigate('Concerns');
  };

  const upcomingBookings = allBookings.filter(b => b.status === 'Upcoming');
  const completedBookings = allBookings.filter(b => b.status === 'Completed');

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        showBackButton 
        onBackPress={handleBackPress}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>My Bookings</Text>

        <TabSwitch
          tabs={['Appointments', 'Orders']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'Appointments' && (
          <>
            <TouchableOpacity style={styles.filterRow}>
              <Text style={styles.filterText}>Filter Appointments</Text>
              <Ionicons name="filter" size={18} color={colors.textPrimary} />
            </TouchableOpacity>

            {allBookings.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="calendar-outline" size={64} color={colors.textLight} />
                <Text style={styles.emptyText}>No appointments yet</Text>
                <Text style={styles.emptySubtext}>
                  Book a consultation to see your appointments here
                </Text>
              </View>
            ) : (
              <>
                {upcomingBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onViewDetails={() => handleViewDetails(booking.id)}
                    onStartCall={() => handleStartCall(booking.id)}
                    onCheckPrescription={
                      booking.prescription 
                        ? () => handleCheckPrescription(booking.id) 
                        : undefined
                    }
                  />
                ))}

                {completedBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onViewDetails={() => handleViewDetails(booking.id)}
                  />
                ))}
              </>
            )}
          </>
        )}

        {activeTab === 'Orders' && (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color={colors.textLight} />
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtext}>
              Your medicine orders will appear here
            </Text>
          </View>
        )}
      </ScrollView>

      <DisclaimerPopup
        visible={showDisclaimer}
        onProceed={handleDisclaimerProceed}
        onCancel={handleDisclaimerCancel}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMint,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
    marginTop: 10,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  filterText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginRight: 8,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default MyBookingsScreen;
