import { Stack } from 'expo-router';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fullscreenBorder}>
        {/* Inward Glow Layer */}
        <LinearGradient
          colors={['#00f2ff55', 'transparent']}
          style={styles.inwardGlow}
        />
        
        {/* App Content Layer */}
        <View style={styles.contentContainer}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullscreenBorder: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#00f2ff',
    borderRadius: 32, // mimic phone screen curvature
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  inwardGlow: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    zIndex: 2,
  },
});