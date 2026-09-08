import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import ProdutoScreen from '../screens/ProdutoScreen';
import { colors } from '../constants/colors';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={AppTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="Produto"
        component={ProdutoScreen}
        options={({ route }) => ({
          title: route.params?.produto?.nome ?? 'Produto',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        })}
      />
    </Stack.Navigator>
  );
}
