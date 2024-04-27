import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './screens/HomePage';
import ProfilePage from './screens/ProfilePage';
import LoginPage from './screens/LoginPage';
import ReservationPage from './screens/ReservationPage';
import PenaltyPage from './screens/PenaltyPage';
import CustomNavbar from './screens/CustomNavbar';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <StatusBar style="auto" />
          </View>
          <Stack.Navigator
            screenOptions={{
              header: ({ navigation }) => <CustomNavbar navigation={navigation} />,
            }}
          >
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="Reservation" component={ReservationPage} />
            <Stack.Screen name="Penalty" component={PenaltyPage} />
          </Stack.Navigator>
        </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
