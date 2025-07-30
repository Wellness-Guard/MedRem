import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import {scale, verticalScale} from 'react-native-size-matters';

import {
  FACEBOOK_COLOR,
  GOOGLE_COLOR,
  THEMED_BLUE_COLOR,
  WHITE_COLOR,
} from '../constants/colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
  isLoading: boolean;
  styles?: Object;
  type?: string; // facebook, google
  disabled?: boolean;
};

const Button = ({
  title,
  onPress,
  isLoading,
  type,
  styles,
  disabled,
}: ButtonProps) => {
  if (type && type === 'facebook') {
    return (
      <TouchableOpacity
        style={{...style.button, ...style.facebook}}
        onPress={isLoading ? undefined : onPress}>
        {isLoading === true ? (
          <View>
            <ActivityIndicator size="large" color={WHITE_COLOR} />
          </View>
        ) : (
          <View style={style.btnText}>
            <Text style={style.text}>{title} </Text>
            <Svg style={style.icon} viewBox="0 0 32 32" fill="none">
              <Path
                d="M31.2188 15.6094C31.2188 6.98645 24.2323 0 15.6094 0C6.98645 0 0 6.98645 0 15.6094C0 23.4002 5.70812 29.858 13.1704 31.0299V20.1216H9.20513V15.6094H13.1704V12.1703C13.1704 8.25849 15.4992 6.09773 19.0661 6.09773C20.7743 6.09773 22.5606 6.40236 22.5606 6.40236V10.2418H20.5918C18.6532 10.2418 18.0483 11.4452 18.0483 12.6795V15.6094H22.3774L21.6851 20.1216H18.0483V31.0299C25.5106 29.858 31.2188 23.4002 31.2188 15.6094Z"
                fill={WHITE_COLOR}
              />
            </Svg>
          </View>
        )}
      </TouchableOpacity>
    );
  } else if (type && type === 'google') {
    return (
      <TouchableOpacity
        style={{...style.button, ...style.google}}
        onPress={isLoading ? undefined : onPress}>
        {isLoading === true ? (
          <View>
            <ActivityIndicator size="large" color={WHITE_COLOR} />
          </View>
        ) : (
          <View style={style.btnText}>
            <Text style={style.text}>{title}</Text>
            <Svg style={style.icon} viewBox="0 0 31 32" fill="none">
              <Path
                d="M30.906 15.8778C30.906 24.7302 24.8439 31.03 15.8915 31.03C7.30817 31.03 0.376465 24.0983 0.376465 15.515C0.376465 6.9317 7.30817 0 15.8915 0C20.0705 0 23.5864 1.53273 26.2953 4.06018L22.0724 8.12035C16.5484 2.7902 6.27592 6.79407 6.27592 15.515C6.27592 20.9265 10.5988 25.312 15.8915 25.312C22.0349 25.312 24.3371 20.9077 24.7 18.6243H15.8915V13.2878H30.662C30.8059 14.0824 30.906 14.8456 30.906 15.8778Z"
                fill="#FDFDFD"
              />
            </Svg>
          </View>
        )}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={{
          ...style.button,
          ...style.normal,
          ...styles,
          opacity: disabled ? 0.85 : 1,
        }}
        onPress={isLoading ? undefined : onPress}>
        {isLoading === true ? (
          <View>
            <ActivityIndicator size="large" color={WHITE_COLOR} />
          </View>
        ) : (
          <Text style={style.text}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
};

const style = StyleSheet.create({
  button: {
    width: scale(316),
    height: scale(60),
    borderColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 15,
  },
  normal: {
    backgroundColor: THEMED_BLUE_COLOR,
  },
  facebook: {
    backgroundColor: FACEBOOK_COLOR,
  },
  google: {
    backgroundColor: GOOGLE_COLOR,
  },
  btnText: {
    position: 'relative',
    paddingTop: verticalScale(17),
    flex: 1,
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    position: 'relative',
    fontSize: scale(20),
    fontFamily: 'Poppins-SemiBold',
    color: WHITE_COLOR,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  icon: {
    marginLeft: scale(22),
    marginTop: scale(-1),
    width: scale(32),
    height: scale(32),
  },
});

export default Button;
