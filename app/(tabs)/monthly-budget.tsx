// app/monthly-budget/index.tsx

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    ListRenderItem,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { deleteMonthlyBudget, getAllMonthlyBudgets } from '@/src/services/monthly-budget';

const COLORS = {
  background: '#121212',
  cardBg: '#2A2A2D',
  textPrimary: '#FFFFFF',
  textSecondary: '#AAAAAA',
  accent: '#00C853',
};

interface Budget {
  id: string;
  month: string;
  year: string;
  limit: number;
  spent: number;
}

export default function MonthlyBudgetScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBudgets = async () => {
    try {
      const result = await getAllMonthlyBudgets();
      console.log('Resposta do backend:', result);

      let rawArray: any[] = [];

      if (Array.isArray(result)) {
        rawArray = result;
      } else if (result?.data && Array.isArray(result.data)) {
        rawArray = result.data;
      } else if (result?.monthlyBudgets && Array.isArray(result.monthlyBudgets)) {
        rawArray = result.monthlyBudgets;
      } else {
        console.log('Formato de resposta inesperado:', result);
        setBudgets([]);
        return;
      }

      const formatted: Budget[] = rawArray.map((b: any) => ({
        id: b.id,
        month: b.month || 'Jan',
        year: b.year || new Date().getFullYear().toString(),
        limit: Number(b.limit_value || b.limit || 0),
        spent: Number(b.spent_value || b.spent || 0),
      }));

      // Ordenar do mais recente pro mais antigo
      formatted.sort((a, b) => {
        if (a.year !== b.year) return Number(b.year) - Number(a.year);
        const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
        return months.indexOf(b.month) - months.indexOf(a.month);
      });

      setBudgets(formatted);
    } catch (error: any) {
      console.log('Erro ao carregar orçamentos:', error.response?.data || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadBudgets();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMonthlyBudget(id);
      loadBudgets();
    } catch (err) {
      console.log('Erro ao deletar:', err);
    }
  };

  const formatMoney = (value: number) =>
    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

  const renderBudget: ListRenderItem<Budget> = ({ item }) => {
    const progress = item.limit > 0 ? (item.spent / item.limit) * 100 : 0;
    const isOverBudget = item.spent > item.limit;

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {item.month} / {item.year}
            </Text>
            <Text style={styles.description}>Orçamento mensal</Text>
          </View>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push(`/monthly-budget/${item.id}`)}
          >
            <MaterialCommunityIcons name="pencil" size={22} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleDelete(item.id)}
          >
            <MaterialCommunityIcons name="trash-can" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.amounts}>
          <View>
            <Text style={styles.label}>Gasto</Text>
            <Text style={[styles.current, isOverBudget && { color: '#ff3b30' }]}>
              {formatMoney(item.spent)}
            </Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.label}>Limite</Text>
            <Text style={styles.target}>{formatMoney(item.limit)}</Text>
          </View>
        </View>

        {/* BARRA DE PROGRESSO CORRIGIDA */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(progress, 100)}%`,
                  backgroundColor: isOverBudget ? '#ff3b30' : COLORS.accent,
                },
              ]}
            />
          </View>
          <Text style={[styles.percent, isOverBudget && { color: '#ff3b30' }]}>
            {progress.toFixed(0)}%
          </Text>
        </View>

        {/* Aviso se estourou o orçamento */}
        {isOverBudget && (
          <View style={styles.warning}>
            <MaterialCommunityIcons name="alert" size={18} color="#ff3b30" />
            <Text style={{ color: '#ff3b30', marginLeft: 6, fontSize: 13 }}>
              Orçamento ultrapassado!
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.pageTitle}>Orçamentos Mensais</Text>

        <FlatList
          data={budgets}
          renderItem={renderBudget}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
          }
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !loading ? (
              <Text style={{ color: '#888', textAlign: 'center', marginTop: 50 }}>
                Nenhum orçamento cadastrado
              </Text>
            ) : null
          }
        />

        {/* BOTÃO + FLUTUANTE */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/createMonthlyBudget')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="plus" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  editBtn: {
    backgroundColor: COLORS.accent,
    padding: 8,
    borderRadius: 10,
  },
  deleteBtn: {
    backgroundColor: '#ff3b30',
    padding: 8,
    borderRadius: 10,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  amounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: { color: COLORS.textSecondary, fontSize: 12 },
  current: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  target: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#3E3E42',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  percent: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: COLORS.accent,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});