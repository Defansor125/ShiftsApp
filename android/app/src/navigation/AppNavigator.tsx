// src/navigation/AppNavigator.tsx
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShiftsListScreen from '../screens/ShiftsListScreen';
import ShiftDetailsScreen from '../screens/ShiftDetailsScreen';

export type RootStackParamList = {
  ShiftsList: undefined;
  ShiftDetails: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ShiftsList"
          component={ShiftsListScreen}
          options={{title: 'Смены рядом'}}
        />
        <Stack.Screen
          name="ShiftDetails"
          component={ShiftDetailsScreen}
          options={{title: 'Детали смены'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
