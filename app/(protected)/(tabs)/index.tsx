import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter, useFocusEffect } from 'expo-router';

export default function HomeScreen() {

  const router = useRouter();
  const [stretch, setStretch] = useState({name: "", videoUrl: ""});
  const scrollViewRef = useRef(null);

  const fetchRecommendedStretches = async () => {
    const response = await fetch('http://localhost:8000/api/recommendations');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    setStretch(data[randomIndex]);
  }
  
  useEffect(() => {
    fetchRecommendedStretches();
  }, []);

  // Scroll to top when screen gains focus
  useFocusEffect(
    useCallback(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }, [])
  );
  return (
    <ScrollView ref={scrollViewRef}
    style={styles.container}
    contentContainerStyle={{ paddingBottom: 60 }}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subText}>Your recovery starts today. Let’s stay on track.</Text>
        </View>
      </SafeAreaView>

      {/* Daily Recommended Stretch */}
      <View style={[styles.card, styles.darkBlueBackground]}>
        <Text style={styles.cardTitle}>Daily Recommended Stretch</Text>
        <TouchableOpacity
          style={styles.stretchBox}
          onPress={() => Linking.openURL(stretch.videoUrl)}
          activeOpacity={0.7}
        >
          <Text style={styles.stretchName}>{stretch.name}</Text>
          <Text style={styles.watchVideo}>▶️ Watch Video</Text>
        </TouchableOpacity>
      </View>

      {/* Your Stats */}
      <View style={[styles.card, styles.nearBlackBackground]}>
        <Text style={styles.cardTitle}>Your Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Stretches Done This Week</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Streak (Days)</Text>
          </View>
        </View>
      </View>

     
      {/* Assessment Call to Action */}
      <View style={[styles.card, styles.darkBlueBackground]}>
        <Text style={styles.cardTitle}>What’s bothering you today?</Text>
        <TouchableOpacity style={styles.assessButton} onPress={() => router.navigate('/planner')}>
          <Text style={styles.assessButtonText}>Start Assessment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // dark background
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  headerContainer: {
    marginBottom: 30,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#EEEEEE', // bright text for contrast
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
    backgroundColor: '#0d47a1', // rich dark blue
  },

  darkGoldBackground: {
    backgroundColor: '#5D4B00', // muted dark gold
  },

  darkGrayBackground: {
    backgroundColor: '#2A2A2A', // dark gray card bg
  },

  nearBlackBackground: {
    backgroundColor: '#222222', // very dark gray for variety
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    color: '#EEEEEE',
  },

  stretchBox: {
    backgroundColor: '#1565c0', // slightly lighter blue accent
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
    color: '#90caf9', // light blue link color
    fontWeight: '600',
  },

  tipText: {
    fontSize: 16,
    color: '#BBBBBB',
    lineHeight: 22,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    flex: 1,
    backgroundColor: '#263238', // dark slate blue/gray
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#64B5F6', // soft blue accent
  },

  statLabel: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#64B5F6',
    textAlign: 'center',
  },

  activityText: {
    fontSize: 16,
    color: '#CCCCCC',
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
  }
});
