import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { dashStyles } from '../styles';

const screenWidth = Dimensions.get('window').width;

const players = [
  {
    name: 'Stephen Curry',
    team: 'Warriors',
    stat: '3PT Made',
    hitLast10: 7,
    matchupHits: 3,
    matchupTotal: 4,
    sentiment: 82,
  },
  {
    name: 'Luka Dončić',
    team: 'Mavericks',
    stat: 'Points Over 25.5',
    hitLast10: 9,
    matchupHits: 4,
    matchupTotal: 6,
    sentiment: 68,
  },
  {
    name: 'Jayson Tatum',
    team: 'Celtics',
    stat: 'Rebounds Over 8.5',
    hitLast10: 6,
    matchupHits: 2,
    matchupTotal: 5,
    sentiment: 74,
  },
  {
    name: 'Kevin Durant',
    team: 'Suns',
    stat: 'FG% Over 50%',
    hitLast10: 5,
    matchupHits: 3,
    matchupTotal: 5,
    sentiment: 59,
  },
];

export default function DashboardScreen() {
  return (
    <ScrollView style={dashStyles.container}>
      {/* Top Row */}
      <View style={dashStyles.topRow}>
        <View style={dashStyles.topCard}>
          <Text style={dashStyles.cardTitle}>30-Day Profit</Text>
          <Text style={dashStyles.profitAmount}>+$128.40</Text>
        </View>
        <View style={dashStyles.topCard}>
          <Text style={dashStyles.cardTitle}>Upcoming Match</Text>
          <Text style={dashStyles.matchText}>Chiefs vs Bills</Text>
          <Text style={dashStyles.matchTime}>Today @ 4:30 PM</Text>
        </View>
      </View>

      {/* Player Cards */}
      {players.map((player, idx) => {
        const last10Pct = Math.round((player.hitLast10 / 10) * 100);
        const matchupPct = Math.round((player.matchupHits / player.matchupTotal) * 100);

        return (
          <View key={idx} style={dashStyles.playerCard}>
            <Text style={dashStyles.playerName}>{player.name}</Text>
            <Text style={dashStyles.playerTeam}>{player.team}</Text>
            <Text style={dashStyles.statType}>{player.stat}</Text>

            {/* Pie-like stat bars */}
            <View style={dashStyles.pieRow}>
              <View style={dashStyles.pieSection}>
                <View style={dashStyles.pieBar}>
                  <View style={[dashStyles.pieFill, { width: `${last10Pct}%`, backgroundColor: '#00ff88' }]} />
                </View>
                <Text style={dashStyles.pieLabel}>Last 10: {player.hitLast10}/10</Text>
              </View>

              <View style={dashStyles.pieSection}>
                <View style={dashStyles.pieBar}>
                  <View style={[dashStyles.pieFill, { width: `${matchupPct}%`, backgroundColor: '#ffd33d' }]} />
                </View>
                <Text style={dashStyles.pieLabel}>Vs Opp: {player.matchupHits}/{player.matchupTotal}</Text>
              </View>
            </View>

            {/* Sentiment Gauge */}
            <View style={dashStyles.gaugeContainer}>
              <View style={[dashStyles.gaugeBar, { width: `${player.sentiment}%` }]} />
              <Text style={dashStyles.gaugeText}>Sentiment: {player.sentiment}%</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
