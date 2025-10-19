import React from 'react';
import {View, StyleSheet} from 'react-native';

type Props = {
  size?: number;
};

const UkraineFlag: React.FC<Props> = ({size = 32}) => {
  const flagHeight = size;
  const flagWidth = size * 1.5; // Соотношение сторон флага Украины 3:2

  return (
    <View style={[styles.container, {width: flagWidth, height: flagHeight}]}>
      {/* Верхняя полоса - синяя */}
      <View style={[styles.stripe, styles.blueStripe]} />
      {/* Нижняя полоса - желтая */}
      <View style={[styles.stripe, styles.yellowStripe]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  stripe: {
    flex: 1,
  },
  blueStripe: {
    backgroundColor: '#0057B7', // Синий цвет флага Украины
  },
  yellowStripe: {
    backgroundColor: '#FFD700', // Желтый цвет флага Украины
  },
});

export default UkraineFlag;
