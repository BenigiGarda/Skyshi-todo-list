import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {DashboardEmpty, DeleteButton} from '../../../assets';

import {colors} from '../../../utils/colors';
import APIKit from '../../../utils/axios';

export default function ActivityCard({
  onPressCard,
  data,
  setLoading,
  setTargetId,
  setPopUp,
  setTargetName,
}) {
  Date.prototype.toShortFormat = function () {
    const monthNames = [
      'Januari',
      'Febuari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    const day = this.getDate();

    const monthIndex = this.getMonth();
    const monthName = monthNames[monthIndex];

    const year = this.getFullYear();

    return `${day} ${monthName} ${year}`;
  };

  let anyDate = new Date(data.created_at);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressCard}
      accessibilityLabel="activity-item">
      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 15,
          justifyContent: 'space-between',
        }}>
        <View style={{height: 50}}>
          <Text style={styles.title} accessibilityLabel="activity-item-title">
            {data.title}
          </Text>
        </View>

        <View
          style={{
            marginTop: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          accessibilityLabel="activity-item-date">
          <Text style={styles.date}>{anyDate.toShortFormat()}</Text>
          <TouchableOpacity
            onPress={() => {
              setTargetName(data.title), setTargetId(data.id), setPopUp(true);
            }}
            accessibilityLabel="activity-item-delete-button">
            <DeleteButton height={15} width={15} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    borderRadius: 12,
    elevation: 10,
    backgroundColor: colors.bg.white,
    width: '45%',
  },
  title: {
    color: colors.text.black,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Poppins',
  },
  date: {
    color: colors.text.black1,
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Poppins',
  },
});
