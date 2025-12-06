import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';
import { RootStackParamList } from '../navigation/types';

type LegacyCallScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Call'>;
  route: RouteProp<RootStackParamList, 'Call'>;
};

const LegacyCallScreen: React.FC<LegacyCallScreenProps> = ({ navigation, route }) => {
  const { roomId, doctorName } = route.params;
  
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isConnecting, setIsConnecting] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnecting(false);
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isConnecting) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnecting]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const handleEndCall = () => {
    Alert.alert(
      'End Call',
      'Are you sure you want to end this call?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'End Call', 
          style: 'destructive',
          onPress: () => {
            navigation.goBack();
          }
        },
      ]
    );
  };

  const handleSwitchCamera = () => {
    // Switch camera logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.remoteVideoContainer}>
        {isConnecting ? (
          <View style={styles.connectingContainer}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={60} color={colors.textWhite} />
            </View>
            <Text style={styles.connectingText}>Connecting to {doctorName}...</Text>
          </View>
        ) : (
          <View style={styles.remoteVideoPlaceholder}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={60} color={colors.textWhite} />
            </View>
            <Text style={styles.doctorName}>{doctorName}</Text>
            <Text style={styles.callDuration}>{formatDuration(callDuration)}</Text>
          </View>
        )}
      </View>

      <View style={styles.localVideoContainer}>
        {isCameraOn ? (
          <View style={styles.localVideoPlaceholder}>
            <Ionicons name="person" size={30} color={colors.textWhite} />
          </View>
        ) : (
          <View style={styles.cameraOffPlaceholder}>
            <Ionicons name="videocam-off" size={24} color={colors.textWhite} />
          </View>
        )}
        <TouchableOpacity style={styles.switchCameraButton} onPress={handleSwitchCamera}>
          <Ionicons name="camera-reverse" size={20} color={colors.textWhite} />
        </TouchableOpacity>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, isMuted && styles.controlButtonActive]}
          onPress={handleToggleMute}
        >
          <Ionicons
            name={isMuted ? 'mic-off' : 'mic'}
            size={28}
            color={isMuted ? colors.textWhite : colors.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, !isCameraOn && styles.controlButtonActive]}
          onPress={handleToggleCamera}
        >
          <Ionicons
            name={isCameraOn ? 'videocam' : 'videocam-off'}
            size={28}
            color={!isCameraOn ? colors.textWhite : colors.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.endCallButton}
          onPress={handleEndCall}
        >
          <Ionicons name="call" size={32} color={colors.textWhite} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="chatbubble-ellipses" size={28} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="ellipsis-horizontal" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  remoteVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteVideoPlaceholder: {
    alignItems: 'center',
  },
  connectingContainer: {
    alignItems: 'center',
  },
  connectingText: {
    color: colors.textWhite,
    fontSize: 18,
    marginTop: 20,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorName: {
    color: colors.textWhite,
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
  },
  callDuration: {
    color: colors.textLight,
    fontSize: 16,
    marginTop: 8,
  },
  localVideoContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  localVideoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  cameraOffPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
  },
  switchCameraButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  controlButtonActive: {
    backgroundColor: colors.primary,
  },
  endCallButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    transform: [{ rotate: '135deg' }],
  },
});

export default LegacyCallScreen;
