import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Header, Button, CollapsibleSection, DisclaimerPopup } from '../components';
import { useApp } from '../context/AppContext';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type BookingDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BookingDetails'>;
  route: RouteProp<RootStackParamList, 'BookingDetails'>;
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailColon}>:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const BookingDetailsScreen: React.FC<BookingDetailsScreenProps> = ({ navigation, route }) => {
  const { state, setCallState } = useApp();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  const bookingId = route.params?.bookingId;
  const booking = state.selectedBooking || state.bookings.find(b => b.id === bookingId);

  const appointmentDetails = {
    appointmentId: 'APPLF10247816',
    appointmentType: 'Freeaudio',
    appointmentFee: '0 INR',
    duration: '1 min',
    appointmentDate: '19 Nov, 2024',
    appointmentTime: '01:51 PM',
    bookingStatus: 'Completed',
    routineStatus: 'Not assigned',
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleStartCall = () => {
    setShowDisclaimer(true);
  };

  const handleDisclaimerProceed = () => {
    setShowDisclaimer(false);
    // Navigate to Zego CallScreen
    navigation.navigate('CallScreen', {
      callID: `room_${Date.now()}`,
      userID: `user_${Date.now()}`,
      userName: 'Patient',
    });
  };

  const handleDisclaimerCancel = () => {
    setShowDisclaimer(false);
  };

  const handleAttachReport = () => {
    console.log('Attach report pressed');
  };

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showBackButton onBackPress={handleBackPress} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Booking not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Appointment Details</Text>

        <View style={styles.doctorCard}>
          <Image
            source={{ uri: booking.doctorImage }}
            style={styles.doctorImage}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorLabel}>Doctor name</Text>
            <Text style={styles.doctorColon}>:</Text>
            <Text style={styles.doctorName}>{booking.doctorName}</Text>
          </View>
        </View>

        <CollapsibleSection title="Appointment Details" initiallyExpanded>
          <DetailRow label="Appointment ID" value={appointmentDetails.appointmentId} />
          <DetailRow label="Appointment type" value={appointmentDetails.appointmentType} />
          <DetailRow label="Appointment fee" value={appointmentDetails.appointmentFee} />
          <DetailRow label="Duration" value={appointmentDetails.duration} />
          <DetailRow label="Appointment date" value={appointmentDetails.appointmentDate} />
          <DetailRow label="Appointment time" value={appointmentDetails.appointmentTime} />
          <DetailRow label="Booking Status" value={appointmentDetails.bookingStatus} />
        </CollapsibleSection>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Attach report"
          onPress={handleAttachReport}
          fullWidth
        />
      </View>

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
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 24,
    marginTop: 10,
  },
  doctorCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    backgroundColor: colors.backgroundLight,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  doctorColon: {
    fontSize: 14,
    color: colors.textSecondary,
    marginHorizontal: 8,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  detailLabel: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
  },
  detailColon: {
    fontSize: 13,
    color: colors.textSecondary,
    marginHorizontal: 8,
  },
  detailValue: {
    flex: 1.5,
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default BookingDetailsScreen;
