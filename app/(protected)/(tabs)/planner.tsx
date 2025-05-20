import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@react-navigation/elements';


export default function PlannerScreen() {

    const [tags, setTags] = useState<string[]>([]);
    const [result, setResult] = useState({stretches: "", massage: ""});
    const [results, setResults] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [selectedSymptom, setSelectedSymptom] = useState(null);
    const [selectedBodyPart, setSelectedBodyPart] = useState(null);


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

      <View style={{ display: !showResult ? 'flex' : 'none' }}>
      {/* SYMPTOMS */}
      <View style={styles.box}>
      
        <Text style={styles.subTitle}>What are your symptoms?(Choose 1)</Text>

        {/* Tight */}
<TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedSymptom === "tight" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("tight") ? [...current] : [...current, "tight"]
    );
    setSelectedSymptom("tight");
  }}
>
  <Text style={styles.symptomText}>Tight</Text>
</TouchableOpacity>

{/* Sore */}
<TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedSymptom === "sore" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("sore") ? [...current] : [...current, "sore"]
    );
    setSelectedSymptom("sore");
  }}
>
  <Text style={styles.symptomText}>Sore</Text>
</TouchableOpacity>

{/* Stiff */}
<TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedSymptom === "stiff" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("stiff") ? [...current] : [...current, "stiff"]
    );
    setSelectedSymptom("stiff");
  }}
>
  <Text style={styles.symptomText}>Stiff</Text>
</TouchableOpacity>
 </View>
        


        {/* BODY */}
      <View>
        <Text style={styles.subTitle}>Where?(Choose 1)</Text>
      </View>


        {/* UPPER */}
        <View style={styles.box}>
        <Text style={styles.subTitle}>Upper Body:</Text>

          {/* Neck */}
          <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "neck" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("neck") ? [...current] : [...current, "neck"]
    );
    setSelectedBodyPart("neck");
  }}
>
      <Text style={styles.symptomText}>Neck</Text>
      </TouchableOpacity>
        
        {/* Shoulders */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "shoulders" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("shoulders") ? [...current] : [...current, "shoulders"]
    );
    setSelectedBodyPart("shoulders");
  }}
>
      <Text style={styles.symptomText}>Shoulders</Text>
      </TouchableOpacity>

        {/*/ Traps */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "traps" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("traps") ? [...current] : [...current, "traps"]
    );
    setSelectedBodyPart("traps");
  }}
>
      <Text style={styles.symptomText}>Traps</Text>
      </TouchableOpacity>

        {/* Upper Back */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "upper back" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("upper back") ? [...current] : [...current, "upper back"]
    );
    setSelectedBodyPart("upper back");
  }}
>
      <Text style={styles.symptomText}>Upper Back</Text>
      </TouchableOpacity>

        {/* Chest */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "chest" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("chest") ? [...current] : [...current, "chest"]
    );
    setSelectedBodyPart("chest");
  }}
>
      <Text style={styles.symptomText}>Chest</Text>
      </TouchableOpacity>

        {/* Upper Arms */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "upper arms" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("upper arms") ? [...current] : [...current, "upper arms"]
    );
    setSelectedBodyPart("upper arms");
  }}
>
      <Text style={styles.symptomText}>Upper Arms</Text>
      </TouchableOpacity>

        {/* Elbows */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "elbows" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("elbows") ? [...current] : [...current, "elbows"]
    );
    setSelectedBodyPart("elbows");
  }}
>
      <Text style={styles.symptomText}>Elbows</Text>
      </TouchableOpacity>

      {/* Forearms */}
      <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "forearms" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("forearms") ? [...current] : [...current, "forearms"]
    );
    setSelectedBodyPart("forearms");
  }}
>
      <Text style={styles.symptomText}>Forearms</Text>
      </TouchableOpacity>

        {/* Hands */}
      <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "hands" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("hands") ? [...current] : [...current, "hands"]
    );
    setSelectedBodyPart("hands");
  }}
>
      <Text style={styles.symptomText}>Hands</Text>
      </TouchableOpacity>

      {/* Wrists */}
      <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "wrists" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("wrists") ? [...current] : [...current, "wrists"]
    );
    setSelectedBodyPart("wrists");
  }}
>
      <Text style={styles.symptomText}>Wrists</Text>
      </TouchableOpacity>
        </View>


        {/* MID */}
        <View style={styles.box}>
        <Text style={styles.subTitle}>Mid Body:</Text>

        {/* Mid Back */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "mid back" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("mid back") ? [...current] : [...current, "mid back"]
    );
    setSelectedBodyPart("mid back");
  }}
>
            <Text style={styles.symptomText}>Mid Back</Text>
            </TouchableOpacity>

            {/* Lower Back */}
            <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "lower back" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("lower back") ? [...current] : [...current, "lower back"]
    );
    setSelectedBodyPart("lower back");
  }}
