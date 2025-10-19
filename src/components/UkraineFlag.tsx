import React from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {
  style?: any;
}

const UkraineFlag: React.FC<Props> = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.flag}>
        <View style={styles.blueStripe} />
        <View style={styles.yellowStripe} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  flag: {
    width: 60,
    height: 40,
    borderRadius: 4,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  blueStripe: {
    flex: 1,
    backgroundColor: '#0057B7',
  },
  yellowStripe: {
    flex: 1,
    backgroundColor: '#FFD700',
  },
});

export default UkraineFlag;
