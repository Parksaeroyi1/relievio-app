import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TrackerScreen() {
  
  return (
    <ScrollView style={ styles.container }>

      {/* Header */}
      <SafeAreaView>
      <View>
      <Text style={ styles.title }>Tracker</Text>
      </View>
      </SafeAreaView>


      {/* Need to do */}
      <View>
        <Text style={ styles.subTitle }> Need To Do </Text>
        <View style={ styles.progressCard}>
          <Text> DO THESE STRETCHES SOON </Text>
        </View>
        <View style={ styles.progressCard}>
          <Text> DO THESE STRETCHES SOON </Text>
        </View>
        <View style={ styles.progressCard}>
          <Text> DO THESE STRETCHES SOON </Text>
        </View>
      </View>

      {/* Calendar */}
      <View>
        <Text style={ styles.subTitle }> Calendar </Text>
        <View style={ styles.box }>
          <Text></Text>
        </View>
      </View>

       {/* Notes to self */}
       <View>
        <Text style={ styles.subTitle }> Notes to self </Text>
        <View style={ styles.box }>
          <Text></Text>
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
  box: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    height: 300,
  }

})