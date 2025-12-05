// app/createMonthlyBudget.tsx

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createMonthlyBudget } from '@/src/services/monthly-budget';

const COLORS = {
  background: '#121212',
  cardBg: '#2A2A2D',
  textPrimary: '#FFFFFF',
  textSecondary: '#AAAAAA',
  accent: '#00C853',
  danger: '#ff3b30',
};

// Mapeamento: nome bonito em PT → valor aceito pelo backend
const MONTHS_PT_TO_EN = [
  { label: 'Janeiro', value: 'Jan' },
  { label: 'Fevereiro', value: 'Feb' },
  { label: 'Março', value: 'Mar' },
  { label: 'Abril', value: 'Apr' },
  { label: 'Maio', value: 'May' },
  { label: 'Junho', value: 'Jun' },
  { label: 'Julho', value: 'Jul' },
  { label: 'Agosto', value: 'Aug' },
  { label: 'Setembro', value: 'Sep' },
  { label: 'Outubro', value: 'Oct' },
  { label: 'Novembro', value: 'Nov' },
  { label: 'Dezembro', value: 'Dec' },
];

export default function CreateMonthlyBudgetScreen() {
  const router = useRouter();

  const currentYear = new Date().getFullYear().toString();
  const [year, setYear] = useState(currentYear);
  const [limitValue, setLimitValue] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(MONTHS_PT_TO_EN[new Date().getMonth()]);

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!limitValue || parseFloat(limitValue) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para o limite.');
      return;
    }

    setLoading(true);
    try {
      await createMonthlyBudget({
        month: selectedMonth.value,           // ← Aqui vai "Jan", "Feb", etc. (correto!)
        year: year,
        limit_value: parseFloat(limitValue.replace(/\./g, '').replace(',', '.')).toString(),
      });

      Alert.alert('Sucesso', 'Orçamento mensal criado com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      console.log('Erro ao criar orçamento:', error.response?.data || error);
      Alert.alert(
        'Erro',
        error.response?.data?.message ||
          'Não foi possível criar o orçamento. Verifique os dados e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (text: string) => {
    let value = text.replace(/\D/g, '');
    value = (Number(value) / 100).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return value;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <MaterialCommunityIcons name="arrow-left" size={28} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Novo Orçamento Mensal</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>

            {/* Seleção do Mês */}
            <Text style={styles.label}>Mês</Text>
            <View style={styles.monthGrid}>
              {MONTHS_PT_TO_EN.map((month) => (
                <TouchableOpacity
                  key={month.value}
                  style={[
                    styles.monthBtn,
                    selectedMonth.value === month.value && styles.monthBtnSelected,
                  ]}
                  onPress={() => setSelectedMonth(month)}
                >
                  <Text
                    style={[
                      styles.monthText,
                      selectedMonth.value === month.value && styles.monthTextSelected,
                    ]}
                  >
                    {month.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Ano */}
            <Text style={styles.label}>Ano</Text>
            <TextInput
              style={styles.input}
              value={year}
              onChangeText={setYear}
              keyboardType="numeric"
              placeholder="2025"
              placeholderTextColor="#666"
            />

            {/* Limite */}
            <Text style={styles.label}>Limite do mês</Text>
            <TextInput
              style={styles.input}
              value={limitValue ? `R$ ${limitValue}` : ''}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^\d]/g, '');
                setLimitValue(formatCurrency(cleaned));
              }}
              keyboardType="numeric"
              placeholder="R$ 0,00"
              placeholderTextColor="#666"
            />

            {/* Botão Criar */}
            <TouchableOpacity
              style={[styles.createBtn, loading && { opacity: 0.7 }]}
              onPress={handleCreate}
              disabled={loading}
            >
              <Text style={styles.createBtnText}>
                {loading ? 'Criando...' : 'Criar Orçamento'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  backBtn: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  form: {
    flex: 1,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  monthBtn: {
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 100,
  },
  monthBtnSelected: {
    backgroundColor: COLORS.accent,
  },
  monthText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },
  monthTextSelected: {
    color: '#000',
  },
  input: {
    backgroundColor: COLORS.cardBg,
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  createBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  createBtnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});