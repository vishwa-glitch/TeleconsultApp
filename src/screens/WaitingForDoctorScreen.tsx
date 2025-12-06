import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApp } from '../context/AppContext';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type WaitingForDoctorScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WaitingForDoctor'>;
  route: RouteProp<RootStackParamList, 'WaitingForDoctor'>;
};

const WaitingForDoctorScreen: React.FC<WaitingForDoctorScreenProps> = ({ navigation, route }) => {
  const { setCallState } = useApp();
  const { doctorName, doctorImage } = route.params;
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = Math.random() * 3000 + 5000;
    const willPickUp = Math.random() > 0.3;

    const timer = setTimeout(() => {
      if (willPickUp) {
        setCallState('accepted');
        // Navigate to Zego CallScreen
        navigation.replace('CallScreen', {
          callID: `room_${Date.now()}`,
          userID: `user_${Date.now()}`,
          userName: 'Patient',
        });
      } else {
        setCallState('declined');
        navigation.replace('DoctorNotAvailable', {
          doctorName: doctorName,
          doctorImage: doctorImage,
        });
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [navigation, doctorName, doctorImage, setCallState]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.ringingText}>Ringing{dots}</Text>

        <View style={styles.doctorContainer}>
          <Image
            source={{ uri: doctorImage }}
            style={styles.doctorImage}
          />
        </View>

        <View style={styles.userPreview}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitials}>JP</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jay</Text>
            <Ionicons name="mic" size={14} color={colors.textSecondary} />
          </View>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.controlButton}>
          <Ionicons name="videocam-off" size={24} color={colors.textPrimary} />
        </View>
        <View style={styles.controlButton}>
          <Ionicons name="mic-off" size={24} color={colors.textPrimary} />
        </View>
        <View style={styles.controlButton}>
          <Ionicons name="volume-high" size={24} color={colors.textPrimary} />
        </View>
        <View style={styles.endCallButton}>
          <Ionicons name="call" size={24} color={colors.textWhite} />
        </View>

        <View style={styles.doctorLabel}>
          <Text style={styles.doctorLabelText}>{doctorName}</Text>
          <Ionicons name="mic" size={14} color={colors.textSecondary} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B7B6B',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringingText: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.textWhite,
    marginBottom: 100,
  },
  doctorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  userPreview: {
    position: 'absolute',
    right: 20,
    bottom: 200,
    backgroundColor: '#F5F0E8',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: 80,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8A0A0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInitials: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textWhite,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 12,
    color: colors.textPrimary,
    marginRight: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  endCallButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    transform: [{ rotate: '135deg' }],
  },
  doctorLabel: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  doctorLabelText: {
    fontSize: 12,
    color: colors.textPrimary,
    marginRight: 4,
  },
});

export default WaitingForDoctorScreen;
