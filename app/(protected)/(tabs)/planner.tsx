import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@react-navigation/elements';


export default function PlannerScreen() {

    const [tags, setTags] = useState<string[]>([]);
    const [result, setResult] = useState({stretches: "", massage: ""});
    const [results, setResults] = useState([]);

    const fetchResults = async () => {
        const response = await fetch('http://localhost:8000/api/results');
        const data = await response.json();
        console.log(data);
        setResults(data);
        return data;
      }
      
        useEffect(() => {
          fetchResults()
        }, []);

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

        <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("tight")
                  ? [...current]
                  : [...current, "tight"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Tight</Text>
      </TouchableOpacity>

       
      <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("sore")
                  ? [...current]
                  : [...current, "sore"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Sore</Text>
      </TouchableOpacity>

        
      <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("stiff")
                  ? [...current]
                  : [...current, "stiff"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Stiff</Text>
      </TouchableOpacity>

        
      <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("cramping")
                  ? current.filter(tag => tag !== "cramping")
                  : [...current, "cramping"]
              );
            console.log(tags);
          }}>
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
        <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("neck")
                  ? current.filter(tag => tag !== "neck")
                  : [...current, "neck"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Neck</Text>
      </TouchableOpacity>

        <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("upper back")
                  ? current.filter(tag => tag !== "upper back")
                  : [...current, "upper back"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Upper Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("chest")
                  ? current.filter(tag => tag !== "chest")
                  : [...current, "chest"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Chest</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("upper arms")
                  ? current.filter(tag => tag !== "upper arms")
                  : [...current, "upper arms"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Upper Arms</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("elbows")
                  ? current.filter(tag => tag !== "elbows")
                  : [...current, "elbows"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Elbows</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("forearms")
                  ? current.filter(tag => tag !== "forearms")
                  : [...current, "forearms"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Forearms</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("wrists")
                  ? current.filter(tag => tag !== "wrists")
                  : [...current, "wrists"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Wrists</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.symptomsCard}
        onPress={() => {
            setTags(current => 
                current.includes("hands")
                  ? current.filter(tag => tag !== " hands")
                  : [...current, "hands"]
              );
            console.log(tags);
          }}>
      <Text style={styles.symptomText}>Hands</Text>
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

        {/* Other */}
        <View>
            <Button onPress={() => {
            results.forEach((result) => {
            const areEqual = result.tags.sort().join() === tags.sort().join();
            console.log(areEqual);
            if (areEqual) {
                setResult(result);
                console.log(result);
            }
            setTags([]);
            })
            }}>
                Results
            </Button>
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