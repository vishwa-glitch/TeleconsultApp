import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header, Button, DoctorInfoHeader, Dropdown, NumberInput } from '../components';
import { useApp } from '../context/AppContext';
import { validateBasicInfo } from '../utils/validators';
import { genderOptions } from '../utils/dummyData';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type BasicInfoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BasicInfo'>;
};

const BasicInfoScreen: React.FC<BasicInfoScreenProps> = ({ navigation }) => {
  const { state, setBasicInfo } = useApp();
  const [gender, setGender] = useState('Prefer not to say');
  const [age, setAge] = useState('28');
  const [height, setHeight] = useState('171');
  const [weight, setWeight] = useState('63');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleConfirm = () => {
    const formData = { gender, age, height, weight };
    const validation = validateBasicInfo(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setBasicInfo(formData);
    navigation.navigate('AppointmentDetails');
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

  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Basic Info</Text>

        <DoctorInfoHeader
          doctor={state.selectedDoctor}
          subtitle={`${state.selectedDoctor.specialty} + ${state.selectedDoctor.otherSpecialties.length} others`}
        />

        <Text style={styles.sectionTitle}>Please confirm your basic information</Text>

        <Dropdown
          label="Gender"
          value={gender}
          options={genderOptions.map((g) => ({ label: g, value: g }))}
          onSelect={setGender}
          error={errors.gender}
        />

        <NumberInput
          label="Age"
          value={age}
          onChangeText={setAge}
          suffix="years"
          min={1}
          max={120}
          error={errors.age}
        />

        <NumberInput
          label="Height"
          value={height}
          onChangeText={setHeight}
          suffix="cms"
          min={30}
          max={300}
          error={errors.height}
        />

        <NumberInput
          label="Weight"
          value={weight}
          onChangeText={setWeight}
          suffix="kg"
          min={1}
          max={500}
          error={errors.weight}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Confirm" onPress={handleConfirm} />
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
    marginBottom: 24,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 20,
    fontWeight: '500',
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

export default BasicInfoScreen;
