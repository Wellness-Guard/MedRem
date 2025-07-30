import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Layout from '../../Layout/Layout';
import {scale, verticalScale} from 'react-native-size-matters';
import Heading from '../../components/Heading';
import {
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
  WHITE_COLOR,
} from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Avatar from '../../components/Avatar';
import Paragraph from '../../components/Paragraph';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import SettingTile from '../../components/SettingTile';
import {useNavigation} from '@react-navigation/native';
import {
  faChevronRight,
  faBell,
  faGlobe,
  faLifeRing,
  faCommenting,
} from '@fortawesome/free-solid-svg-icons';

import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../global/types';

const SettingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const {first_name, last_name, avatar} = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = (screen: string) => {
    navigation.navigate(screen);
  };

  const settings = () => {
    const options = [
      {
        icon: faBell,
        name: 'Notification',
        route: 'NotificationSetting',
      },
      {
        icon: faGlobe,
        name: 'Language',
        route: 'LanguageSetting',
      },
      {
        icon: faLifeRing,
        name: 'Help',
        route: 'Help-Settings',
      },
      {
        icon: faCommenting,
        name: 'Feedback',
        route: 'Feedback-Settings',
      },
    ];
    return options.map(({name, icon, route}, index) => {
      return (
        <SettingTile
          title={name}
          icon={icon}
          key={index}
          navigate={navigate}
          route={route}
        />
      );
    });
  };
  return (
    <Layout>
      <SafeAreaView style={styles.safeAreaFrame}>
        <View style={styles.settingContainer}>
          <Heading text="Account" />

          <View style={styles.accountTile}>
            <View style={styles.accountContent}>
              <Avatar
                styles={styles.avatar}
                height={scale(80)}
                width={scale(80)}
                src={avatar}
              />
              <View style={styles.nameContent}>
                <Heading
                  styles={styles.nameText}
                  text={first_name + ' ' + last_name}
                />
                <Paragraph text="Personal Info" />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('AccountSetting')}>
                <FontAwesomeIcon
                  style={styles.chevronRight}
                  icon={faChevronRight}
                  size={scale(20)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Heading text="Settings" />

          <View style={styles.tilesContainer}>{settings()}</View>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  safeAreaFrame: {
    marginTop: verticalScale(60),
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  settingContainer: {
    padding: scale(20),
  },
  accountTile: {
    width: scale(300),
    height: verticalScale(100),
    backgroundColor: WHITE_COLOR,
    shadowColor: PRIMARY_COLOR,
    borderRadius: scale(15),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  accountContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(110),
    padding: 5,
  },
  nameContent: {
    width: scale(160),
    textAlign: 'left',
    marginTop: '10%',
    marginBottom: '10%',
    marginLeft: '5%',
  },
  nameText: {
    fontSize: verticalScale(21),
  },
  chevronRight: {
    color: THEMED_BLUE_COLOR,
    marginTop: verticalScale(40),
  },
  tilesContainer: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  avatar: {
    margin: verticalScale(10),
  },
});

export default SettingScreen;
