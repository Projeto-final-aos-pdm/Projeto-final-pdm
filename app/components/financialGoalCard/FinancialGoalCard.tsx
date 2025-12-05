// app/financial-goal.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import {
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// CORES DO SEU APP (ajuste se precisar)
const COLORS = {
  background: '#121212',
  cardBg: '#2A2A2D',
  textPrimary: '#FFFFFF',
  textSecondary: '#AAAAAA',
  accent: '#00C853',
};

// DADOS FIXOS (só pra testar – depois você troca por estado real)
const GOALS = [
  {
    id: '1',
    title: 'Carro Novo',
    description: 'Honda Civic 2025 zero km',
    target: 30000,
    current: 18500,
    deadline: '15 Jul 2026',
  },
  {
    id: '2',
    title: 'Viagem Japão',
    description: 'Tokyo + Kyoto em 2026',
    target: 8000,
    current: 3200,
    deadline: '01 Mar 2026',
  },
  {
    id: '3',
    title: 'Fundo de Emergência',
    description: '6 meses de despesas',
    target: 15000,
    current: 15000,
    deadline: 'Concluído',
  },
];

export default function FinancialGoalScreen() {
  const insets = useSafeAreaInsets();

  const formatMoney = (value: number) =>
    `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  const renderGoal: ListRenderItem<(typeof GOALS)[0]> = ({ item }) => {
    const progress = item.target > 0 ? (item.current / item.target) * 100 : 0;
    const isCompleted = item.current >= item.target;

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name={item.title.includes('Carro') ? 'car' : item.title.includes('Viagem') ? 'airplane' : 'shield-check'}
            size={32}
            color={isCompleted ? COLORS.accent : '#888'}
          />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>

        <View style={styles.amounts}>
          <View>
            <Text style={styles.label}>Atual</Text>
            <Text style={styles.current}>{formatMoney(item.current)}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.label}>Meta</Text>
            <Text style={styles.target}>{formatMoney(item.target)}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(progress, 100)}%`,
                  backgroundColor: isCompleted ? COLORS.accent : '#555',
                },
              ]}
            />
          </View>
          <Text style={styles.percent}>{progress.toFixed(0)}%</Text>
        </View>

        <View style={styles.footer}>
          <MaterialCommunityIcons name="calendar-clock" size={16} color="#888" />
          <Text style={styles.deadline}>
            {isCompleted ? 'Concluída' : item.deadline}
          </Text>
          {isCompleted && <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.accent} />}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.pageTitle}>Minhas Metas Financeiras</Text>

        {/* DEBUG: mostra quantos itens tem */}
        <Text style={{ color: '#0F0', marginBottom: 10 }}>
          {GOALS.length} meta(s) carregada(s)
        </Text>

        <FlatList
          data={GOALS}
          renderItem={renderGoal}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ color: '#888', textAlign: 'center', marginTop: 50 }}>
              Nenhuma meta encontrada
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#AAA',
    fontSize: 13,
    marginTop: 4,
  },
  amounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    color: '#888',
    fontSize: 12,
  },
  current: {
    color: '#FFF',
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
    color: '#FFF',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deadline: {
    color: '#AAA',
    fontSize: 13,
    marginLeft: 6,
    flex: 1,
  },
});