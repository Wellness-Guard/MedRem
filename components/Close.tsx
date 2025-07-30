import React from 'react';
import {TouchableOpacity} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import {WHITE_COLOR} from '../constants/colors';
type CloseProps = {
  close?: () => void;
  style?: object;
};
const Close = ({close, style}: CloseProps) => {
  return (
    <TouchableOpacity onPress={close}>
      <FontAwesomeIcon
        style={{color: WHITE_COLOR, ...style}}
        icon={faTimes}
        size={30}
      />
    </TouchableOpacity>
  );
};

export default Close;
