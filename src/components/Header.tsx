import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  transparent?: boolean;
  style?: ViewStyle;
  walletBalance?: number;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightComponent,
  transparent = false,
  style,
  walletBalance,
}) => {
  return (
    <View style={[styles.container, transparent && styles.transparent, style]}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={transparent ? 'transparent' : colors.backgroundMint} 
      />
      
      <View style={styles.content}>
        {showBackButton ? (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        {title && <Text style={styles.title}>{title}</Text>}
        
        {rightComponent ? (
          rightComponent
        ) : walletBalance !== undefined ? (
          <View style={styles.walletContainer}>
            <Ionicons name="wallet-outline" size={18} color={colors.textPrimary} />
            <Text style={styles.walletText}>₹ {walletBalance}</Text>
          </View>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundMint,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  walletText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 4,
  },
});

export default Header;
