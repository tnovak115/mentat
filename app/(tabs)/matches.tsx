import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { styles } from "../styles";
import { getLast5Matchups } from '../data';

interface Match {
  id: string;
  teamA: string;
  teamB: string;
  time: string;
}

const CARD_MARGIN = 8;
const NUM_COLUMNS = 2;
const CARD_WIDTH =
  (Dimensions.get('window').width - CARD_MARGIN * (NUM_COLUMNS * 2 + 2)) / NUM_COLUMNS;

const matchups = [
  { teamA: 'LAL', teamB: 'BOS' },
  { teamA: 'NYK', teamB: 'MIA' },
  { teamA: 'GSW', teamB: 'SAC' },
  { teamA: 'PHX', teamB: 'DEN' },
];

export default function MatchesScreen() {
  const [selectedMatchup, setSelectedMatchup] = useState<{ teamA: string; teamB: string } | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    async function loadData() {
      if (selectedMatchup) {
        const data = await getLast5Matchups(selectedMatchup.teamA, selectedMatchup.teamB);
        setMatches(data ?? []);
      }
    }
    loadData();
  }, [selectedMatchup]);
  
  console.log(matches);
  return (
    <View style={styles.container}>
      <FlatList
        data={matchups}
        numColumns={NUM_COLUMNS}
        keyExtractor={(item) => `${item.teamA}-${item.teamB}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedMatchup(item)}
            style={[styles.card, { width: CARD_WIDTH, margin: CARD_MARGIN }]}
          >
            <Text style={styles.matchup}>{item.teamA} vs {item.teamB}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedMatchup && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.header}>
            Last 5 Games: {selectedMatchup.teamA} vs {selectedMatchup.teamB}
          </Text>
          {matches.length === 0 ? (
            <Text style={styles.subheader}>No recent data found.</Text>
          ) : (
            matches.map((match) => (
              <View key={match.id} style={styles.card}>
                <Text style={styles.matchup}>{match.teamA} vs {match.teamB}</Text>
                <Text style={styles.time}>🕒 {match.time}</Text>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
}