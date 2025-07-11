import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const nbaTeams = [
  'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets',
  'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets',
  'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers',
  'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat',
  'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks',
  'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns',
  'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors',
  'Utah Jazz', 'Washington Wizards',
];

export default function OnboardingScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [team, setTeam] = useState('');

  const handleSubmit = async () => {
    if (!email || !password || !username || !team) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('1');
      await setDoc(doc(db, 'users', user.uid), {
        email,
        username,
        favoriteTeam: team,
        createdAt: new Date(),
      });
      console.log('2');
      router.replace('/dashboard');
    } catch (error) {
      console.log("Signup error:", error);
    }
  };
  console.log("⚠️ OnboardingScreen is mounted");

  return (
    <ScrollView
      contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.sectionTitle}>Favorite NBA Team</Text>
      <Picker
        selectedValue={team}
        onValueChange={(value) => setTeam(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select a team..." value="" />
        {nbaTeams.map((team) => (
          <Picker.Item key={team} label={team} value={team} />
        ))}
      </Picker>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => {
          console.log('Pressed Continue');
          handleSubmit();
        }}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
