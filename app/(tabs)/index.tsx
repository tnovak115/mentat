import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { styles } from '../styles';
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/abritrage" style={styles.button}>
        Go to abritrage
      </Link>
    </View>
  );
}
