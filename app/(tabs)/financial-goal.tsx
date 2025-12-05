import { deleteFinancialGoal, getAllFinancialGoal } from '@/src/services/financial-goal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  background: '#121212',
  cardBg: '#2A2A2D',
  textPrimary: '#FFFFFF',
  textSecondary: '#AAAAAA',
  accent: '#00C853',
};

export default function FinancialGoalScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadGoals = async () => {
    try {
      const result = await getAllFinancialGoal();

      const formatted = result.data.map((g: any) => ({
        id: g.id,
        title: g.description ?? "Meta",
        description: g.description ?? "",
        target: Number(g.target_value),
        current: Number(g.current_value),
        deadline: new Date(g.deadline).toLocaleDateString('pt-BR'),
      }));

      setGoals(formatted);
    } catch (error) {
      console.log("Erro ao carregar metas:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadGoals();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFinancialGoal(id);
      loadGoals();
    } catch (err) {
      console.log("Erro ao deletar:", err);
    }
  };

  const formatMoney = (value: number) =>
    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

  const renderGoal: ListRenderItem<any> = ({ item }) => {
    const progress = item.current > 0 ? (item.current / item.target) * 100 : 0;
    const isCompleted = item.current >= item.target;

    return (
      <View style={styles.card}>
        {/* ... seu card atual permanece igual ... */}
        {/* (mantive todo o conteúdo original) */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push(`/financial-goal/${item.id}`)}
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

          {isCompleted && (
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color={COLORS.accent}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.pageTitle}>Minhas Metas Financeiras</Text>

        <FlatList
          data={goals}
          renderItem={renderGoal}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
            />
          }
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !loading ? (
              <Text style={{ color: '#888', textAlign: 'center', marginTop: 50 }}>
                Nenhuma meta encontrada
              </Text>
            ) : null
          }
        />

        {/* ==== BOTÃO FLUTUANTE VERDE ==== */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/createFinancialGoal')}
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
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  editBtn: {
    backgroundColor: COLORS.accent,
    padding: 8,
    borderRadius: 10,
  },
  deleteBtn: {
    backgroundColor: "#ff3b30",
    padding: 8,
    borderRadius: 10,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  amounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: { color: COLORS.textSecondary, fontSize: 12 },
  current: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: "bold",
  },
  target: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: "bold",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  progressBg: {
    flex: 1,
    height: 10,
    backgroundColor: "#3E3E42",
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 10,
  },
  progressFill: { height: "100%", borderRadius: 5 },
  percent: { color: COLORS.textPrimary, fontWeight: "bold" },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deadline: {
    color: COLORS.textSecondary,
    fontSize: 13,
    flex: 1,
    marginLeft: 6,
  },

  // ESTILO DO BOTÃO FLUTUANTE
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: COLORS.accent,   // verde da sua paleta
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