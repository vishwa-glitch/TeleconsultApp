import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../utils/colors';

interface SliderProps {
  value: number;
  minValue: number;
  maxValue: number;
  labels: string[];
  onValueChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  value,
  minValue,
  maxValue,
  labels,
  onValueChange,
}) => {
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
        <View style={[styles.thumb, { left: `${percentage}%` }]} />
      </View>
      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <Text
            key={label}
            style={[
              styles.label,
              index === Math.round((value - minValue) / ((maxValue - minValue) / (labels.length - 1))) &&
                styles.labelActive,
            ]}
          >
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  track: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    position: 'relative',
  },
  fill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    top: -8,
    marginLeft: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default Slider;
