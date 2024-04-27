// Navigation.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomNavbar from './CustomNavbar';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import ReservationPage from './ReservationPage';
import PenaltyPage from './PenaltyPage';
import { useState } from 'react';

const Drawer = createDrawerNavigator();


const Navigation = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const handleLogin = () => {
    setisLoggedIn(true);
  }
  return (
    <NavigationContainer>

      {!isLoggedIn ? (<LoginPage onLogin={handleLogin} />)
      :(
      <Drawer.Navigator initialRouteName="LoginPage" drawerContent={() => <CustomNavbar />}>
        <Drawer.Screen name="HomePage" component={HomePage} />
        <Drawer.Screen name="ProfilePage" component={ProfilePage} />
        <Drawer.Screen name="ReservationPage" component={ReservationPage} />
        <Drawer.Screen name="PenaltyPage" component={PenaltyPage} />
      </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Navigation;
