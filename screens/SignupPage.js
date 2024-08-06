// SignupPage.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../ContextAPI/Usercontext';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://172.25.160.70:3000/register', {
        name,
        email,
        password,
      });
      if (response.data.status === 'ok') {
        setUser({ name, email }); // Set user context
        navigation.navigate('LoginPage');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred, please try again.');
    }
  };

  return (
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <View style={styles.inputView}>
    //     <TextInput
    //       style={styles.TextInput}
    //       placeholder="Name."
    //       placeholderTextColor="#003f5c"
    //       onChangeText={(name) => setName(name)}
    //     />
    //   </View>
    //   <View style={styles.inputView}>
    //     <TextInput
    //       style={styles.TextInput}
    //       placeholder="Email."
    //       placeholderTextColor="#003f5c"
    //       onChangeText={(email) => setEmail(email)}
    //     />
    //   </View>
    //   <View style={styles.inputView}>
    //     <TextInput
    //       style={styles.TextInput}
    //       placeholder="Password."
    //       placeholderTextColor="#003f5c"
    //       secureTextEntry={true}
    //       onChangeText={(password) => setPassword(password)}
    //     />
    //   </View>
    //   <TouchableOpacity onPress={handleSignup} style={styles.loginBtn}>
    //     <Text style={styles.loginText}>Signup</Text>
    //   </TouchableOpacity>
    // </View>
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Ride Rental</Text>
      <Image style={styles.image} source={require('../assets/RRlogo.png')} />
      <Text style={styles.welcomeText2}>Enter your details to register</Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter your Name here..."
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>
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
      <TouchableOpacity onPress={handleSignup} style={styles.signupBtn}>
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
    marginBottom: 40,
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
    marginBottom: 20,
    marginTop: 0,
  },
  welcomeText2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputView: {
//     backgroundColor: '#FFC0CB',
//     borderRadius: 30,
//     width: '70%',
//     height: 45,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 20,
//   },
//   loginBtn: {
//     width: '80%',
//     borderRadius: 25,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 40,
//     backgroundColor: '#FF1493',
//   },
//   loginText: {
//     color: 'white',
//   },
// });

export default SignupPage;
