import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';

const Homepage = () => {
  const navigation = useNavigation();

  const handleReservation = (location) => {
    // Implement reservation logic here
    console.log(`Reserved bike at ${location}`);
    navigation.navigate('Reservation');
  };

  const handleEndRide = () => {
    // Implement end ride logic here
    console.log('Ended ride');
  };

  const handleExtendRide = () => {
    // Implement extend ride logic here
    console.log('Extended ride');
  };

  const navigateToPenaltyPage = () => {
    navigation.navigate('Penalty');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 23.0775, // Latitude of VIT Bhopal University
            longitude: 76.8513, // Longitude of VIT Bhopal University
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
          }}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Bikes</Text>
        <View style={styles.bikeLocation}>
          <Text>Academic Block</Text>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => handleReservation('Academic block')}
          >
            <Text style={styles.reserveButtonText}>Reserve</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bikeLocation}>
          <Text>Girls Block 2</Text>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => handleReservation('Girls Block 2')}
          >
            <Text style={styles.reserveButtonText}>Reserve</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bikeLocation}>
          <Text>Boy's Block 4</Text>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => handleReservation("Boy's Block 4")}
          >
            <Text style={styles.reserveButtonText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Reservations</Text>
        <View style={styles.reservation}>
          <Text>Reservation AB to LH-2</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.endRideButton, styles.button]}
              onPress={handleEndRide}
            >
              <Text style={styles.buttonText}>End Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.extendRideButton, styles.button]}
              onPress={handleExtendRide}
            >
              <Text style={styles.buttonText}>Extend Ride</Text>
            </TouchableOpacity>
          </View>
          <Text>End Time: 12:00 PM</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  mapContainer: {
    height: 200,
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bikeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reserveButton: {
    padding: 5,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  reserveButtonText: {
    color: '#fff',
  },
  reservation: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  button: {
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  endRideButton: {
    backgroundColor: '#dc3545',
  },
  extendRideButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
  },
});

export default Homepage;
