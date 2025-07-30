import React from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Layout from '../../Layout/Layout';
import Back from '../../components/Back';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../components/Heading';
import {verticalScale} from 'react-native-size-matters';
import Tile from '../../components/Tile';
import PrescribedSvg from '../../assets/svgImages/prescribed.svg';
import DailySvg from '../../assets/svgImages/daily.svg.svg';
import Paragraph from '../../components/Paragraph';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../global/types';

const Medication = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  return (
    <Layout>
      <Back back={() => navigation.goBack()} />
      <SafeAreaView style={styles.screen}>
        <Heading text="Start Medication" />
        <Paragraph
          text={'Select your medication Type'}
          style={styles.paragraph}
        />

        <TouchableOpacity
          style={{paddingTop: verticalScale(50)}}
          onPress={() => navigation.navigate('PrescribedPlan')}>
          <Tile title="Prescribed Plan" svgImage={<PrescribedSvg />} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingTop: verticalScale(50)}}>
          <Tile title="Supplements" svgImage={<DailySvg />} />
        </TouchableOpacity>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: verticalScale(20),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paragraph: {
    paddingTop: verticalScale(10),
  },
});

export default Medication;
