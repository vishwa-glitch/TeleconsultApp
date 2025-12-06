import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import colors from '../utils/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  selected?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  selected = false,
}) => {
  const getCardStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.card];
    
    switch (variant) {
      case 'elevated':
        baseStyles.push(styles.cardElevated);
        break;
      case 'outlined':
        baseStyles.push(styles.cardOutlined);
        break;
      default:
        baseStyles.push(styles.cardDefault);
    }
    
    if (selected) {
      baseStyles.push(styles.cardSelected);
    }
    
    return baseStyles;
  };
  
  if (onPress) {
    return (
      <TouchableOpacity
        style={[...getCardStyle(), style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }
  
  return <View style={[...getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.cardBackground,
  },
  cardDefault: {
    backgroundColor: colors.cardBackground,
  },
  cardElevated: {
    backgroundColor: colors.cardBackground,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardOutlined: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.backgroundMint,
  },
});

export default Card;
