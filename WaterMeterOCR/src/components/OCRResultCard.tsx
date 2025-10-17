import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {theme} from '../theme/colors';

type Props = {
  value: string | null;
  onRetry: () => void;
};

const OCRResultCard: React.FC<Props> = ({value, onRetry}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Розпізнане значення</Text>
      <Text style={styles.value}>{value ?? 'Поки немає даних'}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Повторити сканування</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  label: {
    color: theme.textMuted,
    fontSize: 14,
    marginBottom: 12,
  },
  value: {
    color: theme.textPrimary,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default OCRResultCard;

