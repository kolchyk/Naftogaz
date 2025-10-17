import React, {useMemo} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

  const photoUri = useMemo(
    () => route.params?.photoUri ?? null,
    [route.params?.photoUri],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brand}>Gaz OCR</Text>
          <View style={styles.closeButton}>
            <Text style={styles.closeLabel}>×</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.logoWrapper}>
            <NaftogazLogo size={80} />
          </View>
          <Text style={styles.heroTitle}>Identify Meter Reading:</Text>
          <Text style={styles.heroSubtitle}>
            Capture a clear photo of your gas meter to extract the current
            reading automatically.
          </Text>
          <View
            style={[
              styles.previewWrapper,
              photoUri ? styles.previewWrapperFilled : styles.previewWrapperEmpty,
            ]}>
            {photoUri ? (
              <Image source={{uri: photoUri}} style={styles.previewImage} />
            ) : (
              <View style={styles.previewPlaceholder}>
                <View style={styles.placeholderBadge}>
                  <Text style={styles.placeholderBadgeText}>PNG</Text>
                </View>
                <Text style={styles.previewPlaceholderText}>
                  No photo captured yet
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Camera')}>
            <Text style={styles.primaryButtonText}>Identify Meter Reading</Text>
          </TouchableOpacity>
        </View>

        <OCRResultCard value={recognizedValue} />
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
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  brand: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  closeLabel: {
    fontSize: 24,
    color: theme.textSecondary,
    marginTop: -2,
  },
  heroCard: {
    backgroundColor: theme.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.border,
    shadowColor: '#00000014',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 10},
    elevation: 6,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.textSecondary,
    marginBottom: 16,
  },
  previewWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: theme.background,
    marginBottom: 20,
    height: 220,
  },
  previewWrapperEmpty: {
    borderWidth: 1,
    borderColor: theme.border,
  },
  previewWrapperFilled: {
    borderWidth: 0,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  previewPlaceholderText: {
    fontSize: 15,
    color: theme.textMuted,
    textAlign: 'center',
    marginTop: 12,
  },
  placeholderBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },
  placeholderBadgeText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textSecondary,
    letterSpacing: 1,
  },
  primaryButton: {
    marginTop: 4,
    backgroundColor: theme.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: theme.accent,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.onAccent,
    letterSpacing: 0.3,
  },
});

export default HomeScreen;

