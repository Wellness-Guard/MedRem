import React, {ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {
  DARK_VIOLET,
  LIGHT_VIOLET,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

type BannerProps = {
  title: string;
  svgImage: ReactNode;
};

const Banner = ({title, svgImage}: BannerProps) => {
  return (
    <LinearGradient
      colors={[DARK_VIOLET, LIGHT_VIOLET]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={style.container}>
      <View style={style.content}>
        <View style={style.columnOne}>
          <Text style={style.heading}>{title}</Text>
          <TouchableOpacity>
            <Text style={style.button}>Read More</Text>
          </TouchableOpacity>
        </View>
        <View style={style.image}>{svgImage}</View>
      </View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  container: {
    width: scale(330),
    height: verticalScale(150),
    borderRadius: scale(15),
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    alignSelf: 'flex-end',
    marginBottom: verticalScale(10),
  },
  columnOne: {
    width: scale(180),
  },
  heading: {
    fontSize: scale(16),
    color: WHITE_COLOR,
    marginLeft: scale(18),
    marginTop: scale(25),
    textAlign: 'left',
    lineHeight: verticalScale(20),
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    borderWidth: 1,
    width: scale(90),
    height: verticalScale(32),
    paddingTop: verticalScale(9),
    paddingBottom: verticalScale(9),
    paddingLeft: scale(10),
    paddingRight: scale(9),
    color: WHITE_COLOR,
    fontSize: scale(12),
    fontFamily: 'Poppins-Regular',
    backgroundColor: LIGHT_VIOLET,
    borderRadius: scale(15),
    textAlign: 'center',
    borderColor: 'transparent',
    marginLeft: scale(20),
    marginTop: scale(10),
  },
});
export default Banner;
