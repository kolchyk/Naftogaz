import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RNCamera, type TakePictureResponse} from 'react-native-camera';
import TextRecognition from '@react-native-ml-kit/text-recognition';

import type {RootStackParamList} from '../navigation';

const requestPermissions = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.warn('Permission error', error);
    return false;
  }
};

const parseReading = (text: string) => {
  const match = text.match(/\d+/g);
  if (!match) {
    return null;
  }
  const numbers = match.map(item => item.trim()).join('');
  return numbers.length > 0 ? numbers : null;
};

const CameraScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Camera'>>();
  const cameraRef = useRef<RNCamera | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestPermissions().then(granted => {
      setHasPermission(granted);
      if (!granted) {
        Alert.alert(
          'Немає доступу до камери',
          'Дозвольте використання камери в налаштуваннях пристрою.',
        );
      }
    });
  }, []);

  const handlePicture = useCallback(async () => {
    if (!cameraRef.current || isProcessing) {
      return;
    }

    setIsProcessing(true);
    try {
      const photo: TakePictureResponse = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      const result = await TextRecognition.recognize(photo.uri);
      const reading = parseReading(result.text);

      if (!reading) {
        Alert.alert(
          'Не вдалося розпізнати',
          'Спробуйте знову, переконавшись, що цифри добре освітлені.',
        );
        return;
      }

      navigation.navigate('Home', {
        recognizedValue: reading,
      });
    } catch (error) {
      console.error('Failed to process image', error);
      Alert.alert('Помилка', 'Не вдалося обробити зображення.');
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, navigation]);

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
          onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Скасувати</Text>
        </TouchableOpacity>
      </View>
    ),
    [handlePicture, isProcessing, navigation],
  );

  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.deniedText}>Очікування дозволу камери...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          cameraRef.current = ref;
        }}
        style={styles.camera}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: 'Доступ до камери',
          message:
            'Додаток використовує камеру для зчитування показів лічильника',
          buttonPositive: 'Дозволити',
          buttonNegative: 'Відмовитися',
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
    backgroundColor: '#051c43CC',
  },
  overlayTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  overlayHint: {
    color: '#d0e5f7',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  focusFrame: {
    height: 180,
    borderWidth: 2,
    borderColor: '#00a0df',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  captureButton: {
    backgroundColor: '#00a0df',
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
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    alignSelf: 'center',
  },
  cancelText: {
    color: '#7ab8e1',
    fontSize: 15,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#051c43',
    padding: 24,
  },
  deniedText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CameraScreen;

