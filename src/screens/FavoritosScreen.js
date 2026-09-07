import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { spacing, typography, radius } from '../constants/theme';
import { PRODUTOS } from '../data/produtos';
import { useFavoritos } from '../context/FavoritosContext';

export default function FavoritosScreen({ navigation }) {
  const { favoritosIds, alternarFavorito } = useFavoritos();

 
  const produtosFavoritados = PRODUTOS.filter((p) => favoritosIds.includes(p.id));

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Produto', { produto: item })}
    >
      <Image source={{ uri: item.imagem }} style={styles.thumb} resizeMode="cover" />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.nome}</Text>
        <Text style={styles.cardBrand}>{item.marca}</Text>
        <Text style={styles.cardPrice}>{item.preco}</Text>
      </View>
      <TouchableOpacity
        onPress={() => alternarFavorito(item.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="heart" size={22} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus favoritos</Text>

      <FlatList
        data={produtosFavoritados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Você ainda não salvou nenhum tênis. Toca no coração na tela do produto
            pra adicionar aqui.
          </Text>
        }
      />
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
  listContent: {
    paddingBottom: spacing.xl,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
    marginRight: spacing.md,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.text,
  },
  cardBrand: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cardPrice: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  empty: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xl,
  },
});