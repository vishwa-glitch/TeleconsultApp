import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Booking } from '../utils/dummyData';
import colors from '../utils/colors';
import Button from './Button';

interface BookingCardProps {
  booking: Booking;
  onViewDetails: () => void;
  onStartCall?: () => void;
  onCheckPrescription?: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onViewDetails,
  onStartCall,
  onCheckPrescription,
}) => {
  const getStatusStyle = () => {
    switch (booking.status) {
      case 'Upcoming':
        return styles.statusUpcoming;
      case 'Completed':
        return styles.statusCompleted;
      case 'Cancelled':
        return styles.statusCancelled;
      default:
        return {};
    }
  };
  
  const getStatusTextStyle = () => {
    switch (booking.status) {
      case 'Upcoming':
        return styles.statusTextUpcoming;
      case 'Completed':
        return styles.statusTextCompleted;
      case 'Cancelled':
        return styles.statusTextCancelled;
      default:
        return {};
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{booking.doctorName}</Text>
          <View style={styles.specialtyRow}>
            <Text style={styles.specialty}>{booking.doctorSpecialty}</Text>
            <View style={[styles.statusBadge, getStatusStyle()]}>
              <Text style={[styles.statusText, getStatusTextStyle()]}>
                {booking.status}
              </Text>
            </View>
          </View>
        </View>
        <Image
          source={{ uri: booking.doctorImage }}
          style={styles.doctorImage}
        />
      </View>
      
      <View style={styles.dateTimeRow}>
        <View style={styles.dateTime}>
          <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.dateTimeText}>{booking.date}</Text>
        </View>
        <View style={styles.dateTime}>
          <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.dateTimeText}>{booking.time}</Text>
        </View>
      </View>
      
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={onViewDetails}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
        
        {booking.status === 'Upcoming' && onStartCall && (
          <Button
            title="Start Call"
            onPress={onStartCall}
            size="small"
            style={styles.startCallButton}
          />
        )}
      </View>
      
      {booking.prescription && onCheckPrescription && (
        <TouchableOpacity 
          style={styles.prescriptionRow}
          onPress={onCheckPrescription}
        >
          <View>
            <Text style={styles.prescriptionTitle}>Check Prescription</Text>
            <Text style={styles.prescriptionSubtitle}>{booking.prescription}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  specialtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialty: {
    fontSize: 13,
    color: colors.textSecondary,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusUpcoming: {
    backgroundColor: colors.warningLight,
  },
  statusCompleted: {
    backgroundColor: colors.successLight,
  },
  statusCancelled: {
    backgroundColor: colors.errorLight,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  statusTextUpcoming: {
    color: '#B8860B',
  },
  statusTextCompleted: {
    color: colors.success,
  },
  statusTextCancelled: {
    color: colors.error,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.backgroundLight,
  },
  dateTimeRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  dateTimeText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  viewDetailsText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  startCallButton: {
    minWidth: 100,
    maxWidth: 140,
  },
  prescriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  prescriptionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  prescriptionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default BookingCard;
