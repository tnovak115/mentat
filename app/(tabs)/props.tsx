import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';
import { getLast10Stats, getLast5StatsAgainst } from '../data';
interface PropData {
  player: string;
  team: string;
  date: string;
  stat: string;
  line: number;
  site: string;
  opponent: string;
  hitLast10: number;
  hitLast5vsOpponent: number;
}

const mockProps: PropData[] = [
  {
    player: 'LeBron James',
    team: 'LAL',
    date: '2025-10-15',
    stat: 'PTS',
    line: 27.5,
    site: 'DraftKings',
    opponent: 'GSW',
    hitLast10: 9,
    hitLast5vsOpponent: 4,
  },
  {
    player: 'Rui Hachimura',
    team: 'LAL',
    date: '2025-10-15',
    stat: 'REB',
    line: 11.5,
    site: 'FanDuel',
    opponent: 'GSW',
    hitLast10: 3,
    hitLast5vsOpponent: 1,
  },
  {
    player: 'D\'Angelo Russel',
    team: 'LAL',
    date: '2025-10-15',
    stat: 'AST',
    line: 6.5,
    site: 'PrizePicks',
    opponent: 'GSW',
    hitLast10: 6,
    hitLast5vsOpponent: 2,
  },
  {
    player: 'Austin Reaves',
    team: 'LAL',
    date: '2025-10-15',
    stat: 'FGM',
    line: 12.5,
    site: 'FanDuel',
    opponent: 'GSW',
    hitLast10: 8,
    hitLast5vsOpponent: 2,
  },
  {
    player: 'Jarred Vanderbilt',
    team: 'LAL',
    date: '2025-10-15',
    stat: 'BLK',
    line: 0.5,
    site: 'PrizePicks',
    opponent: 'GSW',
    hitLast10: 7,
    hitLast5vsOpponent: 3,
  }
];

const PropsScreen = () => {
  const [sortedProps, setSortedProps] = useState<PropData[]>([]);

  useEffect(() => {
    const fetchAndRank = async () => {
      const enrichedProps: PropData[] = await Promise.all(
        mockProps.map(async (prop) => {
          const last10Stats = await getLast10Stats(prop.player, prop.stat);
          const last5Stats = await getLast5StatsAgainst(prop.player, prop.stat, prop.opponent);

          const hitLast10 = last10Stats?.filter((val) => val >= prop.line).length || 0;
          const hitLast5vsOpponent = last5Stats?.filter((val) => val >= prop.line).length || 0;

          return {
            ...prop,
            hitLast10,
            hitLast5vsOpponent,
          };
        })
      );

      const ranked = enrichedProps.sort((a, b) => {
        const score = (p: PropData) => (p.hitLast10 / 10) * 0.6 + (p.hitLast5vsOpponent / 5) * 0.4;
        return score(b) - score(a);
      });

      setSortedProps(ranked);
    };

    fetchAndRank();
  }, []);

  const renderPie = (hit: number, total: number) => {
    const percent = hit / total;
    const angle = percent * 180;
    const largeArcFlag = angle > 180 ? 1 : 0;
    const x = 100 + 100 * Math.cos((Math.PI * (180 - angle)) / 180);
    const y = 100 - 100 * Math.sin((Math.PI * (180 - angle)) / 180);

    return (
      <Svg width={200} height={100} viewBox="0 0 200 100">
        <G>
          <Path d="M0,100 A100,100 0 0,1 200,100" fill="#444" />
          <Path
            d={`M0,100 A100,100 0 ${largeArcFlag},1 ${x},${y} L100,100 Z`}
            fill={percent >= 0.7 ? 'green' : percent >= 0.4 ? 'orange' : 'red'}
          />
        </G>
      </Svg>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Prop Bets</Text>
      {sortedProps.map((prop, index) => (
        <View key={index} style={styles.propCard}>
          <Text style={styles.player}>{prop.player} ({prop.team})</Text>
          <Text style={styles.text}>{prop.date} | {prop.site}</Text>
          <Text style={styles.text}>{prop.stat} Line: {prop.line}</Text>
          <Text style={styles.text}>Hits: {prop.hitLast10}/10 | {prop.hitLast5vsOpponent}/5 vs {prop.opponent}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <View style={{ alignItems: 'center' }}>
              {renderPie(prop.hitLast10, 10)}
              <Text style={styles.pieLabel}>Last 10</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              {renderPie(prop.hitLast5vsOpponent, 5)}
              <Text style={styles.pieLabel}>Last 5 vs {prop.opponent}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#010812',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  propCard: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#1c1c1c',
  },
  player: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  text: {
    color: 'white',
  },
  pieLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});

export default PropsScreen;
