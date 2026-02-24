import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ESN Mobile</Text>
      <Text style={styles.subtitle}>Your tool for reporting environmental hazards</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d'
  }
});