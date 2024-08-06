import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import axios from 'axios';

const Homepage = () => {
  const [activeReservations, setActiveReservations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchActiveReservations();
  }, []);

  const handleReservation = (location) => {
    // Navigate to the reservation page
    navigation.navigate('ReservationPage', { location });
  }

  const fetchActiveReservations = async () => {
    try {
      // Fetch active reservations from the backend
      const response = await axios.get('http://172.25.224.154:3000/activeReservations');
      setActiveReservations(response.data);
    } catch (error) {
      console.error('Error fetching active reservations:', error);
    }
  };

  const handleEndRide = async (reservationId) => {
    try {
      // Send request to the backend to end the ride
      await axios.delete(`http://172.25.224.154:3000/reservation/${reservationId}`);
      // Remove the ended reservation from the active list
      setActiveReservations(prevReservations =>
        prevReservations.filter(reservation => reservation._id !== reservationId)
      );
    } catch (error) {
      console.error('Error ending ride:', error);
    }
  };

  const handleExtendRide = (reservationId) => {
    // Navigate to the reservation page for extending the ride
    navigation.navigate('ReservationPage');
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
        <ScrollView>
          {activeReservations.map(reservation => (
            <View key={reservation._id} style={styles.reservation}>
              <Text>Reservation {reservation.from} to {reservation.parkingStand}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.endRideButton, styles.button]}
                  onPress={() => handleEndRide(reservation._id)}
                >
                  <Text style={styles.buttonText}>End Ride</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.extendRideButton, styles.button]}
                  onPress={() => handleExtendRide(reservation._id)}
                >
                  <Text style={styles.buttonText}>Extend Ride</Text>
                </TouchableOpacity>
              </View>
              <Text>End Time: 20 mins.{reservation.endTime}</Text>
            </View>
          ))}
        </ScrollView>
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
