import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  
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
        <View style={ styles.progressCard}>

          <View style={ styles.box }>
          <Text>{stretch.name}</Text>
          <Text>{stretch.videoUrl}</Text>
          </View>

        </View>
        
      </View>

      {/* Mood Board */}
      <View>
        <Text style={ styles.subTitle }> How you feeling today? </Text>
        <View style={ styles.progressCard}>

          <TouchableOpacity style={ styles.box } onPress={() => console.log('Happy')}>
            <Text style={ styles.symptomText }>Happy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.box } onPress={() => console.log('Sad')}>
            <Text style={ styles.symptomText }>Sad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.box } onPress={() => console.log('Angry')}>
            <Text style={ styles.symptomText }>Angry</Text>
          </TouchableOpacity>

      </View> 
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
  }

})