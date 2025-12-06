import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Button } from '../components';
import { useApp } from '../context/AppContext';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type AppointmentDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AppointmentDetails'>;
};

const AppointmentDetailsScreen: React.FC<AppointmentDetailsScreenProps> = ({ navigation }) => {
  const { state } = useApp();

  const handleMakePayment = () => {
    navigation.navigate('Payment');
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

  const consultationFee = state.selectedConsultationType?.price || 50;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: state.selectedDoctor.imageUrl }}
            style={styles.doctorImage}
          />
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={16} color={colors.textWhite} />
          </View>
        </View>

        <Text style={styles.title}>Appointment Confirmed</Text>
        <Text style={styles.subtitle}>
          Thank you for choosing our Experts to help guide you
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Expert</Text>
            <Text style={styles.detailValue}>{state.selectedDoctor.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Appointment Date</Text>
            <Text style={styles.detailValue}>
              {state.selectedDate?.fullDate || '23 November 2023'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Appointment Time</Text>
            <Text style={styles.detailValue}>
              {state.selectedTimeSlot || '17:28 PM'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Consultation Type</Text>
            <Text style={styles.detailValue}>
              {state.selectedConsultationType?.name || 'Phone Consultation'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Current Wallet Balance</Text>
            <Text style={styles.detailValue}>₹ {state.walletBalance}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Consultation Fee</Text>
            <Text style={styles.detailValue}>₹ {consultationFee}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Make payment" onPress={handleMakePayment} />
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
    paddingTop: 60,
    paddingBottom: 100,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.backgroundLight,
  },
  checkmark: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.backgroundMint,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  detailsContainer: {
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
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

export default AppointmentDetailsScreen;
