import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { colors } from '../constants/colors';
import { spacing, typography, radius } from '../constants/theme';

// Componente de input genérico, ligado ao react-hook-form via Controller.
// Reaproveitado em Login, Cadastro e qualquer outro formulário do app.
// Recebe "control" e "name" do formulário pai, e mostra o erro de validação
// vindo do resolver do zod automaticamente.

export default function InputField({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.small,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
