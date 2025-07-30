import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {THEMED_BLUE_COLOR} from '../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

const Spinner = () => {
  return (
    <SafeAreaView>
      <ActivityIndicator
        style={styles.spinner}
        size="large"
        color={THEMED_BLUE_COLOR}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    alignContent: 'center',
    transform: [
      {
        scaleX: 1.5,
      },
      {
        scaleY: 1.5,
      },
    ],
  },
});

export default Spinner;
