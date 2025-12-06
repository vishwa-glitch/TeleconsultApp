import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Button, DoctorInfoHeader, DateCard, ProgressIndicator } from '../components';
import { generateDates } from '../utils/dummyData';
import { useApp } from '../context/AppContext';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type ChooseDateScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ChooseDate'>;
};

const ChooseDateScreen: React.FC<ChooseDateScreenProps> = ({ navigation }) => {
  const { state, setDate } = useApp();
  const dates = useMemo(() => generateDates(), []);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleDateSelect = (index: number) => {
    setSelectedIndex(index);
    const selectedDate = dates[index];
    setDate({
      ...selectedDate,
      fullDate: `${selectedDate.date} 2025`,
    });
  };

  const handleConfirmDate = () => {
    if (selectedIndex !== null) {
      navigation.navigate('TimeSlot');
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

  const selectedDateText = selectedIndex !== null 
    ? `${dates[selectedIndex].date} 2025` 
    : 'Select a date';

  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose Date</Text>

        <ProgressIndicator steps={4} currentStep={0} />

        <DoctorInfoHeader
          doctor={state.selectedDoctor}
          subtitle="Male-Female Infertility"
        />

        <Text style={styles.sectionTitle}>Pick Appointment Date</Text>

        <View style={styles.datesGrid}>
          {dates.map((date, index) => (
            <DateCard
              key={index}
              date={date.date}
              dayName={date.dayName}
              selected={selectedIndex === index}
              onPress={() => handleDateSelect(index)}
            />
          ))}
        </View>

        <View style={styles.selectedDateContainer}>
          <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.selectedDateText}>{selectedDateText}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Confirm Date"
          onPress={handleConfirmDate}
          disabled={selectedIndex === null}
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
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  selectedDateText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
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

export default ChooseDateScreen;
