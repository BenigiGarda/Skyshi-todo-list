import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import APIKit from '../../utils/axios';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {DashboardEmpty} from '../../assets';
import {Layout, Header, Button, ActivityCard} from '../../components';
import {colors} from '../../utils/colors';
import PopUpDeleteActivityOrList from '../../components/Molecule/PopUpDeleteActivityOrList';
import DeleteAlert from '../../components/Molecule/DeleteAlert';
export default function Dashboard({navigation}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [targetName, setTargetName] = useState('');
  const [targetId, setTargetId] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [popUpDeleteAlert, setPopUpDeleteAlert] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function getData() {
      await APIKit.get('/activity-groups?email=benigi%2B1%40skyshi.io').then(
        res => setData(res.data.data),
      );

      setLoading(false);
    }
    getData();
  }, [loading == true || isFocused]);

  return (
    <>
      <Header title="TO DO LIST APP" simple />
      <Layout>
        {loading === true ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text
              style={{
                fontSize: 18,
                color: colors.text.black,
                fontWeight: '700',
              }}>
              Loading...
            </Text>
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 20,
                marginTop: 40,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.text.black,
                  fontWeight: '700',
                }}
                accessibilityLabel="activity-title">
                Activity
              </Text>
              <Button
                text="+ Tambah"
                onPress={() =>
                  navigation.navigate('ItemList', {
                    state: 'Create',
                  })
                }
              />
            </View>
            {/*Main*/}
            {!data ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 50,
                }}>
                <DashboardEmpty
                  height={360}
                  width={360}
                  accessibilityLabel="activity-empty-state"
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.text.black1,
                    fontWeight: '600',
                  }}
                  accessibilityLabel="Buat activity pertamamu">
                  Buat Activity Pertamamu
                </Text>
              </View>
            ) : (
              <View
                style={{
                  margin: 25,
                  height: 500,
                }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={styles.containerListProduct}
                  data={data}
                  numColumns={2}
                  renderItem={({item}) => (
                    <ActivityCard
                      data={item}
                      setPopUp={setPopUp}
                      setTargetId={setTargetId}
                      setTargetName={setTargetName}
                      setLoading={setLoading}
                      onPressCard={() =>
                        navigation.navigate('ItemList', {
                          id: item.id,
                          state: 'Detail',
                          title: item.title,
                        })
                      }
                    />
                  )}
                />
              </View>
            )}
          </View>
        )}
      </Layout>
      {popUp && (
        <PopUpDeleteActivityOrList
          setPopUpDeleteAlert={setPopUpDeleteAlert}
          setLoading={setLoading}
          targetId={targetId}
          setPopUp={setPopUp}
          targetType={'Activity'}
          targetName={targetName}
        />
      )}
      {popUpDeleteAlert && (
        <DeleteAlert
          setPopUpDeleteAlert={setPopUpDeleteAlert}
          targetType={'Activity'}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: colors.text.white,
    marginLeft: 11,
  },
  containerListProduct: {
    flexWrap: 'wrap',
    flexGrow: 0,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
});
