/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {View, StyleSheet} from 'react-native';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import SettingScreen from '../../screens/SettingsScreen';
import MedicationScreen from '../../screens/MedicationScreen';
import History from '../../screens/HistoryScreen';
// container
import NotificationScreen from '../../screens/NotificationScreen';
import {
  GREY,
  LIGHT_GREY,
  PRIMARY_COLOR,
  RED,
  THEMED_BLUE_COLOR,
  WHITE_COLOR,
} from '../../constants/colors';

import {scale, verticalScale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {TabParams} from '../../global/types';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Avatar from '../../components/Avatar';

type BottomTabProps = DrawerScreenProps<any, any>;
const Tab = createBottomTabNavigator<TabParams>();

const BottomTab = ({navigation}: BottomTabProps) => {
  const {count} = useSelector((state: RootState) => state.notification);
  const {avatar} = useSelector((state: RootState) => state.auth);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: THEMED_BLUE_COLOR,
        tabBarInactiveTintColor: LIGHT_GREY,
        tabBarLabelPosition: 'below-icon',
        lazy: false,
        tabBarStyle: {
          backgroundColor: WHITE_COLOR,
          height: verticalScale(45),
          borderTopColor: LIGHT_GREY,
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          fontSize: verticalScale(12),
          fontFamily: 'Poppins',
        },
        headerLeftContainerStyle: {
          marginLeft: 15,
          marginTop: 15,
        },
        headerTitleStyle: {
          marginLeft: 15,
          marginTop: 15,
          fontSize: verticalScale(23),
          fontFamily: 'Poppins-SemiBold',
          color: PRIMARY_COLOR,
        },
        headerTransparent: true,
        headerLeft: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              {avatar ? (
                <Avatar
                  src={avatar}
                  height={scale(45)}
                  width={scale(45)}
                  styles={styles.image_icon}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-circle"
                  style={{
                    marginLeft: scale(25),
                    transform: [
                      {
                        scaleX: 4.5,
                      },
                      {
                        scaleY: 4.5,
                      },
                    ],
                  }}
                  color={LIGHT_GREY}
                />
              )}
            </TouchableOpacity>
          );
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="home"
                color={THEMED_BLUE_COLOR}
                size={verticalScale(30)}
              />
            ) : (
              <MaterialCommunityIcons
                name="home-outline"
                color={LIGHT_GREY}
                size={verticalScale(26)}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerTitle: 'Notification',
          tabBarLabel: 'Notification',
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="bell"
                color={THEMED_BLUE_COLOR}
                size={verticalScale(30)}
              />
            ) : (
              <>
                {count > 0 ? <View style={styles.redDot} /> : null}
                <MaterialCommunityIcons
                  name="bell-outline"
                  color={LIGHT_GREY}
                  size={verticalScale(26)}
                />
              </>
            ),
        }}
      />

      <Tab.Screen
        name="Medication"
        component={MedicationScreen}
        options={{
          tabBarStyle: {
            display: 'none',
          },
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="plus-circle"
                color={THEMED_BLUE_COLOR}
                size={verticalScale(30)}
              />
            ) : (
              <MaterialCommunityIcons
                name="plus-circle-outline"
                color={LIGHT_GREY}
                size={verticalScale(30)}
              />
            ),
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerTitle: 'History',
          tabBarLabel: 'History',
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="history"
                color={THEMED_BLUE_COLOR}
                size={verticalScale(30)}
              />
            ) : (
              <MaterialCommunityIcons
                name="history"
                color={LIGHT_GREY}
                size={verticalScale(26)}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
          headerTitle: 'Settings',
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="cog"
                color={THEMED_BLUE_COLOR}
                size={verticalScale(30)}
              />
            ) : (
              <MaterialCommunityIcons
                name="cog-outline"
                color={LIGHT_GREY}
                size={verticalScale(26)}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 90,
    backgroundColor: RED,
    position: 'absolute',
  },
  image_icon: {
    marginLeft: scale(18),
    marginRight: scale(-20),
    borderRadius: 5,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: GREY,
  },
});
export default BottomTab;
