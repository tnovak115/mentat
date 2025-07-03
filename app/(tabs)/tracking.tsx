import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import { trackingStyles } from '../styles';

const screenWidth = Dimensions.get('window').width;

export default function TrackingScreen() {
  const [amount, setAmount] = useState('');
  const [data, setData] = useState<{ [date: string]: number }>({});

  const today = new Date().toISOString().split('T')[0];

  const handleSave = () => {
    if (amount === '') return;
    setData({ ...data, [today]: Number(amount) });
    setAmount('');
  };

  // Build calendar markings
  const markedDates = Object.entries(data).reduce((acc, [date, value]) => {
    acc[date] = {
      customStyles: {
        container: {
          backgroundColor: value >= 0 ? '#00ff88' : '#ff4444',
          borderRadius: 6,
        },
        text: {
          color: '#000',
          fontWeight: 'bold',
        },
      },
    };
    return acc;
  }, {} as any);

  // Build chart data
  const chartData = {
    labels: Object.keys(data).slice(-7), // Last 7 days
    datasets: [
      {
        data: Object.values(data).slice(-7),
      },
    ],
  };

  return (
    <View style={trackingStyles.container}>
      <Text style={trackingStyles.title}>Enter Daily Win/Loss</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="e.g. -20 or 50"
        style={trackingStyles.input}
      />
      <Button title="Save" onPress={handleSave} />

      <Text style={trackingStyles.subheading}>This Week's Performance</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={200}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#1c1c1c',
          backgroundGradientFrom: '#25292e',
          backgroundGradientTo: '#25292e',
          color: (opacity = 1) => `rgba(0, 242, 255, ${opacity})`,
        }}
        style={trackingStyles.chart}
      />

      <Text style={trackingStyles.subheading}>Calendar</Text>
      <Calendar
        markingType="custom"
        markedDates={markedDates}
        theme={{
          calendarBackground: '#1c1c1c',
          dayTextColor: '#fff',
          monthTextColor: '#00f2ff',
        }}
      />
    </View>
  );
}
