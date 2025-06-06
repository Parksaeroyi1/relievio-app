import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const router = useRouter();
  const [stretch, setStretch] = useState({ name: "", videoUrl: "" });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const scrollViewRef = useRef(null);

  const fetchRecommendedStretches = async () => {
    const response = await fetch('http://10.0.0.173:8000/api/recommendations');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    setStretch(data[randomIndex]);
  };

  const scheduleReminder = async (datetime) => {
    try {
      const response = await fetch('http://192.168.2.46:8000/api/recommendations');
      const data = await response.json();
      const randomStretch = data[Math.floor(Math.random() * data.length)];
  
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Don't forget to relieve yourself! 🧘‍♀️",
          body: `Check tracker or try: ${randomStretch.name}`,
          data: { stretch: randomStretch },
        },
        trigger: {
          type: 'date',
          date: datetime, // ✅ fixed: structured trigger format
        },
      });
  
      alert(`📅 Reminder set for ${datetime.toLocaleString()}`);
    } catch (err) {
      console.error('❌ Failed to schedule reminder:', err);
    }
  };
  

  useEffect(() => {
    fetchRecommendedStretches();
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Enable notifications to receive reminders!');
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }, [])
  );

  return (
    <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subText}>Your recovery starts today. Let’s stay on track.</Text>
        </View>
      </SafeAreaView>

      <View style={[styles.card, styles.darkBlueBackground]}>
        <Text style={styles.cardTitle}>Daily Recommended Stretch</Text>
        <TouchableOpacity style={styles.stretchBox} onPress={() => Linking.openURL(stretch.videoUrl)}>
          <Text style={styles.stretchName}>{stretch.name}</Text>
          <Text style={styles.watchVideo}>▶️ Watch Video</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, styles.darkBlueBackground]}>
        <Text style={styles.cardTitle}>What’s bothering you today?</Text>
        <TouchableOpacity style={styles.assessButton} onPress={() => router.navigate('/planner')}>
          <Text style={styles.assessButtonText}>Start Assessment</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, styles.darkGrayBackground]}>
  <Text style={styles.cardTitle}>Need a Reminder?</Text>

  {/* Date Picker Button */}
  <TouchableOpacity style={styles.assessButton} onPress={() => setShowDatePicker(true)}>
    <Text style={styles.assessButtonText}>Pick Date</Text>
  </TouchableOpacity>

  {showDatePicker && (
    <DateTimePicker
      value={selectedDate}
      mode="date"
      display="default"
      onChange={(event, date) => {
        setShowDatePicker(false);
        if (date) {
          const updatedDate = new Date(selectedDate);
          updatedDate.setFullYear(date.getFullYear());
          updatedDate.setMonth(date.getMonth());
          updatedDate.setDate(date.getDate());
          setSelectedDate(updatedDate);
        }
      }}
    />
  )}

  {/* Time Picker Button */}
  <TouchableOpacity style={styles.assessButton} onPress={() => setShowTimePicker(true)}>
    <Text style={styles.assessButtonText}>Pick Time</Text>
  </TouchableOpacity>

  {showTimePicker && (
    <DateTimePicker
      value={selectedDate}
      mode="time"
      is24Hour={true}
      display="default"
      onChange={(event, time) => {
        setShowTimePicker(false);
        if (time) {
          const updatedDate = new Date(selectedDate);
          updatedDate.setHours(time.getHours());
          updatedDate.setMinutes(time.getMinutes());
          setSelectedDate(updatedDate);
        }
      }}
    />
  )}

  {/* Display selected date & time */}
  <Text style={{ color: '#CCC', marginTop: 10, textAlign: 'center' }}>
    Selected: {selectedDate.toLocaleString()}
  </Text>

  {/* Schedule Button */}
  <TouchableOpacity
    style={[styles.assessButton, { marginTop: 10 }]}
    onPress={() => scheduleReminder(selectedDate)}
  >
    <Text style={styles.assessButtonText}>Schedule Notification</Text>
  </TouchableOpacity>
</View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#EEEEEE',
  },
  subText: {
    fontSize: 18,
    color: '#CCCCCC',
    marginTop: 6,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  darkBlueBackground: {
    backgroundColor: '#0d47a1',
  },
  darkGrayBackground: {
    backgroundColor: '#2A2A2A',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    color: '#EEEEEE',
  },
  stretchBox: {
    backgroundColor: '#1565c0',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  stretchName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  watchVideo: {
    fontSize: 16,
    color: '#90caf9',
    fontWeight: '600',
  },
  assessButton: {
    marginTop: 10,
    backgroundColor: '#1565c0',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  assessButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
