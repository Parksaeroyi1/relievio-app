import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getCurrentUserEmail, saveUserEmail } from '../../../util/auth';

export default function PlannerScreen() {
  const [tags, setTags] = useState<string[]>([]);
  const [result, setResult] = useState({ stretches: "", massage: "" });
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const navigation = useNavigation();
  const [email, setEmail] = useState<string | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await getCurrentUserEmail(); // ✅ No more hardcoding
      setEmail(email);
      console.log('✅ Stored email:', email);
    };
  
    fetchEmail();
  }, []);

  useEffect(() => {
    fetchResults();
  }, []);
  
  

  const createPlanner = async () => {
    if (!email) {
      Alert.alert("User not logged in", "Please log in before saving your plan.");
      return;
    }

    console.log('📬 Sending to planner for email:', email);


    try {
      const response = await fetch(`http://192.168.2.46:8000/api/user/email/${email}/planner`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stretches: result.stretches,
          massage: result.massage,
        }),
      });

      const data = await response.json();
      console.log("Saved to planner:", data);
    } catch (error) {
      console.error("Failed to save planner:", error);
      Alert.alert("Error", "Could not save to planner.");
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch('http://192.168.2.46:8000/api/results');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    }
  };

  const handleShowResults = () => {
    if (!selectedSymptom || !selectedBodyPart) {
      Alert.alert("Missing Selection", "Please select one symptom and one body part.");
      return;
    }

    const selectionTags = [selectedSymptom, selectedBodyPart].sort().join();

    const found = results.find((r) => r.tags.sort().join() === selectionTags);

    if (found) {
      setResult(found);
      setShowResult(true);
    } else {
      Alert.alert("No Match", "No results found for this combination.");
    }

    setTags([]); // Optional: can be removed if unused
  };

  const handleReset = () => {
    setShowResult(false);
    setTags([]);
    setResult({ stretches: "", massage: "" });
    setSelectedSymptom(null);
    setSelectedBodyPart(null);
  };

  const handleTagSelection = (type: 'symptom' | 'bodyPart', value: string) => {
    if (type === 'symptom') {
      setSelectedSymptom(value);
    } else {
      setSelectedBodyPart(value);
    }
  };

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <SafeAreaView>
        <Text style={styles.title}>Planner</Text>
      </SafeAreaView>

      {/* SELECTION VIEW */}
      {!showResult && (
        <>
          {/* SYMPTOMS */}
          <View style={styles.box}>
            <Text style={styles.subTitle}>What are your symptoms? (Choose 1)</Text>
            {["tight", "sore", "stiff"].map(symptom => (
              <TouchableOpacity
                key={symptom}
                style={[styles.symptomsCard, selectedSymptom === symptom && styles.symptomsCardSelected]}
                onPress={() => handleTagSelection('symptom', symptom)}
              >
                <Text style={styles.symptomText}>{symptom.charAt(0).toUpperCase() + symptom.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* BODY PARTS */}
          {[
            { title: "Upper Body", parts: ["neck", "shoulders", "traps", "upper back", "chest", "upper arms", "elbows", "forearms", "hands", "wrists"] },
            { title: "Mid Body", parts: ["mid back", "lower back", "abs", "obliques", "ribs", "hips"] },
            { title: "Lower Body", parts: ["glutes", "groin", "quads", "hamstrings", "knees", "calves", "shins", "ankles", "feet", "toes"] }
          ].map(section => (
            <View key={section.title} style={styles.box}>
              <Text style={styles.subTitle}>{section.title}:</Text>
              {section.parts.map(bodyPart => (
                <TouchableOpacity
                  key={bodyPart}
                  style={[styles.symptomsCard, selectedBodyPart === bodyPart && styles.symptomsCardSelected]}
                  onPress={() => handleTagSelection('bodyPart', bodyPart)}
                >
                  <Text style={styles.symptomText}>{bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <TouchableOpacity style={styles.primaryButton} onPress={handleShowResults}>
            <Text style={styles.buttonText}>Show Results</Text>
          </TouchableOpacity>
        </>
      )}

      {/* RESULTS VIEW */}
      {showResult && (
        <>
          <Text style={styles.subTitle}>Here are your stretches and massages:</Text>
          <Text style={styles.resultText}>- {result.stretches}</Text>
          <Text style={styles.resultText}>- {result.massage}</Text>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              createPlanner();
              handleReset();
              navigation.navigate('tracker');
            }}
          >
            <Text style={styles.buttonText}>Add to Tracker</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  box: { marginBottom: 30 },
  title: { fontSize: 30, marginBottom: 20, color: 'white', fontWeight: 'bold' },
  subTitle: { fontSize: 20, marginBottom: 10, color: '#ddd', fontWeight: '600', paddingBottom: 20 },
  symptomsCard: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  symptomText: { fontSize: 18, color: '#eee' },
  symptomsCardSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  resultText: {
    fontSize: 17,
    lineHeight: 26,
    color: '#f3f4f6',
    fontWeight: '500',
    letterSpacing: 0.3,
    marginBottom: 12,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#6B7280',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
