import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {BackButton} from '../../../assets';
import {colors} from '../../../utils/colors';

export default function Header({title, onPressBack, simple}) {
  return (
    <View style={styles.container} accessibilityLabel="header-background">
      {simple ? (
        <View style={{flexDirection: 'row', paddingLeft: 20}}>
          <Text style={styles.textTitle} accessibilityLabel="header-title">
            {title}
          </Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row', paddingLeft: 20}}>
          <TouchableOpacity
            onPress={onPressBack}
            accessibilityLabel="todo-back-button">
            <BackButton height={28} width={28} />
          </TouchableOpacity>
          <Text style={styles.textTitle} accessibilityLabel="header-title">
            {title}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: colors.bg.blue,

    height: 64,
  },
  textTitle: {
    fontSize: 20,

    fontFamily: 'Poppins',
    color: colors.text.white,
    marginLeft: 11,
  },
});
