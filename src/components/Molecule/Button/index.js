import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils/colors';

export default function Button({onPress, text}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnNormalWrapper}
      accessibilityLabel="activity-add-button">
      <Text style={styles.txtcolor}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnNormalWrapper: {
    backgroundColor: colors.btn.blue,
    paddingVertical: 10,
    borderRadius: 45,
    elevation: 4,
    borderWidth: 2,
    borderColor: colors.bg.blue,
  },
  txtcolor: {
    fontFamily: 'Poppins-Bold',
    paddingHorizontal: 15,
    fontWeight: '600',
    lineHeight: 18,
    fontSize: 15,
    color: colors.text.white,
    textAlign: 'center',
  },
});
