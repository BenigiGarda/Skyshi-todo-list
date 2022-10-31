import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SortSelectionNewest,
  SortSelectionOldest,
  SortSelectionIconAZ,
  SortSelectionIconZA,
  SortSelectionComplete,
  TablerCheck,
} from '../../../assets';

import {colors} from '../../../utils/colors';

export default function PopUpSortTools({
  selectedSortType,
  setPopUpSortTools,
  currentSelected,
}) {
  const content = ['Terbaru', 'Terlama', 'A-Z', 'Z-A', 'Belum Selesai'];
  return (
    <View style={styles.containerPopUp}>
      <Modal animationType="slide" transparent={true}>
        <TouchableOpacity onPress={() => setPopUpSortTools(false)}>
          <SafeAreaView style={styles.wrapContentPopUp}>
            {content.map((data, key) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setPopUpSortTools(false), selectedSortType(data);
                  }}
                  style={{
                    paddingVertical: 20,
                    borderBottomWidth: data === 'Belum Selesai' ? 0 : 1,
                    borderBottomColor: colors.border.grey,
                  }}
                  accessibilityLabel="sort-selection">
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 35,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {data === 'Terbaru' ? (
                        <SortSelectionNewest
                          height={26}
                          width={26}
                          accessibilityLabel="sort-selection-icon"
                        />
                      ) : data === 'Terlama' ? (
                        <SortSelectionOldest
                          height={26}
                          width={26}
                          accessibilityLabel="sort-selection-icon"
                        />
                      ) : data === 'A-Z' ? (
                        <SortSelectionIconAZ
                          height={26}
                          width={26}
                          accessibilityLabel="sort-selection-icon"
                        />
                      ) : data === 'Z-A' ? (
                        <SortSelectionIconZA
                          height={26}
                          width={26}
                          accessibilityLabel="sort-selection-icon"
                        />
                      ) : data === 'Belum Selesai' ? (
                        <SortSelectionComplete
                          height={26}
                          width={26}
                          accessibilityLabel="sort-selection-icon"
                        />
                      ) : (
                        <></>
                      )}

                      <Text
                        key={key}
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          paddingLeft: 15,
                          color: colors.text.black1,
                        }}
                        accessibilityLabel="sort-selection-title">
                        {data}
                      </Text>
                    </View>

                    {data === currentSelected ? (
                      <TablerCheck
                        height={30}
                        width={30}
                        accessibilityLabel="sort-selection-selected"
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
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
    borderRadius: 12,
    elevation: 10,
    marginVertical: '50%',
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
