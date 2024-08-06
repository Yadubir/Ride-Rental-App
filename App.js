import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './screens/HomePage';
import ProfilePage from './screens/ProfilePage';
import LoginPage from './screens/LoginPage';
import ReservationPage from './screens/ReservationPage';
import PenaltyPage from './screens/PenaltyPage';
import CustomNavbar from './screens/CustomNavbar';
import SignupPage from './screens/SignupPage';
import { UserProvider } from './ContextAPI/Usercontext';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);
  };

  return (
    <UserProvider>
      <NavigationContainer>
        {!isLoggedIn ? (
          <Stack.Navigator initialRouteName="LoginPage">
            <Stack.Screen name="LoginPage">
              {(props) => <LoginPage {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="SignupPage" component={SignupPage} />
          </Stack.Navigator>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <StatusBar style="auto" />
            </View>
            <Stack.Navigator screenOptions={{ header: (props) => <CustomNavbar {...props} /> }}>
              <Stack.Screen name="Homepage">
                {(props) => <Homepage {...props} userData={userData} />}
              </Stack.Screen>
              <Stack.Screen name="ProfilePage" component={ProfilePage} />
              <Stack.Screen name="ReservationPage" component={ReservationPage} />
              <Stack.Screen name="PenaltyPage" component={PenaltyPage} />
            </Stack.Navigator>
          </View>
        )}
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
