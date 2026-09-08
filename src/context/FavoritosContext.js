import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritosContext = createContext(null);

const STORAGE_KEY = '@gotenis:favoritos';

export function FavoritosProvider({ children }) {
  const [favoritosIds, setFavoritosIds] = useState([]);
  const [carregado, setCarregado] = useState(false);


  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((salvo) => {
        if (salvo) setFavoritosIds(JSON.parse(salvo));
      })
      .catch((err) => console.warn('Erro ao carregar favoritos:', err))
      .finally(() => setCarregado(true));
  }, []);


  useEffect(() => {
    if (!carregado) return; // evita sobrescrever com [] antes de terminar de carregar
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favoritosIds)).catch((err) =>
      console.warn('Erro ao salvar favoritos:', err)
    );
  }, [favoritosIds, carregado]);

  function isFavorito(id) {
    return favoritosIds.includes(id);
  }

  function alternarFavorito(id) {
    setFavoritosIds((atual) =>
      atual.includes(id) ? atual.filter((favId) => favId !== id) : [...atual, id]
    );
  }

  return (
    <FavoritosContext.Provider value={{ favoritosIds, isFavorito, alternarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}


export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos precisa ser usado dentro de um FavoritosProvider');
  }
  return context;
}