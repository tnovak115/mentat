import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const userData = {
    username: 'hoopFan24',
    email: 'hoopfan@example.com',
    profit30Days: 215.75,
    plan: 'Free',
    favoriteTeam: 'Golden State Warriors',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.item}><Text style={styles.label}>Username:</Text><Text style={styles.value}>{userData.username}</Text></View>
      <View style={styles.item}><Text style={styles.label}>Email:</Text><Text style={styles.value}>{userData.email}</Text></View>
      <View style={styles.item}><Text style={styles.label}>30-Day Profit:</Text><Text style={styles.value}>${userData.profit30Days.toFixed(2)}</Text></View>
      <View style={styles.item}><Text style={styles.label}>Plan:</Text><Text style={styles.value}>{userData.plan}</Text></View>
      <View style={styles.item}><Text style={styles.label}>Favorite Team:</Text><Text style={styles.value}>{userData.favoriteTeam}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#00f2ff',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    color: '#aaa',
    fontWeight: '600',
  },
  value: {
    color: '#fff',
  },
});