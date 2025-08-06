import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppScreen from './screens/AppScreen';
import InitialPage from 'screens/InitialPage';

export type RootStackParamList = {
  APP: undefined;
  INICIAR: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="APP" component={AppScreen} />
        <Stack.Screen name="INICIAR" component={InitialPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
