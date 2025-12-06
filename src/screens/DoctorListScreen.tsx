import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, DoctorCard, FilterChip } from '../components';
import { doctors, filterCategories } from '../utils/dummyData';
import { useApp } from '../context/AppContext';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type DoctorListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DoctorList'>;
  route: RouteProp<RootStackParamList, 'DoctorList'>;
};

const DoctorListScreen: React.FC<DoctorListScreenProps> = ({ navigation, route }) => {
  const { setDoctor, state } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const concern = route.params?.concern || 'General';

  const handleSchedulePress = (doctor: typeof doctors[0]) => {
    setDoctor(doctor);
    navigation.navigate('Scheduling');
  };

  const handleFreeCallPress = (doctor: typeof doctors[0]) => {
    setDoctor(doctor);
    // Navigate to Zego call screen
    navigation.navigate('CallScreen', { 
      callID: `free_call_${doctor.id}_${Date.now()}`,
      userID: `user_${Date.now()}`,
      userName: 'Patient'
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showBackButton={true}
        onBackPress={handleBackPress}
        walletBalance={state.walletBalance}
      />

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterCategories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              selected={selectedFilter === category}
              onPress={() => setSelectedFilter(category)}
            />
          ))}
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={18} color={colors.textPrimary} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onSchedulePress={() => handleSchedulePress(doctor)}
            onFreeCallPress={() => handleFreeCallPress(doctor)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  filterScroll: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 6,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});

export default DoctorListScreen;
