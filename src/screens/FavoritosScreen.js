import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { typography, spacing } from '../constants/theme';

// Ponto de partida simples — depois pode ligar num Context/estado global
// de favoritos compartilhado com HomeScreen e ProdutoScreen.
export default function FavoritosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus favoritos</Text>
      <Text style={styles.empty}>Você ainda não salvou nenhum tênis.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.md,
  },
  empty: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
