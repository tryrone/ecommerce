import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import * as userSelectors from 'resources/user/user.selectors';

import SignUp from 'screens/SignUp';
import ForgotPassword from 'screens/ForgotPassword';
import ResetPassword from 'screens/ResetPassword';
import InviteCode from 'screens/InviteCode';
import SignIn from 'screens/SignIn';
import AccountCreationCongratulations from 'screens/AccountCreationCongratulations';
import VerifyEmail from 'screens/VerifyEmail';
import CreateAccount from 'screens/CreateAccount';
import CompleteSocialSignUp from 'screens/CompleteSocialSignUp';
import PinCodeChoose from 'screens/PinCodeChoose';
import PinCodeEnter from 'screens/PinCodeEnter';
import ResetCode from 'screens/ResetCode';

import DismissKeyboard from 'components/DismissKeyboard';

import styles from './navigation.styles';

const AuthStack = createStackNavigator();

function AuthScreens({ token }) {
  const pinCode = useSelector(userSelectors.getPinCode);
  const pinCodeAttempts = useSelector(userSelectors.getPinCodeAttempts);

  const isValidAttemp = useMemo(() => {
    return pinCodeAttempts === 0;
  }, [pinCodeAttempts]);

  const initialRouteName = useMemo(() => {
    if (token && pinCode && !isValidAttemp) {
      return 'PinCodeEnter';
    }
    if (token && pinCode && isValidAttemp) {
      return 'SignIn';
    }
    return 'SignUp';
  }, [token, pinCode, isValidAttemp]);

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.authScreen}>
        <AuthStack.Navigator
          headerMode="none"
          initialRouteName={initialRouteName}
        >
          <AuthStack.Screen name="SignUp" component={SignUp} />
          <AuthStack.Screen name="InviteCode" component={InviteCode} />
          <AuthStack.Screen name="ResetCode" component={ResetCode} />
          <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
          <AuthStack.Screen
            name="CompleteSocialSignUp"
            component={CompleteSocialSignUp}
          />
          <AuthStack.Screen name="PinCodeChoose" component={PinCodeChoose} />
          <AuthStack.Screen name="PinCodeEnter" component={PinCodeEnter} />
          <AuthStack.Screen name="SignIn" component={SignIn} />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          <AuthStack.Screen
            name="AccountCreationCongratulations"
            component={AccountCreationCongratulations}
          />
          <AuthStack.Screen name="VerifyEmail" component={VerifyEmail} />
        </AuthStack.Navigator>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

AuthScreens.propTypes = {
  token: PropTypes.string,
};

AuthScreens.defaultProps = {
  token: null,
};

export default AuthScreens;
