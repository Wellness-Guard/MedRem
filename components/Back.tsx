import React from 'react';
import {TouchableOpacity} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import {LIGHT_GREY} from '../constants/colors';
import {scale} from 'react-native-size-matters';
type BackProps = {
  back: () => void;
  styles?: object;
};
const Back = ({back, styles}: BackProps) => {
  return (
    <TouchableOpacity onPress={back}>
      <FontAwesomeIcon
        style={[{margin: scale(10), color: LIGHT_GREY}, styles]}
        icon={faArrowLeft}
        size={scale(25)}
      />
    </TouchableOpacity>
  );
};

export default Back;
