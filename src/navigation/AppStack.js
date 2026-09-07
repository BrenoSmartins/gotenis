import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import ProdutoScreen from '../screens/ProdutoScreen';
import { colors } from '../constants/colors';

const Stack = createNativeStackNavigator();

// Envolve as bottom tabs numa Stack, só pra poder abrir "Produto" por cima
// delas — não importa se o usuário clicou no tênis a partir da Home ou da
// Busca, o destino é sempre essa mesma tela, registrada uma única vez aqui.
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
