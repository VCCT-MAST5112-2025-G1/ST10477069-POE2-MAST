import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { MealsProvider } from './utils/MealsContext';
import { RootNavigator } from './navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <MealsProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </MealsProvider>
    </SafeAreaProvider>
  );
}
