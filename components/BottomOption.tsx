import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Description from './Description';
import Modal from 'react-native-modal';
import {OptionArray} from '../global/types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {LIGHT_GREY} from '../constants/colors';
import {verticalScale, scale} from 'react-native-size-matters';

type BottomOptionProps = {
  isVisible: boolean;
  onBackDropPress?: () => void;
  options: OptionArray;
};
const BottomOption = ({
  isVisible,
  onBackDropPress,
  options,
}: BottomOptionProps) => {
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      isVisible={isVisible}
      swipeDirection={'up'}
      onBackdropPress={onBackDropPress}
      style={styles.bottom}>
      <View style={styles.container}>
        <Description style={styles.header} text="Options" />
        <View style={styles.content}>
          {options &&
            options.map(({title, icon, action}: any, index) => {
              return (
                <View
                  key={index}
                  style={{
                    padding: verticalScale(10),
                  }}>
                  <Pressable onPress={action}>
                    <View style={styles.flexRow}>
                      <FontAwesomeIcon
                        icon={icon}
                        size={scale(23)}
                        color={LIGHT_GREY}
                      />
                      <Text style={styles.optionTitle}>{title}</Text>
                    </View>
                  </Pressable>
                </View>
              );
            })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottom: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    height: '25%',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    marginLeft: scale(15),
  },
  content: {flexDirection: 'column', marginBottom: '4%'},
  optionTitle: {
    fontSize: verticalScale(18),
    fontFamily: 'Poppins-Regular',
    color: LIGHT_GREY,
    marginLeft: scale(10),
  },
});

export default BottomOption;
