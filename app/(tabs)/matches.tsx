import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { getLast5Matchups } from '../data';

interface Match {
  id: number;
  Team: string;
  Opponent: string;
  Points: number;
}

const CARD_MARGIN = 8;
const NUM_COLUMNS = 2;
const CARD_WIDTH =
  (Dimensions.get('window').width - CARD_MARGIN * (NUM_COLUMNS * 2 + 2)) / NUM_COLUMNS;

const GRAPH_HEIGHT = 150;
const BAR_WIDTH = 30;

const matchups = [
  { teamA: 'LAL', teamB: 'BOS' },
  { teamA: 'NYK', teamB: 'MIA' },
  { teamA: 'GSW', teamB: 'SAC' },
  { teamA: 'PHX', teamB: 'DEN' },
];

export default function MatchesScreen() {
  const [selectedMatchup, setSelectedMatchup] = useState<{ teamA: string; teamB: string } | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matches2, setMatches2] = useState<Match[]>([]);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [spreadThreshold, setSpreadThreshold] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      if (selectedMatchup) {
        const data = await getLast5Matchups(selectedMatchup.teamA, selectedMatchup.teamB);
        const data2 = await getLast5Matchups(selectedMatchup.teamB, selectedMatchup.teamA);

        if (!data || data.length === 0 || !data2 || data2.length === 0) {
          setMatches([]);
          setMatches2([]);
          setThreshold(null);
          setSpreadThreshold(null);
          return;
        }

        const numericData = data.map(m => ({ ...m, Points: Number(m.Points) || 0 }));
        const numericData2 = data2.map(m => ({ ...m, Points: Number(m.Points) || 0 }));

        setMatches(numericData);
        setMatches2(numericData2);

        const totalPoints = numericData.map((m, i) => m.Points + (numericData2[i]?.Points ?? 0));
        const avg = Math.round(totalPoints.reduce((a, b) => a + b, 0) / totalPoints.length);
        setThreshold(avg);

        const spreads = numericData.map((m,i) => Math.abs(m.Points-(numericData2[i]?.Points ?? 0)));
        const avgSpread = Math.round(spreads.reduce((a,b)=> a+b,0)/spreads.length);
        setSpreadThreshold(avgSpread);
      }
    }
    loadData();
  }, [selectedMatchup]);

  const handleThresholdChange = (text: string) => {
    const num = parseFloat(text);
    if (!isNaN(num)) setThreshold(num);
    else setThreshold(null);
  };

  const handleSpreadThresholdChange = (text: string) => {
    const num = parseFloat(text);
    if (!isNaN(num)) setSpreadThreshold(num);
    else setSpreadThreshold(null);
  };
  const totalPoints = matches.map((match, i) => ({
    id: match.id,
    total: match.Points + (matches2[i]?.Points ?? 0),
  }));

  const spreads = matches.map((match, i) => ({
    id: match.id,
    spread: Math.abs(match.Points - (matches2[i]?.Points ?? 0)),
  }));

  const maxTotalPoints = Math.max(...totalPoints.map(p => p.total), threshold || 0);
  const maxSpread = Math.max(...spreads.map(s => s.spread), spreadThreshold || 0);

  const totalLinePosition = threshold !== null
    ? GRAPH_HEIGHT - (threshold / maxTotalPoints) * GRAPH_HEIGHT
    : null;

  const spreadLinePosition = spreadThreshold !== null
    ? GRAPH_HEIGHT - (spreadThreshold / maxSpread) * GRAPH_HEIGHT
    : null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 16, backgroundColor: '#25292e' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={matchups}
        numColumns={NUM_COLUMNS}
        keyExtractor={(item) => `${item.teamA}-${item.teamB}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { width: CARD_WIDTH, margin: CARD_MARGIN },
              selectedMatchup?.teamA === item.teamA && selectedMatchup?.teamB === item.teamB && styles.glowCard,
            ]}
            onPress={() => setSelectedMatchup(item)}
          >
            <Text style={styles.matchup}>{item.teamA} vs {item.teamB}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedMatchup && (
        <View style={styles.graphContainer}>
          <Text style={styles.header}>
            Last 5 Games: {selectedMatchup.teamA} vs {selectedMatchup.teamB}
          </Text>

          {(matches.length === 0 || matches2.length === 0) ? (
            <Text style={{ color: 'white' }}>No recent data found.</Text>
          ) : (
            <View style={styles.graphRow}>
              {/* Total Points Graph */}
              <View style={styles.graphColumn}>
                <Text style={styles.subHeader}>Total Points</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  inputMode="decimal"
                  value={threshold !== null ? threshold.toString() : ''}
                  onChangeText={handleThresholdChange}
                  placeholder="Points threshold"
                  placeholderTextColor="#aaa"
                />
                <View style={styles.graph}>
                  {totalLinePosition !== null && (
                    <View style={[styles.thresholdLine, { top: totalLinePosition - 25 }]} />
                  )}
                  {totalPoints.map(({ id, total }) => {
                    const isAbove = threshold !== null && total >= threshold;
                    const barHeight = (total / maxTotalPoints) * GRAPH_HEIGHT;
                    return (
                      <View key={id} style={styles.barWrapper}>
                        <View style={[
                          styles.bar,
                          { height: barHeight, backgroundColor: isAbove ? 'green' : 'red' }
                        ]} />
                        <Text style={styles.pointsText}>{total}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Spread Graph */}
              <View style={styles.graphColumn}>
                <Text style={styles.subHeader}>Spread</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  inputMode="decimal"
                  value={spreadThreshold !== null ? spreadThreshold.toString() : ''}
                  onChangeText={handleSpreadThresholdChange}
                  placeholder="Spread threshold"
                  placeholderTextColor="#aaa"
                />
                <View style={styles.graph}>
                  {spreadLinePosition !== null && (
                    <View style={[styles.thresholdLine, { top: spreadLinePosition - 25 }]} />
                  )}
                  {spreads.map(({ id, spread }) => {
                    const isAbove = spreadThreshold !== null && spread >= spreadThreshold;
                    const barHeight = (spread / maxSpread) * GRAPH_HEIGHT;
                    return (
                      <View key={id} style={styles.barWrapper}>
                        <View style={[
                          styles.bar,
                          { height: barHeight, backgroundColor: isAbove ? 'green' : 'red' }
                        ]} />
                        <Text style={styles.pointsText}>{spread}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00f2ff',
  },
  matchup: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
  glowCard: {
    shadowColor: '#00f2ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderColor: '#00f2ff',
    borderWidth: 2,
  },
  graphContainer: {
    marginTop: 24,
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00f2ff',
    minHeight: 420,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 12,
  },
  subHeader: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#00f2ff',
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    width: '90%',
    color: 'white',
  },
  graphRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  graphColumn: {
    flex: 1,
    alignItems: 'center',
  },
  graph: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: GRAPH_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 12,
    width: '100%',
    marginTop: 60,
  },
  thresholdLine: {
    position: 'absolute',
    width: 220,
    height: 2,
    backgroundColor: '#00f2ff',
    left: '50%',
    marginLeft: -110,
    shadowColor: '#00f2ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 2,
  },
  barWrapper: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: BAR_WIDTH,
  },
  bar: {
    width: BAR_WIDTH,
    borderRadius: 4,
  },
  pointsText: {
    marginTop: 6,
    fontWeight: 'bold',
    color: '#00f2ff',
  },
});