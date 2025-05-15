import { StyleSheet, Text, View, ScrollView, TextInput, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function TrackerScreen() {
  
  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


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
        <Text style={ styles.subTitle }> My stretches </Text>
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
       <TextInput style={styles.input} placeholder="Click here…" onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={styles.status}>{keyboardStatus}</Text>
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
    height: 300,
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  status: {
    padding:16,
    textAlign: 'center',
  },

})