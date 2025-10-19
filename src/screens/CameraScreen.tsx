import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {StackNavigationProp} from '@react-navigation/stack';
import ResultModal from '../components/ResultModal';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
};

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

interface Props {
  navigation: CameraScreenNavigationProp;
}

const CameraScreen: React.FC<Props> = ({navigation}) => {
  const [isActive, setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [ocrResult, setOcrResult] = useState('');
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const takePhoto = async () => {
    try {
      if (camera.current) {
        const photo = await camera.current.takePhoto({
          qualityPrioritization: 'speed',
          flash: 'off',
        });
        
        // Здесь должна быть логика OCR обработки
        // Пока что показываем заглушку
        setOcrResult('Текст розпізнано успішно!\n\nПриклад розпізнаного тексту...');
        setShowModal(true);
      }
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося зробити знімок');
    }
  };

  if (device == null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Камера недоступна</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Повернутися</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={isActive}
        photo={true}
      />
      
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>

      <ResultModal
        visible={showModal}
        result={ocrResult}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
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
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#1e3a8a',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1e3a8a',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraScreen;
