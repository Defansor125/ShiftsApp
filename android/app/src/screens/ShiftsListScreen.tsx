import React, {useCallback, useEffect} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
  Platform,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStores} from '../stores/StoreContext';
import {getCurrentCoords} from '../services/location';
import ShiftListItem from '../components/ShiftListItem';
import type {RootStackParamList} from '../navigation/AppNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Geolocation from 'react-native-geolocation-service';
import {
  request,
  check,
  openSettings,
  RESULTS,
  PERMISSIONS,
} from 'react-native-permissions';

type Props = NativeStackScreenProps<RootStackParamList, 'ShiftsList'>;

const ShiftsListScreen = observer(({navigation}: Props) => {
  const {shift, ui} = useStores();
  useEffect(() => {
    (async () => {
      const fine =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const status = await check(fine);

      const ensureGranted = async () => {
        if (status === RESULTS.GRANTED) return RESULTS.GRANTED;
        if (status === RESULTS.BLOCKED) return RESULTS.BLOCKED;
        return request(fine);
      };

      const res = await ensureGranted();

      if (res === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            await shift.fetchByCoords(lat, lon);
          },
          err => {
            Alert.alert('Локация', err.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 0},
        );
      } else if (res === RESULTS.BLOCKED || res === RESULTS.DENIED) {
        ui.setPermission(res === RESULTS.BLOCKED ? 'blocked' : 'denied');
        Alert.alert(
          'Нужно разрешение',
          'Включите доступ к геолокации, чтобы показать смены рядом.',
          [
            {text: 'Отмена', style: 'cancel'},
            {text: 'Открыть настройки', onPress: () => openSettings()},
          ],
        );
      }
    })();
  }, [shift, ui]);

  useEffect(() => {
    (async () => {
      try {
        const {lat, lon} = await getCurrentCoords();
        await shift.fetchByCoords(lat, lon);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [shift]);

  const onRefresh = useCallback(async () => {
    ui.setPullRefreshing(true);
    await shift.refresh();
    ui.setPullRefreshing(false);
  }, [shift, ui]);

  if (shift.status === 'loading' && shift.shifts.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  if (shift.status === 'error') {
    return (
      <View style={{padding: 16}}>
        <Text>Ошибка: {shift.error}</Text>
      </View>
    );
  }

  return (
    <>
      {shift.shifts.length === 0 && (
        <View style={{padding: 16, alignItems: 'center'}}>
          <Text>Смены не найдены</Text>
        </View>
      )}
      <FlatList
        data={shift.shifts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ShiftListItem
            id={item.id}
            onPress={id => {
              shift.select(id);
              navigation.navigate('ShiftDetails', {id});
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={ui.isPullRefreshing}
            onRefresh={onRefresh}
          />
        }
        initialNumToRender={8}
        windowSize={5}
        removeClippedSubviews
        contentContainerStyle={{padding: 12}}
      />
    </>
  );
});

export default ShiftsListScreen;
