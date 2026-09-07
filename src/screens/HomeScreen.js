import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { spacing, typography, radius } from '../constants/theme';
import { PRODUTOS } from '../data/produtos';

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Produto', { produto: item })}
    >
      <Image source={{ uri: item.imagem }} style={styles.thumb} resizeMode="cover" />
      <Text style={styles.cardTitle} numberOfLines={1}>{item.nome}</Text>
      <Text style={styles.cardStore}>{item.marca}</Text>
      <Text style={styles.cardPrice}>{item.preco}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recomendados pra você</Text>
      <FlatList
        data={PRODUTOS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  thumb: {
    height: 160,
    width: '100%',
    borderRadius: radius.sm,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.text,
  },
  cardStore: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cardPrice: {
    ...typography.subtitle,
    color: colors.primary,
    marginTop: spacing.xs,
  },
});
