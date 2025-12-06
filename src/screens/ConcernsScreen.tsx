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
import { Header, ConcernCard, BottomTabBar } from '../components';
import { concerns } from '../utils/dummyData';
import { useApp } from '../context/AppContext';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type ConcernsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Concerns'>;
};

const ConcernsScreen: React.FC<ConcernsScreenProps> = ({ navigation }) => {
  const { setConcern } = useApp();
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Consult');

  const handleConcernSelect = (concernId: string, concernName: string) => {
    setSelectedConcern(concernId);
    setConcern(concernName);
    navigation.navigate('DoctorList', { concern: concernName });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        showBackButton={true}
        onBackPress={handleBackPress}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Select Concern</Text>
        
        {/* Developer Test Call Button */}
        <TouchableOpacity
          style={styles.devTestButton}
          onPress={() => navigation.navigate('TestCallEntry')}
        >
          <Text style={styles.devTestButtonText}>🧪 Developer Test Call</Text>
        </TouchableOpacity>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Concerns</Text>
          
          <View style={styles.concernsGrid}>
            {concerns.map((concern) => (
              <ConcernCard
                key={concern.id}
                id={concern.id}
                name={concern.name}
                icon={concern.icon}
                selected={selectedConcern === concern.id}
                onPress={() => handleConcernSelect(concern.id, concern.name)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      
      <BottomTabBar
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMint,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 24,
    marginTop: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  concernsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  devTestButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  devTestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ConcernsScreen;
