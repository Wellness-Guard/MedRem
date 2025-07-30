import {StyleSheet, View} from 'react-native';
import React from 'react';
import Layout from '../../Layout/Layout';
import Back from '../../components/Back';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../global/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import Heading from '../../components/Heading';
import {faRadio} from '@fortawesome/free-solid-svg-icons';
import Option from '../../components/Option';
import {verticalScale} from 'react-native-size-matters';

const LanguageSetting = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const languages = [
    {
      label: 'English',
    },
  ];
  return (
    <Layout>
      <Back back={() => navigation.goBack()} />
      <SafeAreaView style={styles.frame}>
        <Heading text="Language Setting" />
        <View style={styles.options}>
          <Option
            type="radio"
            title="English"
            status={true}
            loading={false}
            action={() => console.log('change language')}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  frame: {
    alignItems: 'center',
  },
  options: {
    marginTop: verticalScale(30),
  },
});

export default LanguageSetting;
