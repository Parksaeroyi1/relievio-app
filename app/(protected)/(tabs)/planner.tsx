import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function PlannerScreen() {
  const [tags, setTags] = useState<string[]>([]);
  const [result, setResult] = useState({ stretches: "", massage: "" });
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const navigation = useNavigation();
  const [loadonce, setLoadOnce] = useState(false);


  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: false });
      }
    }, [])
  );
  const createPlanner = async () => {
    const response = await fetch('http://localhost:8000/api/user/email/elijahsuyatt@gmail.com/planner', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stretches: result.stretches,
        massage: result.massage,
      }),
    });

    const data = await response.json();
    console.log(data);
    setResult(data);
  }
  const fetchResults = async () => {
    const response = await fetch('http://localhost:8000/api/results');
    const data = await response.json();
    console.log(data);
    setResults(data);
    return data;
  };

  useEffect(() => {
   
    fetchResults()
  console.log('fetchResults');
  }, []);

  const handleShowResults = () => {
    if (!selectedSymptom || !selectedBodyPart) {
      Alert.alert(
        "Missing Selection",
        "Please select one symptom and one body part before viewing results."
      );
      return;
    }

    results.forEach((result) => {
      const areEqual = result.tags.sort().join() === tags.sort().join();
      if (areEqual) {
        console.log('Match found:', result);
        setResult(result);
        setShowResult(true);
      }
    });

    setTags([]);
  };

  const handleReset = () => {
    setShowResult(false);
    setTags([]);
    setResult({ stretches: "", massage: "" });
    setSelectedSymptom(null);
    setSelectedBodyPart(null);
  };

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      {/* Header */}
      <SafeAreaView>
        <View>
          <Text style={styles.title}>Planner</Text>
        </View>
      </SafeAreaView>

      {/* Selection screen */}
      <View style={{ display: !showResult ? 'flex' : 'none' }}>
        {/* SYMPTOMS */}
        <View style={styles.box}>
          <Text style={styles.subTitle}>What are your symptoms? (Choose 1)</Text>

          {["tight", "sore", "stiff"].map(symptom => (
            <TouchableOpacity
              key={symptom}
              style={[
                styles.symptomsCard,
                selectedSymptom === symptom && styles.symptomsCardSelected
              ]}
              onPress={() => {
                setTags(current =>
                  current.includes(symptom) ? [...current] : [...current, symptom]
                );
                setSelectedSymptom(symptom);
              }}
            >
              <Text style={styles.symptomText}>{symptom.charAt(0).toUpperCase() + symptom.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BODY PARTS */}
        <View>
          <Text style={styles.subTitle}>Where? (Choose 1)</Text>

          {/* Upper Body */}
          <View style={styles.box}>
            <Text style={styles.subTitle}>Upper Body:</Text>
            {["neck", "shoulders", "traps", "upper back", "chest", "upper arms", "elbows", "forearms", "hands", "wrists"].map(bodyPart => (
              <TouchableOpacity
                key={bodyPart}
                style={[
                  styles.symptomsCard,
                  selectedBodyPart === bodyPart && styles.symptomsCardSelected
                ]}
                onPress={() => {
                  setTags(current =>
                    current.includes(bodyPart) ? [...current] : [...current, bodyPart]
                  );
                  setSelectedBodyPart(bodyPart);
                }}
              >
                <Text style={styles.symptomText}>{bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Mid Body */}
          <View style={styles.box}>
            <Text style={styles.subTitle}>Mid Body:</Text>
            {["mid back", "lower back", "abs", "obliques", "ribs", "hips"].map(bodyPart => (
              <TouchableOpacity
                key={bodyPart}
                style={[
                  styles.symptomsCard,
                  selectedBodyPart === bodyPart && styles.symptomsCardSelected
                ]}
                onPress={() => {
                  setTags(current =>
                    current.includes(bodyPart) ? [...current] : [...current, bodyPart]
                  );
                  setSelectedBodyPart(bodyPart);
                }}
              >
                <Text style={styles.symptomText}>{bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Lower Body */}
          <View style={styles.box}>
            <Text style={styles.subTitle}>Lower Body:</Text>
            {["glutes", "groin", "quads", "hamstrings", "knees", "calves", "shins", "ankles", "feet", "toes"].map(bodyPart => (
              <TouchableOpacity
                key={bodyPart}
                style={[
                  styles.symptomsCard,
                  selectedBodyPart === bodyPart && styles.symptomsCardSelected
                ]}
                onPress={() => {
                  setTags(current =>
                    current.includes(bodyPart) ? [...current] : [...current, bodyPart]
                  );
                  setSelectedBodyPart(bodyPart);
                }}
              >
                <Text style={styles.symptomText}>{bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Show Results Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleShowResults}>
            <Text style={styles.buttonText}>Show Results</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Results screen */}
      <View style={{ display: showResult ? 'flex' : 'none' }}>
        <Text style={styles.subTitle}>Here are your stretches and massages:</Text>
        <Text style={styles.resultText}>-{result.stretches}</Text>
        <Text style={styles.resultText}>-{result.massage}</Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

<TouchableOpacity
  style={styles.primaryButton}
  onPress={() => {
    createPlanner();
     // Reset Planner state
     handleReset();
    // Navigate to Tracker and send newSession as param
    navigation.navigate('tracker');

  }}
>
  <Text style={styles.buttonText}>Add to Tracker</Text>
</TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',  // dark background
  },
  box: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: 'white',  // white text
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#ddd',  // light gray text
    fontWeight: '600',
    paddingBottom: 20,
  },
  symptomsCard: {
    backgroundColor: '#1E1E1E',  // dark gray card bg
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',  // subtle border for cards
  },
  symptomText: {
    fontSize: 18,
    color: '#eee',  // light text inside cards
  },
  symptomsCardSelected: {
    backgroundColor: '#3B82F6', // bright blue accent for selection
    borderColor: '#3B82F6', // border same as background when selected
  },
  resultText: {
    fontSize: 17,
    lineHeight: 26,
    color: '#f3f4f6', // softer light
    fontWeight: '500',
    letterSpacing: 0.3,
    marginBottom: 12,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  primaryButton: {
    backgroundColor: '#3B82F6', // blue button
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#6B7280', // gray button
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',  // white text on buttons
    fontSize: 18,
    fontWeight: '600',
  },
  stretchBox: {
    backgroundColor: '#1E1E1E', // dark gray for stretch box
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  resultCard: {
    backgroundColor: '#2a2a2a',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
});
