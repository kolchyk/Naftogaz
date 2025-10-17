import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {theme} from '@/theme/colors';

type Props = {
  value: string | null;
};

const OCRResultCard: React.FC<Props> = ({value}) => {
  const hasValue = Boolean(value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Result</Text>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, !hasValue && styles.placeholderValue]}>
          {hasValue ? value : 'No reading yet'}
        </Text>
      </View>
      <Text style={styles.caption}>
        {hasValue
          ? 'Meter reading successfully detected.'
          : 'Scan your gas meter to extract the digits.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 24,
    width: '100%',
    shadowColor: '#00000014',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    elevation: 4,
  },
  label: {
    color: theme.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  valueContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.background,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  value: {
    color: theme.textPrimary,
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 4,
  },
  placeholderValue: {
    color: theme.textMuted,
  },
  caption: {
    color: theme.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default OCRResultCard;

