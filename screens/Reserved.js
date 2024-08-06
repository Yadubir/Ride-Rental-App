import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Reserved = () => {
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    axios.get('http://172.25.160.70:3000/reservation') // Fetch reservation data from backend API
      .then(response => {
        setReservationData(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservation data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Reserved</Text>
      {reservationData && (
        <View style={styles.detailsContainer}>
          <Text>From: {reservationData.from}</Text>
          <Text>To: {reservationData.parkingStand}</Text>
          <Text>Total Amount: {reservationData.totalAmount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
  },
});

export default Reserved;
