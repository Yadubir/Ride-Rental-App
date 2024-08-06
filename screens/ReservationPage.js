import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect } from 'react';

const ReservationPage = () => {
  const [selectedDuration, setSelectedDuration] = useState(20); // Default duration
  const [from, setFrom] = useState('Academic Block'); // Default location
  const [selectedParkingStand, setSelectedParkingStand] = useState('MPH'); // Default parking stand
  const [reservationData, setReservationData] = useState(null); // State to store reservation data
  const [showPopup, setShowPopup] = useState(false); // State to control the modal
  const [email, setEmail] = useState(''); // State to store user's email
  const [name, setName] = useState('New User'); // State to store user's name
  const [userId, setUserId] = useState('0'); // State to store user's name

  useEffect(() => {
    // Generate userId based on email when email changes
    if (email) {
      setUserId(generateUserId(email));
    }
  }, [email]);

  const durations = Array.from({ length: 7 }, (_, index) => (index + 1) * 20); // Generating durations: 20, 40, 60, ..., 140 minutes
  const parkingStands = ['Academic Block', 'Lab Complex', 'MPH', 'Boys Hostel B-1', 'Girls Hostel B-1'];

  const handleCompleteReservation = async () => {
    try {
      const response = await axios.post('http://172.25.160.70:3000/reservation', {
        email: email,
        duration: selectedDuration,
        from: from,
        parkingStand: selectedParkingStand,
        name: name,
        totalAmount: calculateTotalAmount(selectedDuration), // You need to implement this function
      });
      
      console.log(response.data);
      setReservationData(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error completing reservation:', error);
      // Handle error - maybe show an error message to the user
    }
  };

  const calculateTotalAmount = (duration) => {
    // You need to implement the logic for calculating the total amount based on the duration
    // This is just a placeholder
    return duration * 0.5; // Assuming some rate per minute
  };
  // const generateUserId = (email) => {
  //   // Example implementation: Convert email to lowercase and remove special characters
  //   const cleanEmail = email.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  //   // Example implementation: Generate userId using a combination of cleanEmail and timestamp
  //   return cleanEmail + Date.now();
  // }

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
        <Text style={styles.sectionTitle}>From Parking Stand</Text>
        <View style={styles.optionsContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {parkingStands.map(stand => (
              <Text
                key={stand}
                style={[
                  styles.option,
                  from === stand && styles.selectedOption,
                ]}
                onPress={() => setFrom(stand)}
              >
                {stand}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>To Parking Stand</Text>
        <View style={styles.optionsContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {parkingStands.map(standTo => (
              <Text
                key={standTo}
                style={[
                  styles.option,
                  selectedParkingStand === standTo && styles.selectedOption,
                ]}
                onPress={() => setSelectedParkingStand(standTo)}
              >
                {standTo}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity style={styles.completeReservationButton} onPress={handleCompleteReservation}>
        <Text style={styles.completeReservationButtonText}>Complete Reservation</Text>
      </TouchableOpacity>
      <Modal
  visible={showPopup}
  transparent={true}
  animationType="slide"
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>Your reservation is completed!</Text>
      <View>
        <Text> Thank You.  </Text>
        <Text> @RR  </Text>
        {/* <Text>Duration: {reservationData?.duration || 'Loading...'}</Text> */}
        {/* <Text>From: {reservationData?.from || 'Loading...'}</Text>
        <Text>To: {reservationData?.parkingStand || 'Loading...'}</Text>
        <Text>Total Amount: Rs. {reservationData?.totalAmount || 'Loading...'}</Text> */}
      </View>
      <Button title="Close" onPress={() => setShowPopup(false)} />
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: '#C7C8CC',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
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
    maxHeight: 135,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },

});

export default ReservationPage;
