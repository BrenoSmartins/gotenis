import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { colors } from '../constants/colors';
import { spacing, typography, radius } from '../constants/theme';
import { PRODUTOS } from '../data/produtos';

// Marcas presentes no catálogo — usadas como chips de filtro rápido.
const MARCAS = [...new Set(PRODUTOS.map((p) => p.marca))];

export default function BuscaScreen({ navigation }) {
  const [marcaAtiva, setMarcaAtiva] = useState(null);
  const [busca, setBusca] = useState('');

  const resultados = useMemo(() => {
    return PRODUTOS.filter((p) => {
      const bateBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
      const bateMarca = !marcaAtiva || p.marca === marcaAtiva;
      return bateBusca && bateMarca;
    });
  }, [busca, marcaAtiva]);

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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar tênis, marca..."
        placeholderTextColor={colors.textSecondary}
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={MARCAS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(m) => m}
        style={styles.filtrosRow}
        renderItem={({ item: marca }) => {
          const ativo = marcaAtiva === marca;
          return (
            <TouchableOpacity
              style={[styles.chip, ativo && styles.chipAtivo]}
              onPress={() => setMarcaAtiva(ativo ? null : marca)}
            >
              <Text style={[styles.chipText, ativo && styles.chipTextAtivo]}>{marca}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum tênis encontrado com esses filtros</Text>
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
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
  filtrosRow: {
    flexGrow: 0,
    marginBottom: spacing.md,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    marginRight: spacing.sm,
  },
  chipAtivo: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.body,
    color: colors.text,
  },
  chipTextAtivo: {
    color: colors.white,
    fontWeight: '600',
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
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
