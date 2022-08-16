import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { Text } from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';

import useInitialLoading from '../util/useInitialLoading';
import { useIsWeekCreated, useValidToken } from '../util/react-query-hooks';
import { MyDarkTheme, MyLightTheme } from '../constants/Colors';
import CreateWeekScreen from '../screens/CreateWeekScreen';
import { createIconSetFromFontello } from '@expo/vector-icons';

export default function Main({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const isLoadingComplete = useInitialLoading();
  if (!isLoadingComplete) {
    return null;
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? MyDarkTheme : MyLightTheme}
      fallback={<Text>Splash screen...</Text>}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return <NavigatorBody />;
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const NavigatorBody: React.FC = () => {
  const { data: validToken } = useValidToken();
  const { data: isWeekCreated, isFetching: isWeekFetching } =
    useIsWeekCreated();

  if (validToken && !isWeekCreated && !isWeekFetching) {
    console.log('RENDERING WEEK');
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='CreateWeek'
          component={CreateWeekScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='NotFound'
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
      </Stack.Navigator>
    );
  }

  if (validToken && isWeekCreated) {
    console.log('RENDERING ROOT');
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Root'
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='NotFound'
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Signup'
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName='TabOne'>
      <BottomTab.Screen
        name='TabOne'
        component={TabOneScreen}
        options={() => ({
          title: 'Tab One',
        })}
      />
      <BottomTab.Screen
        name='TabTwo'
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
        }}
      />
    </BottomTab.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
