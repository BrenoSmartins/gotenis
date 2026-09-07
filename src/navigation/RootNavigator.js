import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const RootStack = createNativeStackNavigator();

// Navegador raiz: começa no fluxo de autenticação.
// LoginScreen/CadastroScreen usam navigation.replace('AppTabs') pra entrar
// no app principal sem deixar o Login na pilha (usuário não volta pra ele
// apertando "voltar"). O nome da rota continua "AppTabs" por conveniência,
// mesmo o componente agora sendo a AppStack (Tabs + Produto).
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
