import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../../utils/colors';
import {TitleEditButton, DeleteButton} from '../../../assets';
import APIKit from '../../../utils/axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default function ListCard({
  setTargetName,
  setTargetId,
  data,
  setPopUpDeleteList,
}) {
  const [list, setList] = useState(data);

  async function updateData() {
    const dataForm = {
      title: list.title,
      is_active: list.is_active == 0 ? 1 : 0,
      priority: list.priority,
    };
    await APIKit.patch(`/todo-items/${data.id}`, dataForm).then(res =>
      setList(res.data),
    );
  }
  return (
    <View style={styles.container} accessibilityLabel="todo-item">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 15,
          marginVertical: 10,
        }}>
        <CheckBox
          disabled={false}
          tintColors={{true: colors.bg.blue1}}
          value={list.is_active == 1 ? false : true}
          onValueChange={newValue => {
            updateData();
          }}
          accessibilityLabel="todo-item-checkbox"
        />
        <View
          style={styles.status(list.priority)}
          accessibilityLabel="todo-item-priority-indicator"
        />
        <Text
          style={styles.title(list.is_active)}
          accessibilityLabel="todo-item-title">
          {list.title}
        </Text>
        <TitleEditButton
          height={15}
          width={15}
          accessibilityLabel="todo-item-edit-button"
        />
      </View>
      <TouchableOpacity
        style={{marginHorizontal: 20}}
        onPress={() => {
          setTargetId(data.id);
          setTargetName(data.title);
          setPopUpDeleteList(true);
        }}
        accessibilityLabel="todo-item-delete-button">
        <DeleteButton height={20} width={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: colors.bg.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  title: value => ({
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    textDecorationLine: value == 0 ? 'line-through' : '',
    textDecorationStyle: value == 0 ? 'solid' : '',
    color: value == 0 ? colors.text.grey : colors.text.black,
  }),
  status: priority => ({
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginHorizontal: 20,
    backgroundColor:
      priority === 'very-high'
        ? colors.bg.redstatus
        : priority === 'high'
        ? colors.bg.orange
        : priority === 'medium'
        ? colors.bg.green
        : priority === 'low'
        ? colors.bg.blue1
        : priority === 'very-low'
        ? colors.bg.purple
        : colors.bg.yellow,
  }),
});
