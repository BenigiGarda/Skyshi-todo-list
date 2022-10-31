import React, {useState} from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {DeleteSign} from '../../../assets';
import APIKit from '../../../utils/axios';

import {colors} from '../../../utils/colors';
import Button from '../Button';
import InputDropDown from '../InputDropDown';

export default function PopUpDeleteActivityOrList({
  targetId,
  setPopUp,
  setPopUpDeleteAlert,
  targetType,
  targetName,
  setLoading,
}) {
  async function deleteActivity() {
    if (targetType == 'Activity') {
      await APIKit.delete(`/activity-groups/${targetId}`).then(() =>
        setLoading(true),
      );
    } else {
      await APIKit.delete(`/todo-items/${targetId}`).then(() =>
        setLoading(true),
      );
    }

    setPopUpDeleteAlert(true);
    setPopUp(false);
  }
  return (
    <View style={styles.containerPopUp}>
      <Modal animationType="slide" transparent={true}>
        <SafeAreaView
          style={styles.wrapContentPopUp}
          accessibilityLabel="modal-add">
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 40,
            }}>
            <View style={{paddingTop: 30}}></View>
            <DeleteSign
              width={64}
              height={64}
              accessibilityLabel="modal-delete-icon"
            />
            {targetType === 'Activity' ? (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 23,
                  textAlign: 'center',
                  paddingTop: 30,
                }}
                accessibilityLabel="modal-delete-title">
                Apakah anda yakin menghapus activity{' '}
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    lineHeight: 23,
                    textAlign: 'center',
                  }}>
                  "{targetName}"?
                </Text>
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 23,
                  textAlign: 'center',
                }}>
                Apakah anda yakin menghapus List Item{' '}
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    lineHeight: 23,
                    textAlign: 'center',
                  }}>
                  "{targetName}"?
                </Text>
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 35,
              marginHorizontal: 40,
            }}>
            <TouchableOpacity
              onPress={() => setPopUp(false)}
              style={{borderRadius: 45, backgroundColor: colors.bg.grey}}
              accessibilityLabel="modal-add-save-button">
              <Text
                style={{
                  paddingHorizontal: 35,
                  paddingVertical: 15,
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.text.grey,
                }}>
                Batal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                deleteActivity();
              }}
              style={{borderRadius: 45, backgroundColor: colors.bg.redstatus}}
              accessibilityLabel="modal-add-save-button">
              <Text
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 15,
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.text.white,
                }}>
                Hapus
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
    borderRadius: 12,
    elevation: 10,
    marginVertical: '50%',
    width: '80%',
    paddingBottom: 10,
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
