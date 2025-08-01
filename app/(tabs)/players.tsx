import React, { useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { getLast10Stats, getLast5StatsAgainst } from '../data';
import { Picker } from '@react-native-picker/picker';

const players = [
  {
    id: '1',
    name: 'LeBron James',
    team: 'Lakers',
    image: 'https://via.placeholder.com/100x100',
  },
  {
    id: '2',
    name: 'Anthony Davis',
    team: 'Lakers',
    image: 'https://via.placeholder.com/100x100',
  },
  {
    id: '3',
    name: 'D\'Angelo Russell',
    team: 'Lakers',
    image: 'https://via.placeholder.com/100x100',
  },
  {
    id: '4',
    name: 'Austin Reaves',
    team: 'Lakers',
    image: 'https://via.placeholder.com/100x100',
  },
  {
    id: '5',
    name: 'Jarred Vanderbilt',
    team: 'Lakers',
    image: 'https://via.placeholder.com/100x100',
  },
];

const CARD_MARGIN = 8;
const NUM_COLUMNS = 3;
const CARD_SIZE =
  (Dimensions.get('window').width - CARD_MARGIN * (NUM_COLUMNS * 2 + 2)) / NUM_COLUMNS;

export default function PlayersScreen() {
  const [selectedPlayer, setSelectedPlayer] = useState<typeof players[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [useOpponent, setUseOpponent] = useState(false);
  const [opponent, setOpponent] = useState<string>('');
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [statValues, setStatValues] = useState<number[]>([]);
  const [maxStat, setMaxStat] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const statOptions = ['PTS', 'REB', 'OREB', 'DREB', 'AST', 'FGM', 'FGA', 'STL', 'BLK', 'FG3M', 'FG3A'];
  const teams = [
    'ATL', 'BOS', 'BRK', 'CHI', 'CLE', 'DAL', 'DEN', 'DET',
    'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN',
    'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHO', 'POR', 'SAC', 'SAS',
    'TOR', 'UTA', 'WAS'
  ];

  const fetchStatData = async (stat: string) => {
    if (!selectedPlayer) return;
    setLoading(true);
    setSelectedStat(stat);

    const values = await (
      opponent
        ? getLast5StatsAgainst(selectedPlayer.name, stat, opponent)
        : getLast10Stats(selectedPlayer.name, stat)
    ) ?? [];
    setStatValues(values);
    setMaxStat(Math.max(...values, 1));
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        numColumns={NUM_COLUMNS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedPlayer(item);
              setModalVisible(true);
            }}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.team}>{item.team}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContent}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ color: 'red', fontSize: 16 }}>Close</Text>
          </TouchableOpacity>

          {selectedPlayer && (
            <>
              <Text style={styles.modalTitle}>{selectedPlayer.name}</Text>

              <Text style={styles.label}>Select Opponent:</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={opponent}
                  onValueChange={(itemValue) => setOpponent(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#fff"
                >
                  {teams.map((team) => (
                    <Picker.Item label={team} value={team} key={team} />
                  ))}
                </Picker>
              </View>

              <View style={styles.buttonRow}>
                {statOptions.map((stat) => (
                  <TouchableOpacity
                    key={stat}
                    style={[
                      styles.statButton,
                      selectedStat === stat && styles.selectedButton,
                    ]}
                    onPress={() => fetchStatData(stat)}
                  >
                    <Text style={styles.statButtonText}>{stat}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.graphContainer}>
                {statValues.map((val, index) => {
                  const barHeight = (val / maxStat) * 180;
                  return (
                    <View key={index} style={styles.barWrapper}>
                      <View style={[styles.bar, { height: barHeight }]} />
                      <Text style={styles.pointsText}>{val}</Text>
                    </View>
                  );
                })}
              </View>
            </>
          )}
        </ScrollView>
      </Modal>
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
  modalContent: {
    backgroundColor: '#010812',
    padding: 16,
  },
  modalTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#222',
    color: 'white',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statButton: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 8,
    margin: 4,
  },
  selectedButton: {
    backgroundColor: '#3f51b5',
  },
  statButtonText: {
    color: 'white',
  },
  graphContainer: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 16,
  },
  barWrapper: {
    alignItems: 'center',
    width: 20,
    marginHorizontal: 4,
  },
  bar: {
    width: 20,
    backgroundColor: 'teal',
  },
  pointsText: {
    color: 'white',
    fontSize: 10,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1c1c1c',
  },

  picker: {
    height: 44,
    color: '#3f51b5',
  },
});
