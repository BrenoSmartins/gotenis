import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import BuscaScreen from '../screens/BuscaScreen';
import FavoritosScreen from '../screens/FavoritosScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

const ICONS = {
  Home: 'home-outline',
  Busca: 'search-outline',
  Favoritos: 'heart-outline',
  Perfil: 'person-outline',
};

// Bottom tabs — cada uma é uma tela simples. A navegação até "Produto"
// (que precisa abrir a partir de qualquer aba: Home ou Busca) fica um
// nível acima, na AppStack, pra não precisar duplicar a rota em cada aba.
export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Busca" component={BuscaScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
