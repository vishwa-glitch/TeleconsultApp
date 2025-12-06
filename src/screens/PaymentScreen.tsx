import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../components';
import { useApp } from '../context/AppContext';
import { Booking } from '../utils/dummyData';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type PaymentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Payment'>;
};

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation }) => {
  const { state, makePayment, addBooking, resetBookingFlow } = useApp();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const consultationFee = state.selectedConsultationType?.price || 50;

  useEffect(() => {
    const timer = setTimeout(() => {
      const success = makePayment(consultationFee);
      setPaymentSuccess(success);
      setIsProcessing(false);

      if (success && state.selectedDoctor) {
        const newBooking: Booking = {
          id: `booking_${Date.now()}`,
          doctorId: state.selectedDoctor.id,
          doctorName: state.selectedDoctor.name,
          doctorSpecialty: state.selectedDoctor.specialty,
          doctorImage: state.selectedDoctor.imageUrl,
          date: state.selectedDate?.fullDate || new Date().toLocaleDateString(),
          time: state.selectedTimeSlot || '10:00 AM',
          consultationType: state.selectedConsultationType?.name.includes('Video') 
            ? 'Video' 
            : state.selectedConsultationType?.name.includes('Chat')
            ? 'Chat'
            : 'Phone',
          status: 'Upcoming',
        };
        addBooking(newBooking);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCheckBookings = () => {
    resetBookingFlow();
    navigation.reset({
      index: 0,
      routes: [{ name: 'MyBookings' }],
    });
  };

  if (isProcessing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Processing payment...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!paymentSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.errorIcon}>
            <Ionicons name="close" size={48} color={colors.error} />
          </View>
          <Text style={styles.errorTitle}>Payment Failed</Text>
          <Text style={styles.errorSubtitle}>
            Insufficient wallet balance. Please add funds and try again.
          </Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: state.selectedDoctor?.imageUrl }}
            style={styles.doctorImage}
          />
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={20} color={colors.textWhite} />
          </View>
        </View>

        <Text style={styles.paidAmount}>Paid ₹{consultationFee}</Text>
        <Text style={styles.successMessage}>
          {state.selectedConsultationType?.name || 'Chat Consultation'} Booked Successfully
        </Text>

        <View style={styles.balanceContainer}>
          <Ionicons name="wallet-outline" size={24} color={colors.textSecondary} />
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹ {state.walletBalance}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Check Bookings" onPress={handleCheckBookings} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMint,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  doctorImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.backgroundLight,
  },
  checkmark: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.backgroundMint,
  },
  paidAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 4,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.transparent,
  },
  button: {
    marginTop: 24,
  },
  errorIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.errorLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default PaymentScreen;
