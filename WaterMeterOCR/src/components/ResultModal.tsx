import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import {theme} from '../theme/colors';

type Props = {
  visible: boolean;
  value: string | null;
  photoUri: string | null;
  onClose: () => void;
};

const ResultModal: React.FC<Props> = ({visible, value, photoUri, onClose}) => {
  const hasValue = Boolean(value);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Результат розпізнавання</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          {photoUri && (
            <View style={styles.photoContainer}>
              <Image source={{uri: photoUri}} style={styles.photo} />
            </View>
          )}

          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Розпізнані показники:</Text>
            <View style={styles.valueContainer}>
              <Text style={[styles.value, !hasValue && styles.placeholderValue]}>
                {hasValue ? value : 'Не розпізнано'}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.description}>
              {hasValue
                ? `Газовий лічильник показує: ${value}`
                : 'Не вдалося розпізнати 6 цифр на зображенні'}
            </Text>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: theme.surface,
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  closeText: {
    fontSize: 20,
    color: theme.textSecondary,
    marginTop: -2,
  },
  photoContainer: {
    margin: 24,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.border,
  },
  photo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  resultContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textSecondary,
    marginBottom: 12,
  },
  valueContainer: {
    backgroundColor: theme.background,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.accent,
    paddingVertical: 20,
    alignItems: 'center',
  },
  value: {
    fontSize: 42,
    fontWeight: '700',
    color: theme.textPrimary,
    letterSpacing: 6,
  },
  placeholderValue: {
    color: theme.textMuted,
    fontSize: 18,
  },
  footer: {
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.onAccent,
  },
});

export default ResultModal;
