import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { Doctor } from '../utils/dummyData';
import colors from '../utils/colors';

interface DoctorInfoHeaderProps {
  doctor: Doctor;
  subtitle?: string;
}

const DoctorInfoHeader: React.FC<DoctorInfoHeaderProps> = ({
  doctor,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: doctor.imageUrl }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>
          {subtitle || `${doctor.specialty} + ${doctor.otherSpecialties.length} others`}
        </Text>
        {doctor.pricePerMin && (
          <Text style={styles.price}>
            Instant Call - ₹ {doctor.pricePerMin}/min
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.backgroundLight,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  price: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});

export default DoctorInfoHeader;
