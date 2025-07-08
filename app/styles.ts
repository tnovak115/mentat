import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#010812',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00f2ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  arbCard: {
  borderColor: '#00f2ff55',
  borderWidth: 1,
  borderRadius: 12,

  shadowColor: '#00f2ff55',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.9,
  shadowRadius: 20,
  elevation: 20,

  backgroundColor: '#1c1c1c',
},
  row: {
    flexDirection: 'row',
  },
  teamsColumn: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 12,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#333',
  },
  teamName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  oddsColumn: {
    flex: 2,
    justifyContent: 'space-between',
  },
  oddsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  siteOdds: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  siteLogo: {
    width: 24,
    height: 24,
    marginRight: 6,
    borderRadius: 4,
    backgroundColor: '#444',
  },
  oddsText: {
    color: '#ccc',
    fontSize: 15,
  },
  arbTag: {
    marginTop: 10,
    color: '#00ff88',
    fontWeight: 'bold',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  time: {
    color: "#aaa",
    fontSize: 14,
  },
  matchup: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  startButton: {
    backgroundColor: '#00f2ff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#00ff88',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
    input: {
    width: '100%',
    backgroundColor: '#1c1c1c',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  sectionTitle: {
  color: '#aaa',
  marginBottom: 8,
  marginTop: 16,
  fontWeight: '600',
  fontSize: 16,
  },

  picker: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    height: 50,
    width: '100%',
  },
});

export const trackingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010812',
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: '#00f2ff',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  chart: {
    borderRadius: 12,
  },
});

export const dashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topCard: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  cardTitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  profitAmount: {
    color: '#00ff88',
    fontSize: 20,
    fontWeight: 'bold',
  },
  matchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchTime: {
    color: '#aaa',
    fontSize: 14,
  },
  playerCard: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: '#00f2ff',
    borderWidth: 1,
  },
  playerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerTeam: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  statType: {
    color: '#00f2ff',
    fontSize: 14,
    marginBottom: 10,
  },
  pieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pieSection: {
    flex: 1,
    marginRight: 10,
  },
  pieBar: {
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
  },
  pieFill: {
    height: 10,
    borderRadius: 5,
  },
  pieLabel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  gaugeContainer: {
    height: 16,
    backgroundColor: '#444',
    borderRadius: 8,
    marginTop: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  gaugeBar: {
    height: '100%',
    backgroundColor: '#00ff88',
  },
  gaugeText: {
    color: '#ccc',
    fontSize: 12,
    position: 'absolute',
    left: 8,
    top: -18,
  },
});