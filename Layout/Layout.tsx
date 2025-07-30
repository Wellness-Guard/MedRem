import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet} from 'react-native';
import Shape from '../assets/svgImages/shape.svg';
import {BACKGROUND_COLOR} from '../constants/colors';
import {scale, verticalScale} from 'react-native-size-matters';

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};
const Layout = ({children}: LayoutProps) => {
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      {/* <Shape
        style={styles.img}
        width={scale(150)}
        height={verticalScale(150)}
      /> */}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    position: 'absolute',
  },
  background: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
  },
});

export default Layout;
