import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

const LoginPage = ({ onLogin, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const userData = {
      email,
      password
    };

    axios
      .post('http://172.25.160.70:3000/login', userData)
      .then(res => {
        console.log(res.data);
        onLogin(userData); // Pass user data to the homepage
      })
      .catch(err => {
        alert('Invalid email or password');
        console.log(err);
      });
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignupPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Ride Rental</Text>
      <Image style={styles.image} source={require('../assets/RRlogo.png')} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter your Email here..."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter your password here..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSignUp} style={styles.signupBtn}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
    width: 160,
    height: 150,
    borderRadius: 10,
  },
  inputView: {
    backgroundColor: '#C7C8CC',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 100,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#322C2B',
  },
  loginText: {
    color: 'white',
  },
  signupText: {
    color: 'white',
  },
  signupBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#322C2B',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 60,
  },
});

export default LoginPage;
