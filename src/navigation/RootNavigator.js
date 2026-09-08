import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const RootStack = createNativeStackNavigator();


export default function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="AuthStack" component={AuthStack} />
        <RootStack.Screen name="AppTabs" component={AppStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
