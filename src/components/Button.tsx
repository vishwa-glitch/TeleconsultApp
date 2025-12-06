import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import colors from '../utils/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = true,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.button];
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyles.push(styles.buttonSmall);
        break;
      case 'large':
        baseStyles.push(styles.buttonLarge);
        break;
      default:
        baseStyles.push(styles.buttonMedium);
    }
    
    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyles.push(styles.buttonSecondary);
        break;
      case 'outline':
        baseStyles.push(styles.buttonOutline);
        break;
      case 'text':
        baseStyles.push(styles.buttonText);
        break;
      default:
        baseStyles.push(styles.buttonPrimary);
    }
    
    // Full width
    if (fullWidth) {
      baseStyles.push(styles.fullWidth);
    }
    
    // Disabled
    if (disabled) {
      baseStyles.push(styles.buttonDisabled);
    }
    
    return baseStyles;
  };
  
  const getTextStyle = (): TextStyle[] => {
    const baseStyles: TextStyle[] = [styles.text];
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyles.push(styles.textSmall);
        break;
      case 'large':
        baseStyles.push(styles.textLarge);
        break;
      default:
        baseStyles.push(styles.textMedium);
    }
    
    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyles.push(styles.textSecondary);
        break;
      case 'outline':
        baseStyles.push(styles.textOutline);
        break;
      case 'text':
        baseStyles.push(styles.textTextVariant);
        break;
      default:
        baseStyles.push(styles.textPrimary);
    }
    
    // Disabled
    if (disabled) {
      baseStyles.push(styles.textDisabled);
    }
    
    return baseStyles;
  };
  
  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? colors.textWhite : colors.primary} 
          size="small" 
        />
      ) : (
        <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonMedium: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonLarge: {
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.backgroundGreen,
  },
  buttonOutline: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  buttonText: {
    backgroundColor: colors.transparent,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
    borderColor: colors.border,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  textPrimary: {
    color: colors.textWhite,
  },
  textSecondary: {
    color: colors.primary,
  },
  textOutline: {
    color: colors.primary,
  },
  textTextVariant: {
    color: colors.primary,
  },
  textDisabled: {
    color: colors.textLight,
  },
});

export default Button;
