import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import MyFormPage from './MyFormPage';
import CadProd from './CadProd';
import Cadjob from './Cadjob';
import Avalia from './Avalia';
import Forum from './Forum';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
  initialRouteName="HomeScreen"
  screenOptions={{
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: [
      {
        display: 'flex',
      },
      null,
    ],
  }}
  tabBarOptions={{
    keyboardHidesTabBar: true, // Esta opção ocultará a barra de navegação ao abrir o teclado
  }}
>
    <Tab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="MyFormPage"
      component={MyFormPage}
      options={{
        title: 'Parceria',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people" color={color} size={size} />
        ),
      }}
    />
     <Tab.Screen
      name="CadProd"
      component={CadProd}
      options={{
        title: 'Produto',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cart" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Cadjob"
      component={Cadjob}
      options={{
        title: 'Trabalhe conosco',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="briefcase" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen
      name="Avalia"
      component={Avalia}
      options={{
        title: 'Nos Avalie',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="thumbs-up" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Forum"
      component={Forum}
      options={{
        title: 'Fórum',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="help" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabScreen"
          component={MainTabScreen}
          options={{ headerShown: false }}
        />
        {/* Aqui você pode adicionar mais telas conforme necessário */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
