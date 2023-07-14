import React, {memo, useEffect, useState} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  ParamListBase,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as common from '../screens/common';

import {
  ScreenMap,
  StackParamList,
  KeyStackParamList,
  CommonStackParamList,
} from '../navigation/screen';
import { AppLoading } from '@components';

const ExerciseStack = createNativeStackNavigator<CommonStackParamList>();

const commonScreen = {...common};

export const ScreenManager: React.FC = memo(() => {
  const [initialScreen, setInitialScreen] = useState<{
    name: keyof StackParamList | null;
    params?: ParamListBase[KeyStackParamList];
  }>({name: null, params: undefined});

  useEffect(() => {
    const initFn = async () => {
      setInitialScreen({
        name: 'Home',
      });
    };
    initFn();
  }, []);

  if (!initialScreen.name) {
    return <AppLoading size="large" />;
  }

  if (initialScreen.name) {
    const screens = Object.entries(commonScreen).map(([name, Component]) => ({
      name: name.replace('Screen', ''),
      Component,
    })) as ScreenMap[];

    return (
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          dark: false,
          colors: {...DefaultTheme.colors, background: 'white'},
        }}>
        <ExerciseStack.Navigator
          initialRouteName={initialScreen.name}
          screenOptions={{
            headerShown: false,
          }}>
          {screens.map(({name, Component}, i) => (
            <ExerciseStack.Screen
              key={`${i.toString()}`}
              name={name}
              component={Component}
            />
          ))}
        </ExerciseStack.Navigator>
      </NavigationContainer>
    );
  }

  return null;
});
