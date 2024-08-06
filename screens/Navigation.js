import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomNavbar from './CustomNavbar';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import ReservationPage from './ReservationPage';
import PenaltyPage from './PenaltyPage';
import SignupPage from './SignupPage';

const Stack = createStackNavigator();

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState(null); // State to store user data

  const handleLogin = (userData) => {
    setUserData(userData); // Store user data
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="LoginPage">
            {(props) => <LoginPage {...props} onLogin={handleLogin} />}
          </Stack.Screen>
          <Stack.Screen name="SignupPage" component={SignupPage} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="HomePage" screenOptions={{ header: (props) => <CustomNavbar {...props} /> }}>
          <Stack.Screen name="HomePage">
            {(props) => <HomePage {...props} userData={userData} />} {/* Pass user data to homepage */}
          </Stack.Screen>
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="ReservationPage" component={ReservationPage} />
          <Stack.Screen name="PenaltyPage" component={PenaltyPage} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
