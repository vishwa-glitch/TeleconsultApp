import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ConsultationType } from '../utils/dummyData';
import colors from '../utils/colors';

interface ConsultationTypeCardProps {
  type: ConsultationType;
  selected: boolean;
  onPress: () => void;
}

const ConsultationTypeCard: React.FC<ConsultationTypeCardProps> = ({
  type,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.name}>{type.name}</Text>
      
      <Text style={styles.price}>₹ {type.price}/min</Text>
      
      <Text style={styles.duration}>({type.duration})</Text>
      
      {type.description && (
        <Text style={styles.description}>{type.description}</Text>
      )}
      
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && (
          <Ionicons name="checkmark" size={16} color={colors.textWhite} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    minWidth: 140,
    flex: 1,
  },
  containerSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.backgroundMint,
  },
  name: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  duration: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  description: {
    fontSize: 11,
    color: colors.textLight,
    marginBottom: 8,
  },
  radio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  radioSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

export default ConsultationTypeCard;
