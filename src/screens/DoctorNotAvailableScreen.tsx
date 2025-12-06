import React from 'react';
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
import { Button } from '../components';
import { useApp } from '../context/AppContext';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type DoctorNotAvailableScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DoctorNotAvailable'>;
  route: RouteProp<RootStackParamList, 'DoctorNotAvailable'>;
};

const DoctorNotAvailableScreen: React.FC<DoctorNotAvailableScreenProps> = ({ navigation, route }) => {
  const { setCallState } = useApp();
  const { doctorName, doctorImage } = route.params;

  const handleGoBack = () => {
    setCallState('idle');
    navigation.navigate('MyBookings');
  };

  const handleTryAgain = () => {
    setCallState('waiting');
    navigation.replace('WaitingForDoctor', {
      doctorName,
      doctorImage,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: doctorImage }}
            style={styles.doctorImage}
          />
          <View style={styles.unavailableOverlay}>
            <Ionicons name="close" size={40} color={colors.error} />
          </View>
        </View>

        <Text style={styles.title}>Doctor Unavailable</Text>
        
        <Text style={styles.message}>
          {doctorName} was unable to take your call at this time.{'\n'}
          Please try again later or choose a different doctor.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Try Again"
            onPress={handleTryAgain}
            fullWidth
            style={styles.tryAgainButton}
          />
          
          <Button
            title="Go Back to Bookings"
            onPress={handleGoBack}
            variant="outline"
            fullWidth
          />
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.5,
  },
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
  },
  tryAgainButton: {
    marginBottom: 12,
  },
});

export default DoctorNotAvailableScreen;
