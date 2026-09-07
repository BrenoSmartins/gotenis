import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../components/InputField';
import { colors } from '../constants/colors';
import { spacing, typography, radius } from '../constants/theme';

// Segundo exemplo de formulário validado, com uma regra a mais:
// confirmar que "senha" e "confirmarSenha" são iguais (refine).
const cadastroSchema = z
  .object({
    nome: z.string().min(2, 'Digite seu nome completo'),
    email: z.string().min(1, 'Informe seu email').email('Email inválido'),
    senha: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

export default function CadastroScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { nome: '', email: '', senha: '', confirmarSenha: '' },
  });

  const onSubmit = async (data) => {
    console.log('Cadastro validado:', data);
    await new Promise((resolve) => setTimeout(resolve, 600));
    navigation.replace('AppTabs');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Leva menos de um minuto</Text>

      <View style={styles.form}>
        <InputField control={control} name="nome" label="Nome completo" placeholder="Seu nome" />
        <InputField
          control={control}
          name="email"
          label="Email"
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
        />
        <InputField control={control} name="senha" label="Senha" placeholder="••••••••" secureTextEntry />
        <InputField
          control={control}
          name="confirmarSenha"
          label="Confirmar senha"
          placeholder="••••••••"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          <Text style={styles.buttonText}>{isSubmitting ? 'Criando...' : 'Criar conta'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Já tenho conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
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
    marginBottom: spacing.xl,
  },
});
