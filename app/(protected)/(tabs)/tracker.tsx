import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { getCurrentUserEmail } from '../../../util/auth'; 



export default function TrackerScreen() {
  const [planner, setPlanner] = useState<{ stretches: string; massage: string; done?: boolean; _id?: string }[]>([]);

  const fetchResults = async () => {
    const email = await getCurrentUserEmail();
  
    if (!email) {
      Alert.alert('User not logged in');
      return;
    }
  
    try {
      const response = await fetch(`http://10.0.0.173:8000/api/user/email/${email}/planner`);
      const data = await response.json();
  
      if (response.ok || response.status === 200) {
    
        const sortedPlanner = (data.planner || []).sort((a, b) => {
          if (a.done === b.done) return 0;
          return a.done ? 1 : -1; 
        });
  
        setPlanner(sortedPlanner);
      } else {
        Alert.alert('Failed to load planner', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Server error', 'Could not load planner data');
    }
  };
  

  const markPlannerItemDone = async (itemId?: string) => {
    const email = await getCurrentUserEmail();
    if (!email || !itemId) {
      Alert.alert('Missing user or item ID');
      return;
    }

    try {
      const response = await fetch(`http://10.0.0.173:8000/api/user/email/${email}/planner/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        fetchResults(); 
      } else {
        Alert.alert('Failed to update item', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Server error', 'Could not update planner item');
    }
  };

  

  useFocusEffect(
    useCallback(() => {
      fetchResults();
    }, [])
  );


  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Your Relief Tracker</Text>
          <TouchableOpacity>
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Sessions for Selected Date */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>
          Do stretches/massages to relieve your pain EVERYDAY
        </Text>


        {planner && planner.map((item, index) => (
          <View key={index} style={styles.sessionCard}>
            <Text style={styles.sessionText}>
              {item.stretches || 'No stretch'} - {item.massage || 'No massage'}
            </Text>

          {item.done? (
            <Text style={{ color: 'green', marginTop: 4 }}>✅ Done</Text>
          ) : (
            <TouchableOpacity
            onPress={() => markPlannerItemDone(item._id)}
        style={styles.doneButton}
            >
              <Text style={{ color: 'white'}}>Mark Done</Text>
            </TouchableOpacity>
          )

          }
          </View>
        ))}
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: 'white',
  },
  section: {
    marginBottom: 30,
  },
  sessionCard: {
    flexDirection: 'row',         
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  sessionText: {
    color: 'white',
    fontSize: 16,
    flexShrink: 1,  
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0d74ff',
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#0d74ff',
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  doneButton: {
    backgroundColor: '#0d74ff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
