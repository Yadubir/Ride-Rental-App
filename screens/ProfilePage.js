import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profilePhotoContainer}>
        <Image
          source={require('../assets/Spiderman.jpg')}
          style={styles.profilePhoto}
        />
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.textCenter]}>Deadpool</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Details</Text>
        <Text style={styles.boldText}>Registration Number</Text>
        <Text style={styles.textGap}>22BSA10000</Text>
        <Text style={styles.boldText}>Mobile Number</Text>
        <Text style={styles.textGap}>9876543210</Text>
        <Text style={styles.boldText}>Email Address</Text>
        <Text style={styles.textGap}>abcd@xyz.com</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rides Completed</Text>
        <Text>Number of Rides Completed: 10</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 8
  },
  textCenter: {
    textAlign: 'center',
  },
  textGap: {
    marginBottom: 15,
  }
});

export default ProfilePage;
