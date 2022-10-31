import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import APIKit from '../../../utils/axios';

import {colors} from '../../../utils/colors';
import InputDropDown from '../InputDropDown';

export default function PopUpCreateList({
  setLoading,
  onPressClose,
  ActivityId,
  setPopUp,
}) {
  const [show, setShow] = useState(false);
  const [valueTextInput, setValueTextInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  async function createList() {
    const dataForm = {
      activity_group_id: ActivityId,
      title: valueTextInput,
      priority:
        selectedStatus == 'Very High'
          ? 'very-high'
          : selectedStatus == 'High'
          ? 'high'
          : selectedStatus == 'Medium'
          ? 'medium'
          : selectedStatus == 'Low'
          ? 'low'
          : selectedStatus == 'Very Low'
          ? 'low'
          : 'very-high',
    };
    await APIKit.post('/todo-items', dataForm).then(res => {
      console.log(res);
    });
  }
  return (
    <View style={styles.containerPopUp}>
      <Modal animationType="slide" transparent={true}>
        <SafeAreaView
          style={styles.wrapContentPopUp}
          accessibilityLabel="modal-add">
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: colors.bg.grey,
            }}>
            <View style={styles.header}>
              <Text
                style={styles.titlePopUp}
                accessibilityLabel="modal-add-title">
                Tambah List Item
              </Text>
              <TouchableOpacity onPress={onPressClose} style={styles.iconClose}>
                <Text
                  style={{color: colors.text.grey, fontSize: 18}}
                  accessibilityLabel="modal-add-close-button">
                  X
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginHorizontal: 25}}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 17,
                  fontWeight: '600',
                  color: colors.text.black,
                  marginVertical: 15,
                }}>
                NAMA LIST ITEM
              </Text>

              <TextInput
                maxLength={60}
                style={styles.inputForm}
                value={valueTextInput}
                onChangeText={value => setValueTextInput(value)}
                name="Tambahkan nama list item"
                defaultValue="Tambahkan nama list item"
                accessibilityLabel="modal-add-name-input"
              />
            </View>

            <View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 17,
                  fontWeight: '600',
                  color: colors.text.black,
                  marginVertical: 15,
                }}>
                PRIORITY
              </Text>

              <InputDropDown
                placeholder={'Pilih Priority'}
                value={selectedStatus}
                show={show}
                onPress={() => setShow(!show)}
                onPressItem={item => {
                  setShow(false);
                  setSelectedStatus(item);
                }}
              />
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 2,
              borderTopColor: colors.bg.grey,
              marginTop: 20,
            }}>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => {
                  createList();
                  setPopUp(false);
                  setLoading(true);
                }}
                style={{borderRadius: 45, backgroundColor: colors.bg.blue}}
                accessibilityLabel="modal-add-save-button">
                <Text
                  style={{
                    paddingHorizontal: 35,
                    paddingVertical: 15,
                    fontSize: 18,
                    fontWeight: '600',
                    color: colors.text.white,
                  }}>
                  Simpan
                </Text>
              </TouchableOpacity>
            </View>
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
