import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppScreen from './screens/AppScreen';
import InitialPage from './screens/InitialPage';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { ActivityIndicator, View } from 'react-native';
import TermsScreen from 'screens/Terms';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  APP: undefined;
  INICIAR: undefined;
  TERMS: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const user = await AsyncStorage.getItem("userLogged");
        setIsLogged(!!user);
      } catch (error) {
        console.log("Erro ao verificar login:", error);
      } finally {
        setLoading(false);
      }
    };

    verificarLogin();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {isLogged ? (
          <>
            <Stack.Screen name="APP" component={AppScreen} />
            <Stack.Screen name="INICIAR" component={InitialPage} />
            <Stack.Screen name="TERMS" component={TermsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="INICIAR" component={InitialPage} />
            <Stack.Screen name="APP" component={AppScreen} />
            <Stack.Screen name="TERMS" component={TermsScreen} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
