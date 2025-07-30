import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Option, OptionArray, StackParams} from '../global/types';
import Avatar from './Avatar';
import {scale, verticalScale} from 'react-native-size-matters';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {GREY, THEMED_BLUE_COLOR} from '../constants/colors';
import Heading from './Heading';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Paragraph from './Paragraph';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShareNodes, faSignOut} from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {signOut} from '../store/thunkActions/authActions';
const renderOptions = (options: Option[]) => {
  return options.map(({icon, title, action}: Option, index) => {
    return (
      <TouchableOpacity
        style={styles.list_item}
        onPress={() => action()}
        key={index}>
        <FontAwesomeIcon
          icon={icon}
          color={THEMED_BLUE_COLOR}
          size={verticalScale(25)}
        />
        <Heading styles={styles.option_text} text={title} />
      </TouchableOpacity>
    );
  });
};

const DrawerLayout = ({navigation}: DrawerContentComponentProps) => {
  const stackNavigation = useNavigation<StackNavigationProp<StackParams>>();
  const {first_name, last_name, avatar} = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();
  const logOut = async () => {
    navigation.closeDrawer();
    await dispatch(signOut(true));
    stackNavigation.navigate('SignIn');
  };
  const options: OptionArray = [
    {
      title: 'share',
      icon: faShareNodes,
      action: () => console.log('share'),
    },
    {
      title: 'Log out',
      icon: faSignOut,
      action: logOut,
    },
  ];
  return (
    <View style={styles.drawer_layout}>
      <View style={styles.profile_section}>
        <Avatar src={avatar} width={scale(90)} height={scale(90)} />
        <Heading styles={styles.name} text={first_name + ' ' + last_name} />
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Paragraph style={{color: THEMED_BLUE_COLOR}} text={'view profile'} />
        </TouchableOpacity>
      </View>
      <View style={styles.options}>{renderOptions(options)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer_layout: {
    flex: 1,
    flexDirection: 'column',
  },
  profile_section: {
    height: verticalScale(240),
    paddingLeft: scale(25),
    paddingTop: verticalScale(60),
    borderBottomWidth: 1,
    borderBottomColor: GREY,
  },
  name: {
    paddingTop: verticalScale(10),
  },
  options: {
    marginTop: '95%',
    borderTopWidth: 1,
    borderTopColor: GREY,
    paddingLeft: scale(25),
    paddingTop: verticalScale(100),
  },
  option_text: {
    fontFamily: 'Poppins-Light',
    fontSize: verticalScale(18),
    paddingLeft: scale(10),
  },
  list_item: {
    flexDirection: 'row',
    height: verticalScale(50),
    padding: scale(5),
  },
});

export default DrawerLayout;
