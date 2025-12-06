import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';

interface TabItem {
  name: string;
  icon: string;
  activeIcon: string;
}

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const tabs: TabItem[] = [
  { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'Shop', icon: 'cart-outline', activeIcon: 'cart' },
  { name: 'Consult', icon: 'chatbubbles-outline', activeIcon: 'chatbubbles' },
  { name: 'Forum', icon: 'people-outline', activeIcon: 'people' },
  { name: 'Bulletin', icon: 'newspaper-outline', activeIcon: 'newspaper' },
];

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        const isConsult = tab.name === 'Consult';
        
        return (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.tab,
              isConsult && styles.consultTab,
              isConsult && isActive && styles.consultTabActive,
            ]}
            onPress={() => onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={(isActive ? tab.activeIcon : tab.icon) as any}
              size={isConsult ? 28 : 24}
              color={
                isConsult
                  ? colors.textWhite
                  : isActive
                  ? colors.primary
                  : colors.textSecondary
              }
            />
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
                isConsult && styles.consultLabel,
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.tabBackground,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  consultTab: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    marginHorizontal: 4,
    paddingVertical: 8,
    marginTop: -20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  consultTabActive: {
    backgroundColor: colors.primaryDark,
  },
  label: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 4,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  consultLabel: {
    color: colors.textWhite,
  },
});

export default BottomTabBar;
