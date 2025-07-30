import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import VerificationSvg from '../../assets/svgImages/verification.svg';
import Heading from '../../components/Heading';
import Description from '../../components/Description';
import Button from '../../components/Button';
import {
  DARK_BLUE_COLOR,
  PRIMARY_COLOR,
  THEMED_BLUE_COLOR,
} from '../../constants/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type VerificationProps = {
  submit: (code: string) => void;
  loading: boolean;
  resend: () => void;
};

const VerificationScreen = ({submit, loading, resend}: VerificationProps) => {
  const CELL_COUNT = 5;
  const [value, setValue] = useState('');
  const code = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <Heading text="Email Verification" />
        <VerificationSvg height={200} width={200} />
        <Description
          style={styles.description}
          text={'Enter the verification code we sent you on email address'}
        />
        <CodeField
          ref={code}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <Text style={styles.text}>
          If you did not receive a code{' '}
          <Text onPress={() => resend()} style={styles.resend}>
            Resend
          </Text>
        </Text>
        <Button
          styles={styles.btn}
          title="Verify"
          isLoading={loading}
          disabled={value.length === 5 ? false : true}
          onPress={() => submit(value)}
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '15%',
  },
  description: {
    textAlign: 'center',
    width: '90%',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    marginBottom: scale(5),
  },
  resend: {
    fontFamily: 'Poppins-SemiBold',
  },
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: 50,
    marginBottom: 50,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: THEMED_BLUE_COLOR,
    borderBottomWidth: 1,
  },
  cellText: {
    color: THEMED_BLUE_COLOR,
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  focusCell: {
    borderBottomColor: DARK_BLUE_COLOR,
    borderBottomWidth: 2,
  },
  btn: {
    marginTop: verticalScale(60),
  },
});
