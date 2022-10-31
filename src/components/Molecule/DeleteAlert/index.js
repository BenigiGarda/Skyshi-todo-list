import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {InformationIcon} from '../../../assets';

import {colors} from '../../../utils/colors';

export default function DeleteAlert({targetType, setPopUpDeleteAlert}) {
  return (
    <View style={styles.containerPopUp}>
      <Modal animationType="slide" transparent={true}>
        <TouchableOpacity onPress={() => setPopUpDeleteAlert(false)}>
          <SafeAreaView
            style={styles.wrapContentPopUp}
            accessibilityLabel="modal-information">
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 37,
                marginVertical: 20,
                alignItems: 'center',
              }}>
              <InformationIcon
                height={26}
                width={26}
                accessibilityLabel="modal-information-icon"
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  paddingLeft: 15,
                  color: colors.text.black1,
                }}
                accessibilityLabel="modal-information-title">
                {targetType} berhasil dihapus
              </Text>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPopUp: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  wrapContentPopUp: {
    alignSelf: 'center',
    backgroundColor: colors.bg.white,
    borderRadius: 14,
    elevation: 10,
    marginVertical: '80%',
    width: '80%',
  },
  titlePopUp: {
    fontWeight: '600',
    fontSize: 18,
    color: colors.text.black,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  inputForm: {
    fontSize: 14,
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.border.grey,
  },
});
