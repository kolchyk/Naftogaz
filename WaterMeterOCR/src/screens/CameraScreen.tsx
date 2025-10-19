import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Camera,
  type CameraCaptureError,
  type PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import TextRecognition from '@react-native-ml-kit/text-recognition';

import {theme} from '../theme/colors';
import type {RootStackParamList} from '../navigation';

const parseReading = (text: string) => {
  // Извлекаем все цифры из текста
  const digits = text.replace(/\D/g, '');
  
  // Ищем последовательность из 6 цифр
  if (digits.length >= 6) {
    // Берем первые 6 цифр
    return digits.substring(0, 6);
  }
  
  // Если цифр меньше 6, но есть хотя бы 3, попробуем найти наиболее вероятную последовательность
  if (digits.length >= 3) {
    // Ищем группы цифр, которые могут быть показаниями счетчика
    const groups = text.match(/\d{3,6}/g);
    if (groups && groups.length > 0) {
      // Берем самую длинную группу и обрезаем до 6 цифр
      const longestGroup = groups.reduce((a, b) => a.length > b.length ? a : b);
      return longestGroup.substring(0, 6);
    }
  }
  
  return null;
};

const CameraScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Camera'>>();
  const cameraRef = useRef<Camera | null>(null);
  const isFocused = useIsFocused();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    const ensurePermission = async () => {
      try {
        const granted = hasPermission || (await requestPermission());
        if (!granted) {
          Alert.alert(
            'Немає доступу до камери',
            'Дозвольте використання камери в налаштуваннях пристрою.',
          );
        }
      } catch (error) {
        console.warn('Permission error', error);
      }
    };

    ensurePermission();
  }, [hasPermission, requestPermission]);

  // Сброс состояния готовности камеры при потере фокуса
  useEffect(() => {
    if (!isFocused) {
      setIsCameraReady(false);
    }
  }, [isFocused]);

  const handlePicture = useCallback(async () => {
    if (!cameraRef.current || isProcessing) {
      return;
    }

    // Дополнительная проверка разрешений перед съемкой
    if (!hasPermission) {
      // Попытка повторно запросить разрешения
      try {
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            'Немає доступу до камери',
            'Дозвольте використання камери в налаштуваннях пристрою.',
            [
              {
                text: 'Налаштування',
                onPress: () => {
                  try {
                    Linking.openSettings();
                  } catch (e) {
                    console.warn('Cannot open settings:', e);
                  }
                },
              },
              {text: 'OK', style: 'default'},
            ],
          );
          return;
        }
      } catch (error) {
        console.warn('Permission request failed:', error);
        Alert.alert(
          'Помилка',
          'Не вдалося отримати доступ до камери.',
        );
        return;
      }
    }

    // Проверяем, что камера активна и готова к съемке
    if (!isFocused || !device || !isCameraReady) {
      Alert.alert('Помилка', 'Камера не готова до використання.');
      return;
    }

    // Дополнительная проверка состояния камеры
    if (!cameraRef.current) {
      Alert.alert('Помилка', 'Камера не ініціалізована.');
      return;
    }

    setIsProcessing(true);
    try {
      // Добавляем задержку для стабилизации камеры
      await new Promise<void>(resolve => setTimeout(resolve, 200));
      
      // Проверяем, что камера все еще активна после задержки
      if (!isFocused || !device) {
        throw new Error('Камера стала неактивною під час підготовки');
      }

      const photo: PhotoFile | undefined = await cameraRef.current.takePhoto({
        flash: device.hasFlash ? 'auto' : 'off',
        enableShutterSound: true,
      });

      if (!photo?.path) {
        throw new Error('Не вдалося зробити знімок');
      }

      const photoUri = Platform.select({
        android: `file://${photo.path}`,
        ios: photo.path,
        default: photo.path,
      });

      // Проверка что ML Kit доступна
      if (!TextRecognition || typeof TextRecognition.recognize !== 'function') {
        throw new Error('ML Kit TextRecognition is not available on this device');
      }

      const result = await TextRecognition.recognize(photoUri);
      const reading = parseReading(result.text);

      if (!reading) {
        Alert.alert(
          'Не вдалося розпізнати',
          'Не вдалося знайти 6 цифр на зображенні. Спробуйте знову, переконавшись, що цифри добре освітлені та чітко видимі.',
        );
        return;
      }

      navigation.navigate('Home', {
        recognizedValue: reading,
        photoUri,
      });
    } catch (error) {
      console.error('Failed to process image', error);
      const errorMessage = (error as CameraCaptureError | Error)?.message || 'Unknown error';
      
      // Специальная обработка для разных типов ошибок
      if (errorMessage.includes('Camera is closed') || errorMessage.includes('camera is closed')) {
        Alert.alert(
          'Помилка камери',
          'Камера була закрита під час зйомки. Спробуйте ще раз.',
        );
      } else if (errorMessage.includes('Failed to submit capture request') || errorMessage.includes('capture request')) {
        Alert.alert(
          'Помилка зйомки',
          'Не вдалося відправити запит на зйомку. Переконайтесь, що камера не використовується іншим додатком.',
        );
      } else if (errorMessage.includes('ML Kit') || errorMessage.includes('not available')) {
        Alert.alert(
          'Помилка',
          'ML Kit текст-розпізнавання недоступна на цьому пристрої. Переконайтесь, що встановлені Google Play Services.',
        );
      } else if (errorMessage.includes('Camera') || errorMessage.includes('permission') || errorMessage.includes('Permission')) {
        Alert.alert(
          'Помилка камери',
          'Не вдалося отримати доступ до камери. Перевірте дозволи в налаштуваннях пристрою.',
          [
            {
              text: 'Налаштування',
              onPress: () => {
                // Открыть настройки приложения
                try {
                  Linking.openSettings();
                } catch (e) {
                  console.warn('Cannot open settings:', e);
                }
              },
            },
            {text: 'OK', style: 'default'},
          ],
        );
      } else {
        Alert.alert('Помилка', `Не вдалося обробити зображення: ${errorMessage}`);
      }
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, navigation, hasPermission, requestPermission, isFocused, device, isCameraReady]);

  const overlay = useMemo(
    () => (
      <View style={styles.overlayContainer}>
        <Text style={styles.overlayTitle}>Наведіть камеру на лічильник</Text>
        <Text style={styles.overlayHint}>
          Центруйте цифрове табло всередині рамки для кращого результату.
        </Text>
        <View style={styles.focusFrame} />
        <TouchableOpacity
          style={[styles.captureButton, isProcessing && styles.buttonDisabled]}
          onPress={handlePicture}
          disabled={isProcessing}>
          <Text style={styles.captureText}>
            {isProcessing ? 'Обробка...' : 'Зробити знімок'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            console.log('Cancel button pressed');
            navigation.goBack();
          }}>
          <Text style={styles.cancelText}>Скасувати</Text>
        </TouchableOpacity>
      </View>
    ),
    [handlePicture, isProcessing, navigation],
  );

  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.deniedText}>Доступ до камери відсутній.</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.centered}>
        <Text style={styles.deniedText}>Завантаження камери...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={isFocused && hasPermission && !isProcessing}
        photo
        enableZoomGesture={true}
        enablePortraitEffectsMatteDelivery={false}
        onError={(error) => {
          console.error('Camera error:', error);
          Alert.alert('Помилка камери', 'Сталася помилка з камерою. Спробуйте перезапустити додаток.');
        }}
        onInitialized={() => {
          console.log('Camera initialized successfully');
          setIsCameraReady(true);
        }}
      />
      {overlay}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(31, 42, 55, 0.92)',
  },
  overlayTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  overlayHint: {
    color: '#dbe3f4',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  focusFrame: {
    height: 180,
    borderWidth: 2,
    borderColor: theme.accent,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  captureButton: {
    backgroundColor: theme.accent,
    borderRadius: 28,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 42,
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  captureText: {
    color: theme.onAccent,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.background,
    padding: 24,
  },
  deniedText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CameraScreen;

