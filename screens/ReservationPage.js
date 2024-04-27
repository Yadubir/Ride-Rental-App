import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ReservationPage = () => {
  const [selectedDuration, setSelectedDuration] = useState(20); // Default duration
  const [selectedParkingStand, setSelectedParkingStand] = useState('Stand A'); // Default parking stand

  const durations = Array.from({ length: 7 }, (_, index) => (index + 1) * 20); // Generating durations: 20, 40, 60, ..., 140 minutes
  const parkingStands = ['Academic Block', 'Lab Complex' , 'MPH' , 'Boys Hostel B-1', 'Girls Hostel B-1'];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Duration</Text>
        <View style={styles.optionsContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {durations.map(duration => (
              <Text
                key={duration}
                style={[
                  styles.option,
                  selectedDuration === duration && styles.selectedOption,
                ]}
                onPress={() => setSelectedDuration(duration)}
              >
                {duration} mins
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select a Parking Stand</Text>
        <View style={styles.optionsContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {parkingStands.map(stand => (
              <Text
                key={stand}
                style={[
                  styles.option,
                  selectedParkingStand === stand && styles.selectedOption,
                ]}
                onPress={() => setSelectedParkingStand(stand)}
              >
                {stand}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity style={styles.completeReservationButton}>
        <Text style={styles.completeReservationButtonText}>Complete Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsContainer: {
    maxHeight: 200,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#D9D9D9',
    color: '#4d5c6b'
  },
  completeReservationButton: {
    backgroundColor: '#A1DAE0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  completeReservationButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ReservationPage;
