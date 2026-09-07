import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { FavoritosProvider } from './src/context/FavoritosContext';

export default function App() {
  return (
    <FavoritosProvider>
      <RootNavigator />
    </FavoritosProvider>
  );
}