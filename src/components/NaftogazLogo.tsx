import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  style?: any;
}

const NaftogazLogo: React.FC<Props> = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>NaftoGaz</Text>
        <View style={styles.line} />
        <Text style={styles.subText}>OCR</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e3a8a',
    letterSpacing: 1,
  },
  line: {
    width: 60,
    height: 3,
    backgroundColor: '#fbbf24',
    marginVertical: 8,
  },
  subText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 2,
  },
});

export default NaftogazLogo;
