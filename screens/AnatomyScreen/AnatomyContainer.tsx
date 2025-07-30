import {View} from 'react-native';
import React from 'react';
import {Anatomy, AnatomyArray} from '../../global/types';
import AnatomyTile from './AnatomyTile';

type AnatomyContainerProps = {
  items: AnatomyArray;
};

const AnatomyContainer = ({items}: AnatomyContainerProps) => {
  return (
    <View>
      {items &&
        items.map(({name, svgIcon}: Anatomy, index: number) => {
          return <AnatomyTile key={index} name={name} svgIcon={svgIcon} />;
        })}
    </View>
  );
};

export default AnatomyContainer;
