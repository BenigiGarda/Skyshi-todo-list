import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {ChevronDown, ChevronUp, TablerCheck} from '../../../assets';
import {colors} from '../../../utils/colors';

export default function InputDropDown({
  onPress,
  title,
  show,
  onPressItem,
  placeholder,
  value,
}) {
  const content = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={styles.inputForm(show)}
        accessibilityLabel="modal-add-priority-dropdown">
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {value ? (
            <View
              style={styles.status(value)}
              accessibilityLabel="Ellipse 444"
            />
          ) : null}
          <TextInput
            style={styles.inputText}
            placeholder={placeholder}
            placeholderTextColor={colors.text.grey}
            value={value}
            editable={false}
            accessibilityLabel="Very High"
          />
        </View>
        {show ? (
          <ChevronDown
            height={30}
            width={30}
            accessibilityLabel="tabler:chevron-down"
          />
        ) : (
          <ChevronUp
            height={30}
            width={30}
            accessibilityLabel="tabler:chevron-down"
          />
        )}
      </TouchableOpacity>
      {show && (
        <View style={styles.wrapperItem}>
          <ScrollView nestedScrollEnabled={true}>
            {content.map(item => {
              return (
                <TouchableOpacity
                  key={item}
                  style={styles.containerDropDown}
                  onPress={() => onPressItem(item)}
                  accessibilityLabel="modal-add-priority">
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 15,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.status(item)} />
                      <Text style={styles.textDropDown}>{item}</Text>
                    </View>
                    {value === item ? (
                      <TablerCheck height={30} width={30} />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleInput: {
    fontFamily: 'Poppins-Regular',
    color: colors.text.blue,
    fontSize: 14,
    paddingBottom: 10,
  },
  inputForm: show => ({
    borderRadius: 5,
    backgroundColor: show ? colors.bg.grey : colors.bg.white,
    borderColor: colors.border.grey,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  inputFormDisabled: {
    borderRadius: 10,
    borderColor: colors.border.grey,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text.black,
    padding: 5,
  },
  iconDropDown: {
    flex: 1,
    alignItems: 'flex-end',
  },
  wrapperItem: {
    position: 'absolute',
    width: '100%',
    marginTop: 37,
    height: 300,
    zIndex: 10,
  },

  containerDropDown: {
    backgroundColor: colors.bg.white,
    borderBottomWidth: 2,
    borderColor: colors.border.grey,
  },
  textDropDown: {
    fontWeight: '400',
    color: colors.text.grey,
    fontSize: 16,
  },
  status: priority => ({
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginHorizontal: 20,
    backgroundColor:
      priority === 'Very High'
        ? colors.bg.redstatus
        : priority === 'High'
        ? colors.bg.orange
        : priority === 'Medium'
        ? colors.bg.green
        : priority === 'Low'
        ? colors.bg.blue1
        : priority === 'Very Low'
        ? colors.bg.purple
        : colors.bg.yellow,
  }),
});
