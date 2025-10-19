import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {palette} from '../theme/colors';

type Props = {
  size?: number;
};

const NaftogazLogo: React.FC<Props> = ({size = 120}) => (
  <View
    style={[
      styles.container,
      {width: size, height: size, borderRadius: size / 5, paddingVertical: size / 8},
    ]}>
    <Text style={[styles.mark, {fontSize: size / 3}]}>Gaz</Text>
    <Text style={[styles.tagline, {fontSize: size / 7, marginTop: size / 20}]}>Meter OCR</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.offWhite,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: {
    fontWeight: '700',
    color: palette.charcoal,
  },
  tagline: {
    fontWeight: '500',
    color: palette.slate,
    letterSpacing: 1.5,
  },
});

export default NaftogazLogo;

