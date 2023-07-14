import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type CommonStackParamList = {
  Home: undefined;
  Forecast: undefined;
};

export type StackParamList = CommonStackParamList;
export type KeyStackParamList = keyof CommonStackParamList;

type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> =
  | React.ComponentType<{
      route: RouteProp<ParamList, RouteName>;
      navigation: keyof StackParamList;
    }>
  | React.ComponentType<{}>;

export type ScreenMap = {
  name: KeyStackParamList;
  Component: ScreenComponentType<StackParamList, KeyStackParamList>;
};

export type ScreenProps<T extends keyof StackParamList> = React.FC<
  NativeStackScreenProps<StackParamList, T>
>;
