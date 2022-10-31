import React from 'react';
import {View} from 'react-native';
import {colors} from '../../../utils/colors';

export default function Layout({children, padding, color}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color ? color : colors.bg.white,
        padding: padding ? padding : 0,
      }}>
      {children}
    </View>
  );
}
