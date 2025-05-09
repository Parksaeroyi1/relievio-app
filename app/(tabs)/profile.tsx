import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  
  return (
    <ScrollView style={ styles.container }>

      {/* Header */}
      <SafeAreaView>
      <View>
      <Text style={ styles.title }>Profile</Text>
      </View>
      </SafeAreaView>


      {/* Progress Card */}
      <View>
        <Text style={ styles.subTitle }> Your Progress </Text>
        <View style={ styles.progressCard}>
          <Text> 0% </Text>
        </View>
      </View>

      {/* Mood Board */}
      <View>
        <Text style={ styles.subTitle }> Mood Board </Text>
        <View style={ styles.progressCard}>
          <Text> Happ, Ok, Sad </Text>
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
    fontSize: 24,
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

})