import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../utils/colors';

interface TimeSlotCardProps {
  time: string;
  selected: boolean;
  available: boolean;
  onPress: () => void;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({
  time,
  selected,
  available,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.containerSelected,
        !available && styles.containerDisabled,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!available}
    >
      <Text
        style={[
          styles.time,
          selected && styles.textSelected,
          !available && styles.textDisabled,
        ]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 90,
    marginRight: 12,
    marginBottom: 12,
  },
  containerSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  containerDisabled: {
    backgroundColor: colors.backgroundLight,
    borderColor: colors.borderLight,
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  textSelected: {
    color: colors.textWhite,
  },
  textDisabled: {
    color: colors.textLight,
  },
});

export default TimeSlotCard;
