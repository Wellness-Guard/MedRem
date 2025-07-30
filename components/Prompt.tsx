import React from 'react';
import RNModal from 'react-native-modal';
import {View, Text, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {
  GREY,
  THEMED_BLUE_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../constants/colors';
import {Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';

type PromptProps = {
  title: string;
  isVisible: boolean;
  success: () => void;
  cancel: () => void;
  onBackDropPress?: () => void;
};
const Prompt = ({
  isVisible = false,
  title,
  success,
  cancel,
  onBackDropPress,
}: PromptProps) => {
  return (
    <RNModal
      onBackdropPress={onBackDropPress}
      isVisible={isVisible}
      animationIn={'bounceInUp'}
      animationOut={'bounceOutDown'}
      animationInTiming={1000}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>

        <View style={styles.buttons}>
          <Pressable style={styles.success} onPress={success}>
            <Text>Yes</Text>
          </Pressable>
          <Pressable style={styles.cancel} onPress={cancel}>
            <Text style={{color: PRIMARY_COLOR}}>No</Text>
          </Pressable>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    alignSelf: 'center',
    width: '80%',
    height: '20%',
    color: 'red',
  },
  header: {
    textAlign: 'left',
    fontSize: verticalScale(10),
    fontFamily: 'Poppins-Regular',
  },
  text: {
    marginTop: verticalScale(10),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    borderBottomWidth: 1,
    borderColor: GREY,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: verticalScale(16),
    color: THEMED_BLUE_COLOR,
  },
  content: {
    height: 100,
  },
  buttons: {
    margin: scale(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  success: {
    borderWidth: 1,
    borderColor: THEMED_BLUE_COLOR,
    backgroundColor: THEMED_BLUE_COLOR,
    width: scale(90),
    padding: scale(10),
    alignItems: 'center',
    borderRadius: 8,
    fontFamily: 'Poppins-Regular',
  },
  cancel: {
    borderWidth: 1,
    borderColor: THEMED_BLUE_COLOR,
    backgroundColor: WHITE_COLOR,
    width: scale(90),
    padding: scale(10),
    alignItems: 'center',
    borderRadius: 8,
    fontFamily: 'Poppins-Regular',
  },
});

export default Prompt;
