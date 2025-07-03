import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { styles } from '../styles';
const arbitrageData = [
  {
    id: '1',
    teams: ['Lions', 'Bears'],
    odds: {
      DraftKings: { Lions: "2.1", Bears: "1.8" },
      FanDuel: { Lions: "1.95", Bears: "2.05" },
    },
  },
  {
    id: '2',
    teams: ['Rams', 'Chargers'],
    odds: {
      BetUS: { Rams: "1.5", Chargers: "1.3" },
      FanDuel: { Rams: "1.55", Chargers: "2.4" },
    },
  },
  {
    id: '3',
    teams: ['Ravens', 'Dolphins'],
    odds: {
      DraftKings: { Ravens: "1.7", Dolphins: "2.2" },
      BetMGM: { Ravens: "1.45", Dolphins: "2.35" },
    },
  },
  {
    id: '4',
    teams: ['Cowboys', 'Bills'],
    odds: {
      Caesars: { Cowboys: "2.8", Bills: "1.4" },
      bet365: { Cowboys: "1.35", Bills: "2.55" },
    },
  },
  {
    id: '5',
    teams: ['Commanders', 'Chiefs'],
    odds: {
      Fantatics: {Commanders: "3.1", Chiefs: "1.2"},
      BetMGM: {Commanders: "1.4", Chiefs: "2.4"},
    },
  },
];
export default function EVScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arbitrage Opportunities</Text>
      <FlatList
        data={arbitrageData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const [team1, team2] = item.teams;

          return (
            <View style={[styles.card, styles.arbCard]}>
              <View style={styles.row}>
                {/* Left Column: Teams */}
                <View style={styles.teamsColumn}>
                  {[team1, team2].map((team, index) => (
                    <View key={index} style={styles.teamRow}>
                      <Image
                        source={{ uri: 'https://via.placeholder.com/40' }}
                        style={styles.teamLogo}
                      />
                      <Text style={styles.teamName}>{team}</Text>
                    </View>
                  ))}
                </View>

                {/* Right Column: Odds from Sites */}
                <View style={styles.oddsColumn}>
                  {[team1, team2].map((team, index) => (
                    <View key={index} style={styles.oddsRow}>
                      {Object.entries(item.odds).map(([site, siteOdds]) => (
                        <View key={site} style={styles.siteOdds}>
                          <Image
                            source={{ uri: 'https://via.placeholder.com/24x24' }}
                            style={styles.siteLogo}
                          />
                          <Text style={styles.oddsText}>
                            {siteOdds[team as keyof typeof siteOdds] ?? '-'}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}