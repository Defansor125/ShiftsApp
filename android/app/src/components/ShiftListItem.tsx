import React, {memo} from 'react';
import {Pressable, View, Text, Image} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStores} from '../stores/StoreContext';

type Props = {
  id: string;
  onPress: (id: string) => void;
};

const ShiftListItem = observer(({id, onPress}: Props) => {
  const {shift} = useStores();
  const item = shift.shifts.find(s => s.id === id);
  if (!item) return null;

  return (
    <Pressable
      onPress={() => onPress(id)}
      style={{
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        marginBottom: 10,
        elevation: 2,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: item.logo}}
          style={{width: 44, height: 44, borderRadius: 8, marginRight: 12}}
        />
        <View style={{flex: 1}}>
          <Text style={{fontWeight: '600'}}>{item.companyName}</Text>
          <Text>{item.workTypes.map(w => w.name).join(', ')}</Text>
          <Text>
            {item.timeStartByCity}–{item.timeEndByCity} • {item.priceWorker} ₽
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

export default memo(ShiftListItem);
