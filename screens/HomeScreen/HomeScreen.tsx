import React, {useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Layout from '../../Layout/Layout';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import Toast from 'react-native-toast-message';
import Banner from '../../components/Banner';
import DoctorSVG from '../../assets/svgImages/doctors.svg';
import {verticalScale, scale} from 'react-native-size-matters';
import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import Tile from '../../components/Tile';
import StartMedication from '../../assets/svgImages/start-medication.svg';
import HistorySVGImage from '../../assets/svgImages/history.svg';
import NotificationSVGImage from '../../assets/svgImages/notification.svg';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams, TabParams} from '../../global/types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const _navigation = useNavigation<BottomTabNavigationProp<TabParams>>();
  const dispatch = useDispatch<AppDispatch>();
  const {error, success, isLoggedIn} = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: `❌ ${error}`,
        swipeable: true,
      });
    }
    // if (success) {
    //   Toast.show({
    //     type: 'success',
    //     text1: `✅ ${success}`,
    //     swipeable: true,
    //   });
    // }
    if (!isLoggedIn) {
      navigation.navigate('SignIn');
    }
  }, [error, navigation, success, isLoggedIn]);

  return (
    <Layout>
      <SafeAreaView style={styles.safeAreaFrame}>
        <ScrollView>
          <View style={styles.banner}>
            <Banner
              title={'The importance of adhering to your medication schedule.'}
              svgImage={<DoctorSVG width={160} height={130} />}
            />
          </View>
          <View style={styles.feature}>
            <Heading text="Features" />
            <Paragraph
              text="Utilize the advantages offered by the following features."
              style={{lineHeight: verticalScale(25)}}
            />
          </View>
          <View style={styles.tiles}>
            <TouchableOpacity style={styles.tileStyle}>
              <Tile title="Start Medication" svgImage={<StartMedication />} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tileStyle}>
              <Tile title="History" svgImage={<HistorySVGImage />} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tileStyle}
              onPress={() => _navigation.navigate('Notification')}>
              <Tile title="Notifications" svgImage={<NotificationSVGImage />} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tileStyle}
              onPress={() => _navigation.navigate('Anatomy')}>
              <Tile title="Anatomy" svgImage={<NotificationSVGImage />} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    alignSelf: 'center',
  },
  safeAreaFrame: {
    marginTop: verticalScale(60),
  },

  feature: {
    marginTop: verticalScale(28),
    marginLeft: scale(15),
  },
  tileStyle: {
    marginTop: verticalScale(15),
    marginLeft: scale(15),
  },
  tiles: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default HomeScreen;
