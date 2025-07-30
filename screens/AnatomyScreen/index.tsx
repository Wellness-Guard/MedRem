import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Back from '../../components/Back';
import Heading from '../../components/Heading';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../global/types';
import Layout from '../../Layout/Layout';
import AnatomyTile from './AnatomyTile';
import {AnatomyArray} from '../../global/types';
import Heart from '../../assets/svgImages/Heart.svg';
import Brain from '../../assets/svgImages/Brain.svg';
import Stomach from '../../assets/svgImages/Stomach.svg';
import Lungs from '../../assets/svgImages/Lungs.svg';
import Kidneys from '../../assets/svgImages/Kidneys.svg';
import AnatomyContainer from './AnatomyContainer';
const AnatomyScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const anatomyArray: AnatomyArray = [
    {
      name: 'Brain',
      svgIcon: <Brain />,
    },
    {
      name: 'Heart',
      svgIcon: <Heart />,
    },
    {
      name: 'Kidneys',
      svgIcon: <Kidneys />,
    },
    {
      name: 'Lungs',
      svgIcon: <Lungs />,
    },
    {
      name: 'Stomach',
      svgIcon: <Stomach />,
    },
  ];
  return (
    <Layout>
      <Back back={() => navigation.goBack()} />
      <SafeAreaView style={styles.screen}>
        <Heading text="Human Anatomy" />
        <AnatomyContainer items={anatomyArray} />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    // marginTop: verticalScale(20),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default AnatomyScreen;
