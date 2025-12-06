import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import colors from '../utils/colors';

type TestCallEntryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TestCallEntry'>;
};

const TEST_CALL_ID = 'test_call_001';

const TestCallEntryScreen: React.FC<TestCallEntryScreenProps> = ({ navigation }) => {
  
  const handleJoinAsPatient = () => {
    navigation.navigate('CallScreen', {
      callID: TEST_CALL_ID,
      userID: 'patient_001',
      userName: 'Patient',
    });
  };

  const handleJoinAsDoctor = () => {
    navigation.navigate('CallScreen', {
      callID: TEST_CALL_ID,
      userID: 'doctor_001',
      userName: 'Doctor',
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Developer Test Call</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Test Call Setup</Text>
          <Text style={styles.infoText}>
            Both devices will join the same call room:{'\n'}
            <Text style={styles.callId}>{TEST_CALL_ID}</Text>
          </Text>
          <Text style={styles.infoNote}>
            Use one device as Patient and another as Doctor to test video call.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.patientButton]}
            onPress={handleJoinAsPatient}
          >
            <Text style={styles.buttonEmoji}>🧑‍💼</Text>
            <Text style={styles.buttonTitle}>Join as Patient</Text>
            <Text style={styles.buttonSubtitle}>userID: patient_001</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.doctorButton]}
            onPress={handleJoinAsDoctor}
          >
            <Text style={styles.buttonEmoji}>👨‍⚕️</Text>
            <Text style={styles.buttonTitle}>Join as Doctor</Text>
            <Text style={styles.buttonSubtitle}>userID: doctor_001</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>How to Test:</Text>
          <Text style={styles.instructionsText}>
            1. Open app on physical phone{'\n'}
            2. Tap "Join as Patient"{'\n'}
            3. Open app on emulator{'\n'}
            4. Tap "Join as Doctor"{'\n'}
            5. Video call should connect!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMint,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoBox: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  callId: {
    fontWeight: '700',
    color: colors.primary,
  },
  infoNote: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 24,
  },
  button: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  patientButton: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  doctorButton: {
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  buttonEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  instructions: {
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    padding: 16,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});

export default TestCallEntryScreen;