>
            <Text style={styles.symptomText}>Lower Back</Text>
            </TouchableOpacity>

            {/* Abs */}
            <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "abs" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("abs") ? [...current] : [...current, "abs"]
    );
    setSelectedBodyPart("abs");
  }}
>
            <Text style={styles.symptomText}>Abs</Text>
            </TouchableOpacity>

            {/* Obliques */}
            <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "obliques" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("olbiques") ? [...current] : [...current, "obliques"]
    );
    setSelectedBodyPart("obliques");
  }}
>
            <Text style={styles.symptomText}>Obliques</Text>
            </TouchableOpacity>

            {/* Ribs */}
            <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "ribs" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("ribs") ? [...current] : [...current, "ribs"]
    );
    setSelectedBodyPart("ribs");
  }}
>
            <Text style={styles.symptomText}>Ribs</Text>
            </TouchableOpacity>

            {/* Hips */}
            <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "hips" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("hips") ? [...current] : [...current, "hips"]
    );
    setSelectedBodyPart("hips");
  }}
>
            <Text style={styles.symptomText}>Hips</Text>
            </TouchableOpacity>

            </View>
    

    {/* LOWER */}
    <View style={styles.box}>
        <Text style={styles.subTitle}>Lower Body:</Text>

                {/* Glutes */}
                <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "glutes" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("glutes") ? [...current] : [...current, "glutes"]
    );
    setSelectedBodyPart("glutes");
  }}
>
        <Text style={styles.symptomText}>Glutes</Text>
        </TouchableOpacity>

        {/* Groin */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "groin" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("groin") ? [...current] : [...current, "groin"]
    );
    setSelectedBodyPart("groin");
  }}
>
        <Text style={styles.symptomText}>Groin</Text>
        </TouchableOpacity>

        {/* Quads */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "quads" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("quads") ? [...current] : [...current, "quads"]
    );
    setSelectedBodyPart("quads");
  }}
>
        <Text style={styles.symptomText}>Quads</Text>
        </TouchableOpacity>

        {/* Hamstrings */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "hamstrings" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("hamstrings") ? [...current] : [...current, "hamstrings"]
    );
    setSelectedBodyPart("hamstrings");
  }}
>
        <Text style={styles.symptomText}>Hamstrings</Text>
        </TouchableOpacity>

        {/* Knees */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "knees" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("knees") ? [...current] : [...current, "knees"]
    );
    setSelectedBodyPart("knees");
  }}
>
        <Text style={styles.symptomText}>Knees</Text>
        </TouchableOpacity>

        {/* Calves */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "calves" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("calves") ? [...current] : [...current, "calves"]
    );
    setSelectedBodyPart("calves");
  }}
>
        <Text style={styles.symptomText}>Calves</Text>
        </TouchableOpacity>

        {/* Shins */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "shins" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("shins") ? [...current] : [...current, "shins"]
    );
    setSelectedBodyPart("shins");
  }}
>
        <Text style={styles.symptomText}>Shins</Text>
        </TouchableOpacity>

        {/* Ankles */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "ankles" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("ankles") ? [...current] : [...current, "ankles"]
    );
    setSelectedBodyPart("ankles");
  }}
>
        <Text style={styles.symptomText}>Ankles</Text>
        </TouchableOpacity>

        {/* Feet */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "feet" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("feet") ? [...current] : [...current, "feet"]
    );
    setSelectedBodyPart("feet");
  }}
>
        <Text style={styles.symptomText}>Feet</Text>
        </TouchableOpacity>

        {/* Toes */}
        <TouchableOpacity
  style={[
    styles.symptomsCard,
    selectedBodyPart === "toes" && styles.symptomsCardSelected
  ]}
  onPress={() => {
    setTags(current =>
      current.includes("toes") ? [...current] : [...current, "toes"]
    );
    setSelectedBodyPart("toes");
  }}
>
        <Text style={styles.symptomText}>Toes</Text>
        </TouchableOpacity>

        </View>

    {/* Other */}
    <View>
            <Button onPress={() => {
            results.forEach((result) => {
                const areEqual = result.tags.sort().join() === tags.sort().join();
                if (areEqual) {
                  console.log('Match found:', result);
                  setResult(result);
                  setShowResult(true);
                }
            setTags([]);
            })
            }}>
                Results
            </Button>
        </View>

        </View>

        <View style={{ display: showResult ? 'flex' : 'none' }}>
        <Text style={styles.subTitle}>Here are your stretches and massages:</Text>
        <Text style={styles.resultText}>{result.stretches}</Text>
        <Text style={styles.resultText}>{result.massage}</Text>
        <Button onPress={() => {
            setShowResult(false);
            setTags([]);
            setResult({stretches: "", massage: ""});
            setSelectedSymptom(null);
            setSelectedBodyPart(null);  
        }}>
            Back
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
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  symptomText: {
    fontSize: 18,
  },
  symptomsCardSelected: {
    backgroundColor: '#4CAF50', // or any highlight color you like
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  }
  
});