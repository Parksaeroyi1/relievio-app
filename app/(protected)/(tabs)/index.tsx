import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@react-navigation/elements';
import { useRouter } from 'expo-router';


export default function HomeScreen() {

  const router = useRouter();
  const [stretch, setStretch] = useState({name: "", videoUrl: ""});

  const fetchRecommendedStretches = async () => {
    const response = await fetch('http://localhost:8000/api/recommendations');
    const data = await response.json();
    const randomIndex = Math.round(Math.random() * data.length);
    console.log(data[randomIndex]);
    console.log(Math.round(randomIndex));
    setStretch(data[randomIndex]);
    return data;
  }
  
    useEffect(() => {
      fetchRecommendedStretches()
    }, []);
    

  return (
    <ScrollView style={ styles.container }>

      {/* Header */}
      <SafeAreaView>
      <View>
      <Text style={ styles.title }>Home</Text>
      </View>
      </SafeAreaView>

      {/* Daily Recommended Stretches */}
      <View>
        <Text style={ styles.subTitle }> Daily Recommended Stretch </Text>
       

        
            <TouchableOpacity style={styles.box} onPress={() => console.log('Play video')}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{stretch.name}</Text>
            <Text style={{ color: 'blue' }}>▶️ Watch Video</Text>
            </TouchableOpacity>
        

        </View>
        

      {/* Mood Board */}
      <View>
      <Text style={ styles.subTitle }> How are you feeling today? </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.moodButton} onPress={() => console.log('😊 happy')}>
          <Text style={styles.symptomText}>😊</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moodButton} onPress={() => console.log('😐 okay')}>
          <Text style={styles.symptomText}>😐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moodButton} onPress={() => console.log('😣 sad')}>
          <Text style={styles.symptomText}>😣</Text>
        </TouchableOpacity>
      </View>
      </View>

      {/* Daily Recommended Stretches */}
      <View>
        <Text style={ styles.subTitle }> What's bothering you today? </Text>
       
        <Button onPress={() => router.navigate('/planner')}>Start Your Assessment</Button>;
      
        </View>


    </ScrollView>
)}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#b5caa0',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  progressCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  box: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    height: 100,
  },
  moodButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  
})