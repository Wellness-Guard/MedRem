import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faCamera} from '@fortawesome/free-solid-svg-icons';
import {scale} from 'react-native-size-matters';
import {
  BACKGROUND_COLOR,
  LIGHT_GREY,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
} from '../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

type PictureProps = {
  src?: string;
  styles?: object;
  toggleModal?: () => void;
};

const Picture = ({src, toggleModal}: PictureProps) => {
  return (
    <View style={{...style.container}}>
      <TouchableOpacity style={style.uploader} onPress={toggleModal}>
        <FontAwesomeIcon
          icon={faCamera}
          size={scale(25)}
          color={THEMED_BLUE_COLOR}
        />
      </TouchableOpacity>
      {src && src !== null ? (
        <Image style={style.image} source={{uri: src}} />
      ) : (
        <FontAwesomeIcon
          icon={faUser}
          size={scale(110)}
          color={BACKGROUND_COLOR}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    width: scale(150),
    height: scale(150),
    borderRadius: 100,
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(160),
    height: scale(160),
    backgroundColor: LIGHT_GREY,
    borderRadius: 100,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  uploader: {
    marginLeft: '75%',
    // marginBottom: '70%',
  },
});

export default Picture;
