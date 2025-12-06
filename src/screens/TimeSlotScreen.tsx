import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header, Button, DoctorInfoHeader, TimeSlotCard, ProgressIndicator } from '../components';
import { timeSlots } from '../utils/dummyData';
import { useApp } from '../context/AppContext';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type TimeSlotScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TimeSlot'>;
};

const TimeSlotScreen: React.FC<TimeSlotScreenProps> = ({ navigation }) => {
  const { state, setTimeSlot } = useApp();
  const [selectedSlot, setSelectedSlot] = useState<string | null>('3');

  const handleSlotSelect = (slotId: string) => {
    const slot = timeSlots.find((s) => s.id === slotId);
    if (slot && slot.available) {
      setSelectedSlot(slotId);
      setTimeSlot(slot.time);
    }
  };

  const handleConfirmAppointment = () => {
    if (selectedSlot) {
      navigation.navigate('Filling');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (!state.selectedDoctor) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showBackButton onBackPress={handleBackPress} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No doctor selected</Text>
        </View>
      </SafeAreaView>
    );
  }

  const morningSlots = timeSlots.filter((slot) => slot.period === 'Morning');
  const afternoonSlots = timeSlots.filter((slot) => slot.period === 'Afternoon');
  const eveningSlots = timeSlots.filter((slot) => slot.period === 'Evening');

  const consultationType = state.selectedConsultationType?.name || 'Consultation';
  const consultationPrice = state.selectedConsultationType?.price 
    ? `₹ ${state.selectedConsultationType.price}` 
    : 'Free';

  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose Time Slot</Text>

        <ProgressIndicator steps={4} currentStep={1} />

        <DoctorInfoHeader
          doctor={state.selectedDoctor}
          subtitle={`${consultationType} - ${consultationPrice}`}
        />

        <Text style={styles.sectionTitle}>Pick a time slot</Text>

        <Text style={styles.periodTitle}>Morning</Text>
        <View style={styles.slotsRow}>
          {morningSlots.map((slot) => (
            <TimeSlotCard
              key={slot.id}
              time={slot.time}
              selected={selectedSlot === slot.id}
              available={slot.available}
              onPress={() => handleSlotSelect(slot.id)}
            />
          ))}
        </View>

        <Text style={styles.periodTitle}>Afternoon</Text>
        <View style={styles.slotsRow}>
          {afternoonSlots.map((slot) => (
            <TimeSlotCard
              key={slot.id}
              time={slot.time}
              selected={selectedSlot === slot.id}
              available={slot.available}
              onPress={() => handleSlotSelect(slot.id)}
            />
          ))}
        </View>

        <Text style={styles.periodTitle}>Evening</Text>
        <View style={styles.slotsRow}>
          {eveningSlots.map((slot) => (
            <TimeSlotCard
              key={slot.id}
              time={slot.time}
              selected={selectedSlot === slot.id}
              available={slot.available}
              onPress={() => handleSlotSelect(slot.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Confirm Appointment"
          onPress={handleConfirmAppointment}
          disabled={!selectedSlot}
        />
      </View>
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
    marginBottom: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  periodTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    marginTop: 8,
  },
  slotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
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

export default TimeSlotScreen;
