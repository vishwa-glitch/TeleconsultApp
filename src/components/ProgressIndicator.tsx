import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import colors from '../utils/colors';

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: steps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index <= currentStep ? styles.stepActive : styles.stepInactive,
            index === 0 && styles.stepFirst,
            index === steps - 1 && styles.stepLast,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  step: {
    flex: 1,
    height: 4,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  stepActive: {
    backgroundColor: colors.primary,
  },
  stepInactive: {
    backgroundColor: colors.border,
  },
  stepFirst: {
    marginLeft: 0,
  },
  stepLast: {
    marginRight: 0,
  },
});

export default ProgressIndicator;
