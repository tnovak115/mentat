import { Stack } from 'expo-router';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {

  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fullscreenBorder}>
        <LinearGradient
          colors={['#00f2ff55', 'transparent']}
          style={styles.inwardGlow}
        />
        
        <View style={styles.contentContainer}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: true, title:'', headerTransparent: true, headerRight: () => (
              <TouchableOpacity onPress={() => router.replace('/profile')} style={styles.profileButton}>
                <Ionicons name="person-circle-outline" size={28} color="#00f2ff"/>
              </TouchableOpacity>
            )}} />
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
    borderRadius: 32,
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
  profileButton: {
    marginLeft: 16,
    padding: 4,
  },
});