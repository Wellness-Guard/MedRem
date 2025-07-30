import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Capsule from '../assets/svgImages/capsule.svg';
import Pills from '../assets/svgImages/pills.svg';
import Morning from '../assets/svgImages/Morning.svg';
import Evening from '../assets/svgImages/Evening.svg';
import Night from '../assets/svgImages/Night.svg';
import {DARK_GREY, GREY, LIGHT_GREY, WHITE_COLOR} from '../constants/colors';
import {Notification} from '../global/types/Notification';
import {convertToLocalTime} from '../utils';
import {DoseType} from '../global/types/Notification';
import {Dose} from '../global/types/Dose';

type NotificationProp = {
  notification: Notification;
};

const doseTypeELement = (doseType: DoseType) => {
  switch (doseType) {
    case 'Morning':
      return <Morning />;
    case 'Morning':
      return <Evening />;
    case 'Night':
      return <Night />;
  }
};

const generateString = (doses: Dose[]) => {
  return doses.map((dose, id) => {
    return (
      <Text key={id}>
        Take {dose.quantity} {dose.type === 'Tablet' ? <Pills /> : <Capsule />}
        {dose.type} of {dose.medicineName} ,
      </Text>
    );
  });
};

const generateNotification = (notification: Notification): JSX.Element => {
  return (
    <Text style={style.content}>
      {generateString(notification.doses)}
      {` ${notification.doseType} dose`}
      {doseTypeELement(notification.doseType)}
    </Text>
  );
};

const NotificationTile = ({notification}: NotificationProp) => {
  return (
    <View style={[style.container]}>
      <View style={style.scale}>{generateNotification(notification)}</View>
      <View style={style.footer}>
        <Text style={style.time}>{convertToLocalTime(notification.time)}</Text>
        <Text style={style.disease}>{notification.disease}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(110),
    borderBottomWidth: 0.1,
    borderColor: LIGHT_GREY,
    backgroundColor: WHITE_COLOR,
    marginBottom: 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
  },
  scale: {
    paddingTop: scale(8.91),
    paddingLeft: scale(17),
    paddingRight: scale(17),
    paddingBottom: scale(8.91),
  },
  content: {
    color: DARK_GREY,

    fontSize: scale(18),
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  time: {
    color: LIGHT_GREY,
    paddingLeft: scale(17),
    fontSize: verticalScale(12),
    fontWeight: '400',
  },
  disease: {
    color: LIGHT_GREY,
    paddingRight: scale(17),
    fontSize: verticalScale(12),
    fontWeight: '400',
  },
});
export default NotificationTile;
