import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './src/components/UserContext';
import HomePage from './src/pages/HomePage';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import DonationPage from './src/pages/DonationPage';
import InfoPage from './src/pages/InfoPage';
import EducationPage from './src/pages/EducationPage';
import MainMenu from './src/pages/MainMenu';
import AdminMenu from './src/pages/AdminMenu';
import UserTable from "./src/pages/UserTable";
import WildlifeTable from "./src/pages/WildlifeTable";
import DonationTable from "./src/pages/DonationTable";
import Firebase from "./src/pages/Firebase";
import IdentifyPage from './src/pages/IdentifyPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomePage} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginPage} 
          options={{ title: 'Login - Semonggoh Wildlife Centre', headerLeft: () => null,}} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterPage} 
          options={{ title: 'Register - Semonggoh Wildlife Centre', headerLeft: () => null,}} 
        />
        <Stack.Screen 
          name="Donation" 
          component={DonationPage} 
          options={{ title: 'Donation - Semonggoh Wildlife Centre', headerLeft: () => null,}} 
        />
        <Stack.Screen 
          name="Info" 
          component={InfoPage} 
          options={{ title: 'Information - Semonggoh Wildlife Centre', headerLeft: () => null,}} 
        />
        <Stack.Screen 
          name="Education" 
          component={EducationPage} 
          options={{ title: 'Education - Semonggoh Wildlife Centre', headerLeft: () => null,}} 
        />
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenu} 
          options={{ title: 'Main Menu - Semonggoh Wildlife Centre', headerLeft: () => null,}} 
        />
        <Stack.Screen 
          name="AdminMenu" 
          component={AdminMenu} 
          options={{ title: 'Admin Menu - Semonggoh Wildlife Centre', headerLeft: () => null,}} 
        />
        <Stack.Screen 
          name="UserTable" 
          component={UserTable} 
          options={{ title: 'User Table - Admin Dashboard', headerLeft: () => null,}} 
        />
        <Stack.Screen 
          name="WildlifeTable" 
          component={WildlifeTable} 
          options={{ title: 'Wildlife Table - Admin Dashboard', headerLeft: () => null,}} 
        />
        <Stack.Screen 
          name="DonationTable" 
          component={DonationTable} 
          options={{ title: 'Donation Table - Admin Dashboard', headerLeft: () => null,}} 
        />
        <Stack.Screen 
          name="Firebase" 
          component={Firebase} 
          options={{ title: 'Firebase - Admin Dashboard', headerLeft: () => null,}} 
        /> 
        <Stack.Screen 
          name="Identify" 
          component={IdentifyPage} 
          options={{ title: 'Identify - Semonggoh Wildlife Centre', headerLeft: () => null, }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;
