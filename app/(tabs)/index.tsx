import { StyleSheet, Text, View, ScrollView } from 'react-native'
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

      {/* Today's Recommended Stretch */}
      <View>
        <Text style={ styles.subTitle }> Today's Recommended Stretch </Text>
        <View style={ styles.progressCard}>

          <View style={ styles.box }>
          <Text> Candle wtv</Text>
          </View>

          <View>
          <Text> New stretches eveeryday wait till next one!</Text>
          </View>

        </View>
        
      </View>

      {/* Progress Card */}
      <View>
        <Text style={ styles.subTitle }> Your Progress </Text>
        <View style={ styles.progressCard}>
          <Text> 0% </Text>
        </View>
        <View>
          <Text> Summary: You doing great keep it up</Text>
          </View>
      </View>

      {/* Mood Board */}
      <View>
        <Text style={ styles.subTitle }> Mood Board </Text>
        <View style={ styles.progressCard}>

          <View style={ styles.box }>
          <Text> Happ, Ok, Sad </Text>
          </View>
          
          <View>
          <Text> Summary: You sad this week </Text>
          </View>

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