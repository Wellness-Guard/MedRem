import React, {ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {DIM_GREY_COLOR, LIGHT_BLUE_COLOR} from '../constants/colors';

type TileProps = {
  title: string;
  svgImage: ReactNode;
  styles?: {[key: string]: any};
};

const Tile = ({title, svgImage, styles}: TileProps) => {
  return (
    <LinearGradient
      colors={[LIGHT_BLUE_COLOR, LIGHT_BLUE_COLOR]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={[style.container, styles]}>
      <View style={style.content}>{svgImage}</View>

      <Text style={style.heading}>{title}</Text>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  container: {
    width: scale(152),
    height: verticalScale(177),
    borderRadius: scale(14),
    opacity: 1,
    shadowColor: LIGHT_BLUE_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  heading: {
    fontSize: verticalScale(16),
    lineHeight: verticalScale(24),
    fontFamily: 'Poppins-SemiBold',
    color: DIM_GREY_COLOR,
    marginLeft: scale(8),
    marginRight: scale(8),
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
    paddingTop: verticalScale(39),
    paddingLeft: scale(22),
    paddingRight: scale(21),
    paddingBottom: verticalScale(21.4),
  },
});
export default Tile;
