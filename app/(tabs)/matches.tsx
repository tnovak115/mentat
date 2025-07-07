import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import { styles } from "../styles";
const matches = [
  {
    id: '1',
    teamA: 'Chiefs',
    teamB: 'Eagles',
    time: '6:30 PM',
  },
  {
    id: '2',
    teamA: 'Bills',
    teamB: 'Dolphins',
    time: '4:05 PM',
  },
  {
    id: '3',
    teamA: '49ers',
    teamB: 'Cowboys',
    time: '8:20 PM',
  },
];

const CARD_MARGIN = 8;
const NUM_COLUMNS = 2;
const CARD_WIDTH =
  (Dimensions.get('window').width - CARD_MARGIN * (NUM_COLUMNS * 2 + 2)) / NUM_COLUMNS;

export default function MatchesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        numColumns={NUM_COLUMNS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.matchup}>{item.teamA} vs {item.teamB}</Text>
            <Text style={styles.time}>🕒 {item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}
