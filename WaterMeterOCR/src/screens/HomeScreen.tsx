import React, {useMemo} from 'react';
import {SafeAreaView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import OCRResultCard from '@/components/OCRResultCard';
import NaftogazLogo from '@/components/NaftogazLogo';
import type {RootStackParamList} from '@/navigation';
import {theme} from '@/theme/colors';

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();

  const recognizedValue = useMemo(
    () => route.params?.recognizedValue ?? null,
    [route.params?.recognizedValue],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <NaftogazLogo size={120} />
          <Text style={styles.title}>Нафтогаз Україна</Text>
          <Text style={styles.subtitle}>Розпізнавання лічильника води</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.instructionsTitle}>Сканування показів</Text>
          <Text style={styles.instructionsText}>
            Сфокусуйте камеру на циферблаті лічильника, тримайте пристрій
            рівно та зробіть зображення.
          </Text>
        </View>
        <View style={styles.resultContainer}>
          <OCRResultCard
            value={recognizedValue}
            onRetry={() => navigation.navigate('Camera')}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}>
          <Text style={styles.buttonText}>Почати сканування</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    color: theme.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: theme.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 15,
    color: theme.textMuted,
    lineHeight: 22,
  },
  resultContainer: {
    width: '100%',
    marginBottom: 24,
  },
  button: {
    backgroundColor: theme.accent,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default HomeScreen;

