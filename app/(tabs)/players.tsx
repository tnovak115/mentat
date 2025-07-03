import { FlatList, View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const players = [
  {
    id: '1',
    name: 'Patrick Mahomes',
    team: 'Chiefs',
    image: 'https://via.placeholder.com/100x100',
  },
  {
    id: '2',
    name: 'Jalen Hurts',
    team: 'Eagles',
    image: 'https://via.placeholder.com/100x100',
  },
  {
    id: '3',
    name: 'Josh Allen',
    team: 'Bills',
    image: 'https://via.placeholder.com/100x100',
  },
  {
    id: '4',
    name: 'Justin Herbert',
    team: 'Chargers',
    image: 'https://via.placeholder.com/100x100',
  },
  {
    id: '5',
    name: 'Lamar Jackson',
    team: 'Ravens',
    image: 'https://via.placeholder.com/100x100',
  },
];

const CARD_MARGIN = 8;
const NUM_COLUMNS = 3;
const CARD_SIZE =
  (Dimensions.get('window').width - CARD_MARGIN * (NUM_COLUMNS * 2 + 2)) / NUM_COLUMNS;

export default function PlayersScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        numColumns={NUM_COLUMNS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.team}>{item.team}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010812',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  list: {
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#1c1c1c',
    margin: CARD_MARGIN,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderColor: '#444',
    borderWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#333',
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  team: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
});
