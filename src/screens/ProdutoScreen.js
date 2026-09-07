import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { colors } from '../constants/colors';
import { spacing, typography, radius } from '../constants/theme';

// Abre o site da loja específica pra esse produto.
// Linking.openURL manda o sistema abrir no navegador (ou no app da loja,
// se estiver instalado e registrado pra esse link).
async function abrirLoja(url) {
  const suportado = await Linking.canOpenURL(url);
  if (suportado) {
    Linking.openURL(url);
  } else {
    Alert.alert('Não foi possível abrir o link', url);
  }
}

export default function ProdutoScreen({ route }) {
  // O produto inteiro (com fotos e lojas) vem via navigation.navigate('Produto', { produto })
  // lá na HomeScreen/BuscaScreen. Aqui só usamos o que já veio.
  const produto = route.params?.produto;

  if (!produto) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: produto.imagem }} style={styles.thumb} resizeMode="cover" />
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
    marginBottom: spacing.md,
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
