import React from 'react';
import {Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LIGHT_GREY} from '../constants/colors';
type AvatarProps = {
  src?: string;
  height: number;
  width: number;
  styles?: object;
};

const Avatar = ({height, width, src, styles}: AvatarProps) => {
  return src && src !== null ? (
    <Image
      style={[styles, {height: height, width: width, borderRadius: 100}]}
      source={{uri: src}}
    />
  ) : (
    <MaterialCommunityIcons
      name="account-circle"
      size={height}
      color={LIGHT_GREY}
      style={[styles]}
    />
  );
};

export default Avatar;
