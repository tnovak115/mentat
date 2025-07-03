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