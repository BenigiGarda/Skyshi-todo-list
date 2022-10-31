import React, {useCallback, useEffect, useRef, useState} from 'react';
import APIKit from '../../utils/axios';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DashboardEmpty,
  EmptyState,
  SortButton,
  TitleEditButton,
} from '../../assets';
import {
  Layout,
  Header,
  Button,
  ActivityCard,
  ListCard,
  PopUpCreateList,
  PopUpSortTools,
  PopUpDeleteActivityOrList,
} from '../../components';
import {colors} from '../../utils/colors';
import DeleteAlert from '../../components/Molecule/DeleteAlert';
import {debounce} from 'lodash';
export default function ItemList({navigation, route}) {
  const [state, setState] = useState(route.params.state); //Create = Tambah Activity Baru, Detail = Lihat List
  const [loading, setLoading] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [targetName, setTargetName] = useState('');
  const [targetId, setTargetId] = useState('');
  const [popUpSortTools, setPopUpSortTools] = useState(false);
  const [popUpDeleteList, setPopUpDeleteList] = useState(false);
  const [popUpDeleteAlert, setPopUpDeleteAlert] = useState(false);
  const [selectedSortType, setSelectedSortType] = useState('Terbaru');
  const [data, setData] = useState();
  const [inputTitleValue, setInputTitleValue] = useState('New Activity Name');
  const refInput = useRef(null);

  function updateActivityTitle(value) {
    const dataFrom = {
      title: value,
    };

    APIKit.patch(`/activity-groups/${route.params.id}`, dataFrom).then(res =>
      console.log(res),
    );
  }
  const debauncedTitle = useCallback(
    debounce(value => updateActivityTitle(value)),
    [500],
  );
  async function createActivityAndPopUp() {
    if (state === 'Create') {
      const dataForm = {
        title: inputTitleValue,
        email: 'benigi+1@skyshi.io',
      };
      await APIKit.post('/activity-groups', dataForm)
        .then(res => {
          setData(res.data);
          setLoading(true);
          setState('Detail');
        })
        .then(() => setPopUp(true));
    } else {
      setPopUp(true);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (route.params.id) {
        await APIKit.get(`/activity-groups/${route.params.id}`).then(res =>
          setData(res.data),
        );
      }
      if (data) {
        await APIKit.get(`/activity-groups/${data.id}`).then(res =>
          setData(res.data),
        );
      }
      setLoading(false);
    }
    fetchData();
  }, [state === 'Detail', loading == true]);

  let sortedData = [];
  if (selectedSortType === 'Terbaru') {
    sortedData = data?.todo_items?.sort((a, b) => b.id - a.id);
  } else if (selectedSortType === 'Terlama') {
    sortedData = data?.todo_items?.sort((a, b) => a.id - b.id);
  } else if (selectedSortType === 'A-Z') {
    sortedData = data?.todo_items?.sort((a, b) =>
      b.title.split(' ')[0].localeCompare(a.title.split(' ')[0]),
    );
  } else if (selectedSortType === 'Z-A') {
    sortedData = data?.todo_items?.sort((a, b) =>
      a.title.split(' ')[0].localeCompare(b.title.split(' ')[0]),
    );
  } else if (selectedSortType === 'Belum Selesai') {
    sortedData = data?.todo_items?.sort((a, b) => b.is_active - a.is_active);
  }

  return (
    <>
      <Header title="NEW ACTIVITY" onPressBack={() => navigation.goBack()} />
      <Layout>
        {/* Loading */}
        {loading == true && state === 'Detail' ? (
          <View style={styles.loadingWrapper}>
            <Text style={styles.textLoading}>Loading...</Text>
          </View>
        ) : (
          // Main Page
          <>
            <View style={{marginHorizontal: 20}}>
              {/* //Activity Title */}
              {state === 'Create' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <TextInput
                    ref={refInput}
                    maxLength={60}
                    style={styles.inputForm}
                    value={inputTitleValue}
                    onChangeText={value => {
                      setInputTitleValue(value);
                    }}
                    name="New Activity Name"
                    defaultValue="New Activity Name"
                    accessibilityLabel="activity-title"
                  />
                  <TouchableOpacity
                    onPress={() => refInput.current.focus()}
                    accessibilityLabel="todo-title-edit-button">
                    <TitleEditButton height={20} width={20} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <TextInput
                    ref={refInput}
                    style={{
                      fontSize: 18,
                      color: colors.text.black1,
                      fontWeight: '600',
                    }}
                    onChangeText={value => {
                      setInputTitleValue(value), debauncedTitle(value);
                    }}>
                    {data.title}
                  </TextInput>
                  <TouchableOpacity onPress={() => refInput.current.focus()}>
                    <TitleEditButton height={20} width={20} />
                  </TouchableOpacity>
                </View>
              )}
              {/* Activity Tools Button */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: 40,
                }}>
                {state === 'Create' ? (
                  <></>
                ) : (
                  <TouchableOpacity
                    style={{marginRight: 15}}
                    onPress={() => setPopUpSortTools(true)}
                    accessibilityLabel="todo-sort-button">
                    <SortButton height={40} width={40} />
                  </TouchableOpacity>
                )}
                <Button
                  text="+ Tambah"
                  onPress={() => createActivityAndPopUp()}
                />
              </View>
            </View>

            {data?.todo_items?.length > 0 ? (
              //List exist
              <View style={{height: 500}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  contentContainerStyle={styles.containerListProduct}
                  data={sortedData}
                  renderItem={({item}) => (
                    <ListCard
                      data={item}
                      setTargetId={setTargetId}
                      setTargetName={setTargetName}
                      setPopUpDeleteList={setPopUpDeleteList}
                    />
                  )}
                />
              </View>
            ) : data?.todo_items?.length == 0 ? (
              //list not exist
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: '20%',
                }}>
                <EmptyState
                  height={250}
                  width={360}
                  accessibilityLabel="todo-empty-state"
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.text.black1,
                    fontWeight: '600',
                    marginTop: '5%',
                  }}
                  accessibilityLabel="Buat List Item Kamu">
                  Buat List Item Kamu
                </Text>
              </View>
            ) : (
              <></>
            )}
          </>
        )}
      </Layout>
      {popUp && (
        <PopUpCreateList
          setLoading={setLoading}
          onPressClose={() => setPopUp(false)}
          ActivityId={data.id}
          setPopUp={setPopUp}
        />
      )}
      {popUpSortTools && (
        <PopUpSortTools
          setPopUpSortTools={setPopUpSortTools}
          selectedSortType={setSelectedSortType}
          currentSelected={selectedSortType}
        />
      )}
      {popUpDeleteList && (
        <PopUpDeleteActivityOrList
          setPopUpDeleteAlert={setPopUpDeleteAlert}
          setLoading={setLoading}
          targetId={targetId}
          setPopUp={setPopUpDeleteList}
          targetType={'List Item'}
          targetName={targetName}
        />
      )}
      {popUpDeleteAlert && (
        <DeleteAlert
          setPopUpDeleteAlert={setPopUpDeleteAlert}
          targetType={'List Item'}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg.blue,
    height: 64,
  },
  loadingWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textLoading: {
    fontSize: 18,
    color: colors.text.black,
    fontWeight: '700',
  },
  textTitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: colors.text.white,
    marginLeft: 11,
  },
  containerListProduct: {
    flexDirection: 'column',
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
  inputForm: {
    fontSize: 14,
    borderRadius: 5,
    padding: 5,
  },
});
