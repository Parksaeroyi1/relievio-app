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

      {/* Account Settings */}
      <View>
        <Text style={ styles.subTitle }> Account </Text>
        <View style={ styles.progressCard}>
          <Text>Update Profile Info</Text>
        </View>
        <View style={ styles.progressCard}>
          <Text>Change Password</Text>
          </View>
      </View>

      {/* App Settings */}
      <View>
        <Text style={ styles.subTitle }> Settings </Text>
        <View style={ styles.progressCard}>
          <Text>Enable Notifications</Text>
        </View>
        <View style={ styles.progressCard}>
          <Text>Notifcation Settings</Text>
          </View>
      </View>

      {/* About */}
      <View>
        <Text style={ styles.subTitle }> About </Text>
        <View style={ styles.progressCard}>
          <Text>About Us</Text>
        </View>

        <View style={ styles.progressCard}>
          <Text>Contact Us</Text>
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

})