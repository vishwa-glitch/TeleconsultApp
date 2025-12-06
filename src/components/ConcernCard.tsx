import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';

interface ConcernCardProps {
  id: string;
  name: string;
  icon: string;
  selected?: boolean;
  onPress: () => void;
}

const ConcernCard: React.FC<ConcernCardProps> = ({
  name,
  icon,
  selected = false,
  onPress,
}) => {
  // Map concern icons to Ionicons
  const getIconName = (): string => {
    const iconMap: { [key: string]: string } = {
      'heart-pulse': 'heart',
      'brain': 'fitness',
      'weight': 'scale',
      'diabetes': 'water',
      'virus': 'bug',
      'thermometer': 'thermometer',
      'snowflake': 'snow',
      'bone': 'body',
      'head': 'happy',
      'moon': 'moon',
    };
    return iconMap[icon] || 'medical';
  };

  const getIconComponent = () => {
    return (
      <Ionicons 
        name={getIconName()} 
        size={28} 
        color={selected ? colors.primary : colors.textSecondary} 
      />
    );
  };
  
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, selected && styles.iconContainerSelected]}>
        {getIconComponent()}
      </View>
      <Text style={[styles.name, selected && styles.nameSelected]} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 100,
    marginBottom: 20,
  },
  selected: {},
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.transparent,
  },
  iconContainerSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.backgroundMint,
  },
  name: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  nameSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default ConcernCard;
