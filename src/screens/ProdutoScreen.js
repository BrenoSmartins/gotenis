import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { spacing, typography, radius } from '../constants/theme';
import { useFavoritos } from '../context/FavoritosContext';


async function abrirLoja(url) {
  const suportado = await Linking.canOpenURL(url);
  if (suportado) {
    Linking.openURL(url);
  } else {
    Alert.alert('Não foi possível abrir o link', url);
  }
}

export default function ProdutoScreen({ route }) {
  
  const produto = route.params?.produto;
  const { isFavorito, alternarFavorito } = useFavoritos();

  if (!produto) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Produto não encontrado</Text>
      </View>
    );
  }

  const favoritado = isFavorito(produto.id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: produto.imagem }} style={styles.thumb} resizeMode="cover" />
        <TouchableOpacity
          style={styles.favButton}
          onPress={() => alternarFavorito(produto.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={favoritado ? 'heart' : 'heart-outline'}
            size={24}
            color={favoritado ? colors.primary : colors.text}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{produto.nome}</Text>
      <Text style={styles.brand}>{produto.marca}</Text>
      <Text style={styles.priceFrom}>A partir de {produto.lojaPrincipal.preco}</Text>

      <Text style={styles.sectionTitle}>Comparar preços</Text>
      {produto.lojas.map((item) => (
        <TouchableOpacity
          key={item.loja}
          style={styles.storeRow}
          onPress={() => abrirLoja(item.url)}
        >
          <Text style={styles.storeName}>{item.loja}</Text>
          <View style={styles.storeRight}>
            <Text style={styles.storePrice}>{item.preco}</Text>
            <Text style={styles.storeArrow}>›</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => abrirLoja(produto.lojaPrincipal.url)}
      >
        <Text style={styles.buttonText}>Ver na loja</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  thumb: {
    height: 240,
    width: '100%',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  favButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  brand: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  priceFrom: {
    ...typography.subtitle,
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  storeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  storeName: {
    ...typography.body,
    color: colors.text,
  },
  storeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storePrice: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
    marginRight: spacing.xs,
  },
  storeArrow: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});