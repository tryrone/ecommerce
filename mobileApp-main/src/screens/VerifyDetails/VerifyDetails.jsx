import React, { useCallback, useEffect } from 'react';
import {
  View,
  NativeEventEmitter,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { PassbaseSDK } from '@passbase/react-native-passbase';
import config from 'resources/config';

import AuthHeader from 'components/AuthHeader';
import AuthHeaderLayout from 'components/AuthHeaderLayout';
import Button from 'components/Button';
import HeaderWithBackArrow from 'components/HeaderWithBackArrow';
import Input from 'components/Input';
import SelectCountries from 'components/SelectCountries';
import DatePickerInput from 'components/DatePickerInput';
import { VerifyDetailsSchema } from 'helpers/schemas';
import * as usersApi from 'resources/user/user.api';

import styles from './VerifyDetails.styles';

const initialValues = {
  firstName: '',
  lastName: '',
  birthDate: '',
  country: '',
  identityAccessKey: null,
};

function VerifyDetails({ navigation }) {
  const handleStartVerification = useCallback(async () => {
    await PassbaseSDK.initialize(config.passbaseApiKey);

    return PassbaseSDK.startVerification();
  }, []);

  const onSubmit = useCallback((userData) => {
    return usersApi.startVerification(userData);
  }, []);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isValid,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    onSubmit,
    initialValues,
    validationSchema: VerifyDetailsSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    const subscription = new NativeEventEmitter(PassbaseSDK);

    subscription.addListener('onFinish', async ({ identityAccessKey }) => {
      setFieldValue('identityAccessKey', identityAccessKey);
      await handleSubmit();
      navigation.navigate('Congratulations', {
        title: 'Congratulations!',
        buttonName: 'Back to Wallet',
        screenStyle: styles.successScreen,
        onContinuePress: () => navigation.navigate('Homepage'),
        subTitle: 'Your identity is now verified',
      });
    });
    subscription.addListener('onError', ({ errorCode }) => {
      if (errorCode === 'CANCELLED_BY_USER') {
        return;
      }

      Alert.alert('Something went wrong. Please, try again later...');
    });

    return () => {
      subscription.removeAllListeners('onFinish');
      subscription.removeAllListeners('onError');
    };
  }, []);

  const onBackNavigation = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}
        keyboardVerticalOffset={30}
      >
        <ScrollView
          style={styles.wrapper}
          contentContainerStyle={styles.container}
        >
          <View style={styles.screen}>
            <AuthHeaderLayout>
              <HeaderWithBackArrow onBackNavigation={onBackNavigation}>
                <AuthHeader
                  title="Verify your details"
                  subtitle="Enter your details as they appear on your personal documents"
                />
              </HeaderWithBackArrow>
            </AuthHeaderLayout>
            <View style={styles.formWrapper}>
              <Input
                inputLabelWrapper={styles.input}
                label="First name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                errorMessage={touched.firstName ? errors.firstName : ''}
              />
              <Input
                inputLabelWrapper={styles.input}
                label="Last name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                errorMessage={touched.lastName ? errors.lastName : ''}
              />
              <SelectCountries
                name="country"
                style={styles.input}
                label="Country of residence"
                selectedCountry={values.country}
                onChange={handleChange('country')}
              />
              <DatePickerInput
                label="Date of birth"
                value={values.birthDate}
                onChange={handleChange('birthDate')}
                maxDate={new Date()}
              />
            </View>
            <Button
              style={styles.button}
              disabled={!isValid}
              onPress={handleStartVerification}
              title="Get Started"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

VerifyDetails.propTypes = {
  navigation: PropTypes.shape({
    canGoBack: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default VerifyDetails;
