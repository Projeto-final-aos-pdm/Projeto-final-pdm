import React from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>Detalhes da Transação ID: {id}</Text>
    </View>
  );
}