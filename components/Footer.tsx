import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from 'global/colors';

export const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.text}>© 2025 Kebos - Especialistas em Detecção de Gases em Espaço Confinado</Text>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    height: 70,
    width: '100%',
    backgroundColor: colors.greenDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    margin: 15,
  },
});

