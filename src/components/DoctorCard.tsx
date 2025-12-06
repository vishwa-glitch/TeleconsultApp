import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Doctor } from '../utils/dummyData';
import colors from '../utils/colors';
import Button from './Button';

interface DoctorCardProps {
  doctor: Doctor;
  onSchedulePress: () => void;
  onFreeCallPress: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onSchedulePress,
  onFreeCallPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentRow}>
        <Image 
          source={{ uri: doctor.imageUrl }} 
          style={styles.image}
        />
        
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{doctor.name}</Text>
            {doctor.isOnline && <View style={styles.onlineIndicator} />}
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={colors.rating} />
              <Text style={styles.rating}>{doctor.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.specialty}>
            {doctor.specialty} + {doctor.otherSpecialties.length} others
          </Text>
          
          <Text style={styles.languages}>
            {doctor.languages.join(', ')}
          </Text>
          
          <Text style={styles.experience}>
            Exp : {doctor.experience}years
          </Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹ {doctor.pricePerMin}/min</Text>
            <Text style={styles.freeText}>
              Free ({doctor.freeMinutes}min)
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.scheduleButton} 
          onPress={onSchedulePress}
        >
          <Text style={styles.scheduleText}>Schedule</Text>
        </TouchableOpacity>
        
        <Button
          title="Free Call"
          onPress={onFreeCallPress}
          size="small"
          style={styles.freeCallButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contentRow: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.backgroundLight,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.online,
    marginLeft: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginLeft: 4,
  },
  specialty: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  languages: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  experience: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  freeText: {
    fontSize: 13,
    color: colors.freeText,
    marginLeft: 4,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  scheduleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  scheduleText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  freeCallButton: {
    flex: 1,
    marginLeft: 16,
    paddingVertical: 12,
  },
});

export default DoctorCard;
