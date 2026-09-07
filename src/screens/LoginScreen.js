import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../components/InputField';
import { colors } from '../constants/colors';
import { spacing, typography, radius } from '../constants/theme';

// Schema de validação do formulário de login.
// zod descreve as regras, e o zodResolver conecta isso ao react-hook-form.
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Informe seu email')
    .email('Email inválido'),
  senha: z
    .string()
    .min(1, 'Informe sua senha')
    .min(6, 'A senha precisa ter pelo menos 6 caracteres'),
});

export default function LoginScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', senha: '' },
  });

  // No protótipo não existe backend real de autenticação.
  // Aqui simulamos a validação e, se passar, navegamos pro app principal.
  const onSubmit = async (data) => {
    console.log('Login validado:', data);
    // Simula uma chamada de API
    await new Promise((resolve) => setTimeout(resolve, 600));
    navigation.replace('AppTabs');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Image
          source={require('../../assets/gotenis-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <InputField
          control={control}
          name="email"
          label="Email"
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
        />
        <InputField
          control={control}
          name="senha"
          label="Senha"
          placeholder="••••••••"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  logo: {
    width: 260,
    height: 130,
  },
  form: {
    width: '100%',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    ...typography.body,
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
