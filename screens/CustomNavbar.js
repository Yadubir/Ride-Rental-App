import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomNavbar = ({ navigation }) => {
  return (
    <View style={[styles.container, styles.navbarBorder]}>
      <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
        <Text style={styles.navItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.navItem}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Reservation')}>
        <Text style={styles.navItem}>Reservation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Penalty')}>
        <Text style={styles.navItem}>Penalty</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 85,
  },
  navbarBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  navItem: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 35,
  },
});

export default CustomNavbar;
