import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';

interface NumberInputProps {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  suffix?: string;
  min?: number;
  max?: number;
  error?: string;
  placeholder?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChangeText,
  suffix,
  min = 0,
  max = 999,
  error,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleIncrement = () => {
    const numValue = parseInt(value, 10) || 0;
    if (numValue < max) {
      onChangeText(String(numValue + 1));
    }
  };

  const handleDecrement = () => {
    const numValue = parseInt(value, 10) || 0;
    if (numValue > min) {
      onChangeText(String(numValue - 1));
    }
  };

  const handleChangeText = (text: string) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    onChangeText(numericText);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
      ]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleDecrement}
            activeOpacity={0.7}
          >
            <Ionicons name="remove" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.buttonDivider} />
          <TouchableOpacity
            style={styles.button}
            onPress={handleIncrement}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingLeft: 16,
    overflow: 'hidden',
  },
  inputContainerFocused: {
    borderColor: colors.primary,
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
    paddingVertical: 16,
  },
  suffix: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
});

export default NumberInput;
