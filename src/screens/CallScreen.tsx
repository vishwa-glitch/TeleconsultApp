import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

// Dynamic import to handle potential issues
let ZegoUIKitPrebuiltCall: any = null;
let ONE_ON_ONE_VIDEO_CALL_CONFIG: any = null;

try {
  const zegoModule = require('@zegocloud/zego-uikit-prebuilt-call-rn');
  console.log('Zego module loaded:', Object.keys(zegoModule));
  ZegoUIKitPrebuiltCall = zegoModule.ZegoUIKitPrebuiltCall;
  ONE_ON_ONE_VIDEO_CALL_CONFIG = zegoModule.ONE_ON_ONE_VIDEO_CALL_CONFIG;
  console.log('ZegoUIKitPrebuiltCall type:', typeof ZegoUIKitPrebuiltCall);
  console.log('ONE_ON_ONE_VIDEO_CALL_CONFIG:', ONE_ON_ONE_VIDEO_CALL_CONFIG);
} catch (error) {
  console.error('Failed to load Zego SDK:', error);
}

// Zego Cloud Credentials
const ZEGO_APP_ID = 1707590422;
const ZEGO_APP_SIGN = 'c34a59deff0062a13fe03974c6721bcd7f73ac83a50c11ef86c0d86e9b32e901';

type CallScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CallScreen'>;
  route: RouteProp<RootStackParamList, 'CallScreen'>;
};

const CallScreen: React.FC<CallScreenProps> = ({ route, navigation }) => {
  const { callID, userID, userName } = route.params;

  // Fallback if Zego SDK fails to load
  if (!ZegoUIKitPrebuiltCall) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Zego SDK failed to load</Text>
        <Text style={styles.errorSubText}>Check console for errors</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={ZEGO_APP_ID}
        appSign={ZEGO_APP_SIGN}
        userID={userID}
        userName={userName}
        callID={callID}
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onCallEnd: () => {
            // Navigate to home screen after call ends
            navigation.navigate('Concerns');
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  errorSubText: {
    color: '#888',
    fontSize: 14,
  },
});

export default CallScreen;
