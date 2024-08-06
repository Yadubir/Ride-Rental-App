import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import {WebView} from 'react-native-webview';

const PenaltyPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleFormPopup = () => {
    setShowFormPopup(!showFormPopup);
  };

  const handleDisputeReason = (reason) => {
    setDisputeReason(reason);
    setSelectedReason(reason); // Set the selected reason to display below "Dispute this charge"
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.borderBottom]}>Late return penalty</Text>
      <View style={styles.section}>
        <Text style={[styles.sectionText, styles.bold]}>Total Amount Due:</Text>
        <Text style={[styles.sectionText, styles.bold, styles.amount]}>Rs. 30</Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionText, styles.bold]}>Why am I being charged:</Text>
        <Text style={styles.sectionText}>
          You were charged because you returned the bike 1 hour late.
        </Text>
      </View>
      <TouchableOpacity style={[styles.section, styles.disputeButton]} onPress={toggleModal}>
        <Text style={[styles.sectionText, styles.bold]}>Dispute this charge</Text>
        <Text style={styles.sectionText}>
          {selectedReason ? `Selected reason: ${selectedReason}` : "Select a reason"}
        </Text>
        <Text style={[styles.sectionText, styles.bold]}>
          We'll review your dispute and get back to you within 72 hours.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text onPress={() => setShowPopup(true)} style={styles.buttonText}>Pay Rs 30</Text>
      </TouchableOpacity>
        <Text style={styles.feedbackText}>Feedback:</Text>
      <TouchableOpacity style={styles.button} onPress={() => setShowFormPopup(true)}>
        <Text style={styles.buttonText}>Open Google Form</Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleDisputeReason('Late return was justified')}>
              <Text style={styles.modalOption}>Late return was justified</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDisputeReason('Did not use the bike')}>
              <Text style={styles.modalOption}>Did not use the bike</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDisputeReason('Technical issue with the bike')}>
              <Text style={styles.modalOption}>Technical issue with the bike</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Redirecting to the payment gateway...</Text>
            <View>
              <Text> Please wait...  </Text>
              {/* <Text>Duration: {reservationData?.duration || 'Loading...'}</Text> */}
              {/* <Text>From: {reservationData?.from || 'Loading...'}</Text>
              <Text>To: {reservationData?.parkingStand || 'Loading...'}</Text>
              <Text>Total Amount: Rs. {reservationData?.totalAmount || 'Loading...'}</Text> */}
            </View>
            <Button title="Close" onPress={() => setShowPopup(false)} />
          </View>
        </View>
      </Modal>
      <Modal
        visible={showFormPopup} // Show the form popup when this state is true
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.popupWidth]}>
            <TouchableOpacity onPress={toggleFormPopup}>
              <Text style={styles.modalCancel}>Close</Text>
            </TouchableOpacity>
            <WebView source={{ uri: 'https://forms.gle/7iMNSrCzmkCdSfqU6' }} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 35,
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  amount: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#369EFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  disputeButton: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    minWidth: 200,
    maxWidth: 300,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalCancel: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#007bff',
    textAlign: 'center',
  },
  popupWidth: {
    width: '80%',
    height: '60%', 
  },
  feedbackText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 120,
  }
});

export default PenaltyPage;
