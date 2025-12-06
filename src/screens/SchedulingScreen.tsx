import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header, Button, DoctorInfoHeader, ConsultationTypeCard } from '../components';
import { consultationTypes } from '../utils/dummyData';
import { useApp } from '../context/AppContext';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type SchedulingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Scheduling'>;
};

const SchedulingScreen: React.FC<SchedulingScreenProps> = ({ navigation }) => {
  const { state, setConsultationType } = useApp();
  const [selectedType, setSelectedType] = useState<string | null>('video');

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    const type = consultationTypes.find((t) => t.id === typeId);
    if (type) {
      setConsultationType(type);
    }
  };

  const handleProceed = () => {
    if (selectedType) {
      navigation.navigate('ChooseDate');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (!state.selectedDoctor) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showBackButton onBackPress={handleBackPress} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No doctor selected</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose Consultation</Text>

        <DoctorInfoHeader
          doctor={state.selectedDoctor}
          subtitle="Male-Female Infertility"
        />

        {/* Consultation types */}
        <View style={styles.typesRow}>
          {consultationTypes.slice(0, 2).map((type) => (
            <View key={type.id} style={styles.typeCard}>
              <ConsultationTypeCard
                type={type}
                selected={selectedType === type.id}
                onPress={() => handleTypeSelect(type.id)}
              />
            </View>
          ))}
        </View>

        {/* Chat consultation */}
        {consultationTypes[2] && (
          <View style={styles.chatContainer}>
            <ConsultationTypeCard
              type={consultationTypes[2]}
              selected={selectedType === consultationTypes[2].id}
              onPress={() => handleTypeSelect(consultationTypes[2].id)}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Proceed"
          onPress={handleProceed}
          disabled={!selectedType}
        />
      </View>
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
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 24,
    marginTop: 10,
  },
  typesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  typeCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  chatContainer: {
    marginTop: 8,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default SchedulingScreen;
