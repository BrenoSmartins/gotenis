import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { typography, spacing, radius } from '../constants/theme';

export default function PerfilScreen({ navigation }) {
  
  return (
    <View style={styles.container}>
      <View style={styles.avatar} />
      <Text style={styles.name}>Usuário GoTênis</Text>
      <Text style={styles.email}>usuario@exemplo.com</Text>

      <View style={styles.section}>
        <Text style={styles.sectionItem}>Preferências (tamanho, marca, estilo)</Text>
        <Text style={styles.sectionItem}>Histórico de buscas</Text>
        <Text style={styles.sectionItem}>Endereços salvos</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.getParent()?.getParent()?.replace('AuthStack')}
      >
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
  name: {
    ...typography.subtitle,
    color: colors.text,
  },
  email: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  section: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  sectionItem: {
    ...typography.body,
    color: colors.text,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.xl,
  },
  logoutText: {
    color: colors.error,
    fontWeight: '600',
  },
});
