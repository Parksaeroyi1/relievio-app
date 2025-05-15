import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PlannerScreen() {
  
  return (
    <ScrollView style={ styles.container }>

      {/* Header */}
      <SafeAreaView>
      <View>
      <Text style={ styles.title }>Planner</Text>
      </View>
      </SafeAreaView>

      {/* Symptoms */}
      <View style={styles.box}>
        <Text style={styles.subTitle}>What are your symptoms?</Text>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Tight')}>
            <Text style={styles.symptomText}>Tight</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Sore')}>
            <Text style={styles.symptomText}>Sore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Stiff</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Cramping')}>
            <Text style={styles.symptomText}>Cramping</Text>
        </TouchableOpacity>
        </View>

        {/* Body */}
      <View>
        <Text style={styles.subTitle}>Where?</Text>
      </View>

        {/* Upper Body */}
        <View style={styles.box}>
        <Text style={styles.subTitle}>Upper Body:</Text>
        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Tight')}>
            <Text style={styles.symptomText}>Neck</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Sore')}>
            <Text style={styles.symptomText}>Upper Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Chest</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Upper Arms</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Elbows</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Forearms</Text>ß
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Wrists</Text>ß
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Hands</Text>ß
        </TouchableOpacity>
        </View>


        {/* Mid Body */}
        <View style={styles.box}>
        <Text style={styles.subTitle}>Mid Body:</Text>
        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Sore')}>
            <Text style={styles.symptomText}>Mid Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Lower Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Abs/Obliques</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Ribs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Hips</Text>
        </TouchableOpacity>

        </View>
    

    {/* Lower Body */}
    <View style={styles.box}>
        <Text style={styles.subTitle}>Lower Body:</Text>
        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Sore')}>
            <Text style={styles.symptomText}>Glutes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Groin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Quads</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Hamstrings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Knees</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Calves</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Shins</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Ankles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.symptomsCard} onPress={() => console.log('Stiff')}>
            <Text style={styles.symptomText}>Feet/Toes</Text>
        </TouchableOpacity>
        </View>

      
    </ScrollView>
)}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#b5caa0',
  },
  box: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  symptomsCard: {           
    height: 40,            
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 5,
  },
  symptomText: {
    fontSize: 18,
  },
});