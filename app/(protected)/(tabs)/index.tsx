import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  
  return (
    <ScrollView style={ styles.container }>

      {/* Header */}
      <SafeAreaView>
      <View>
      <Text style={ styles.title }>Home</Text>
      </View>
      </SafeAreaView>

      {/* Stretches To Do */}
      <View>
        <Text style={ styles.subTitle }> Stretches to do </Text>
        <View style={ styles.progressCard}>

          <View style={ styles.box }>
          <Text> You got this to do</Text>
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