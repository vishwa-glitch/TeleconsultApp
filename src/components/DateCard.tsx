import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../utils/colors';

interface DateCardProps {
  date: string;
  dayName: string;
  selected: boolean;
  onPress: () => void;
}

const DateCard: React.FC<DateCardProps> = ({
  date,
  dayName,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.date, selected && styles.textSelected]}>
        {date}
      </Text>
      <Text style={[styles.dayName, selected && styles.textSelected]}>
        {dayName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
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
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  dayName: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  textSelected: {
    color: colors.textWhite,
  },
});

export default DateCard;
