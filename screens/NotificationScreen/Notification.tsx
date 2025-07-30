import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import WellnessGuardSVG from '../../assets/svgImages/Wellness-Guard.svg';
import MedicineSVG from '../../assets/svgImages/medicine.svg';
import DoseSVG from '../../assets/svgImages/dose.svg';
import {
  LIGHT_GREY,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WHITE_COLOR,
} from '../../constants/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import {NOTIFICATION_TYPE} from '../../constants/notification_types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NotificationContent} from '../../global/types';
import moment from 'moment';

const NotificationType = (notificationType: string) => {
  if (notificationType === NOTIFICATION_TYPE.welcome_email_notification) {
    return (
      // <MaterialCommunityIcons
      //   name="account-circle"
      //   size={70}
      //   color={THEMED_BLUE_COLOR}
      // />
      <WellnessGuardSVG height={70} width={70} />
    );
  } else if (
    notificationType === NOTIFICATION_TYPE.medication_completed_notification
  ) {
    return <MedicineSVG height={70} width={70} />;
  } else if (
    notificationType === NOTIFICATION_TYPE.medication_started_notification
  ) {
    return <MedicineSVG height={70} width={70} />;
  } else if (
    notificationType === NOTIFICATION_TYPE.morning_dose_notification ||
    notificationType === NOTIFICATION_TYPE.evening_dose_notification ||
    notificationType === NOTIFICATION_TYPE.afternoon_dose_notification
  ) {
    return <DoseSVG width={70} height={70} />;
  }
};

const serializeDate = (createdAt: string) => {
  let label = 'sec';
  const now = moment(Date.now());
  const record = moment(createdAt!);
  let diff = now.diff(record, 'seconds');
  if (diff === 0) {
    label = 'now';
    return label;
  }
  if (diff > 60) {
    diff = now.diff(record, 'minutes');
    label = 'min';
  }
  if (diff > 60) {
    diff = now.diff(record, 'hours');
    label = 'h';
  }
  if (diff > 24) {
    diff = now.diff(record, 'days');
    label = 'day';
  }
  if (diff > 365) {
    diff = now.diff(record, 'years');
    label = 'yr';
  }
  return diff + label;
};

const Notification = ({
  subject,
  body,
  type,
  view,
  _id,
  action,
  createdAt,
}: NotificationContent) => {
  return (
    <View style={styles.container}>
      <View style={styles.scale}>
        <View style={styles.image}>{NotificationType(type)}</View>
        <View style={styles.content}>
          <Text style={styles.heading}>{subject}</Text>
          <Text style={styles.description}>
            {body && (body as any).message}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => action(_id)}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size={25}
              color={LIGHT_GREY}
            />
          </TouchableOpacity>
          <Text style={styles.moment}>{serializeDate(createdAt!)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    borderBottomWidth: 0.2,
    borderColor: PRIMARY_COLOR,
    backgroundColor: WHITE_COLOR,
    marginBottom: 2,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 3,
  },
  scale: {
    paddingTop: 14,
    paddingLeft: 9,
    paddingRight: 9,
    paddingBottom: 10,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    height: 70,
    width: 70,
  },
  content: {
    marginLeft: 8,
    width: 313,
    flex: 1,
    flexDirection: 'column',
  },
  heading: {
    color: PRIMARY_COLOR,
    fontSize: verticalScale(18),
    flexWrap: 'wrap',
    fontFamily: 'Poppins',
  },
  description: {
    color: SECONDARY_COLOR,
    fontSize: verticalScale(11),
    fontFamily: 'Poppins-Regular',
    flexWrap: 'wrap',
    maxHeight: 45,
  },
  actions: {
    flexDirection: 'column',
    width: 30,
  },
  moment: {
    maxHeight: 45,
    paddingTop: 28,
    textAlign: 'left',
    flex: 1,
    flexDirection: 'column-reverse',
    color: SECONDARY_COLOR,
  },
});

export default Notification;
