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
import { Header, Button, DoctorInfoHeader, RadioButton, Dropdown } from '../components';
import { useApp } from '../context/AppContext';
import { validateConcernForm } from '../utils/validators';
import { severityLevels, durationUnits, concerns } from '../utils/dummyData';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type FillingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Filling'>;
};

const FillingScreen: React.FC<FillingScreenProps> = ({ navigation }) => {
  const { state, setConcernDetails } = useApp();
  const [concern, setConcern] = useState(state.selectedConcern || 'Diabetes');
  const [severity, setSeverity] = useState('Mild');
  const [duration, setDuration] = useState('28');
  const [durationUnit, setDurationUnit] = useState('Days');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleProceed = () => {
    const formData = { concern, severity, duration, durationUnit };
    const validation = validateConcernForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setConcernDetails(formData);
    navigation.navigate('BasicInfo');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const severityIndex = severityLevels.indexOf(severity);
  const sliderPosition = (severityIndex / (severityLevels.length - 1)) * 100;

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
        <Text style={styles.title}>Your Concern</Text>

        <DoctorInfoHeader
          doctor={state.selectedDoctor}
          subtitle={`${state.selectedDoctor.specialty} + ${state.selectedDoctor.otherSpecialties.length} others`}
        />

        <Dropdown
          label="Please select a concern"
          value={concern}
          options={concerns.map((c) => ({ label: c.name, value: c.name }))}
          onSelect={setConcern}
          error={errors.concern}
        />

        <View style={styles.sliderContainer}>
          <Text style={styles.inputLabel}>Select severity of your concern</Text>
          
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: `${sliderPosition}%` }]} />
            <View style={[styles.sliderThumb, { left: `${sliderPosition}%` }]} />
          </View>
          
          <View style={styles.severityLabels}>
            {severityLevels.map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setSeverity(level)}
              >
                <Text
                  style={[
                    styles.severityLabel,
                    severity === level && styles.severityLabelActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.durationContainer}>
          <Dropdown
            label="How long have you been facing?"
            value={duration}
            options={Array.from({ length: 30 }, (_, i) => ({
              label: String(i + 1),
              value: String(i + 1),
            }))}
            onSelect={setDuration}
          />
          
          <View style={styles.durationUnitsRow}>
            {durationUnits.map((unit) => (
              <RadioButton
                key={unit}
                label={unit}
                selected={durationUnit === unit}
                onPress={() => setDurationUnit(unit)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Proceed" onPress={handleProceed} />
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
  inputLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  sliderContainer: {
    marginBottom: 32,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginVertical: 20,
    position: 'relative',
  },
  sliderFill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    top: -8,
    marginLeft: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  severityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  severityLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  severityLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  durationContainer: {
    marginBottom: 24,
  },
  durationUnitsRow: {
    flexDirection: 'row',
    marginTop: 0,
    flexWrap: 'wrap',
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

export default FillingScreen;
