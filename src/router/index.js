import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard, ItemList} from '../screens';
export default function Router() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ItemList" component={ItemList} />
    </Stack.Navigator>
  );
}
