// src/screens/ShiftDetailsScreen.tsx
import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStores} from '../stores/StoreContext';
import type {RootStackParamList} from '../navigation/AppNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'ShiftDetails'>;

const ShiftDetailsScreen = observer(({route}: Props) => {
  const {shift} = useStores();
  const item =
    shift.selectedShift ?? shift.shifts.find(s => s.id === route.params.id);

  if (!item) {
    return (
      <View style={{padding: 16}}>
        <Text>Смена не найдена</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{padding: 16}}>
      <Image
        source={{uri: item.logo}}
        style={{width: 72, height: 72, borderRadius: 8, marginBottom: 12}}
      />
      <Text style={{fontSize: 18, fontWeight: '600'}}>{item.companyName}</Text>
      <Text>{item.workTypes.map(w => w.name).join(', ')}</Text>
      <Text>{item.address}</Text>
      <Text>
        {item.dateStartByCity} — {item.timeStartByCity}–{item.timeEndByCity}
      </Text>
      <Text>Выплата: {item.priceWorker} ₽</Text>
      <Text>
        Набрано: {item.currentWorkers} / {item.planWorkers}
      </Text>
      <Text>
        Рейтинг: {item.customerRating} ({item.customerFeedbacksCount} отз.)
      </Text>
    </ScrollView>
  );
});

export default ShiftDetailsScreen;
