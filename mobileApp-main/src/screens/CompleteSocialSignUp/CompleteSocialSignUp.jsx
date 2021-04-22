import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import AuthHeader from 'components/AuthHeader';
import AuthHeaderLayout from 'components/AuthHeaderLayout';
import Button from 'components/Button';
import Input from 'components/Input';
import ProgressBar from 'components/ProgressBar';
import FullScreenLoader from 'components/FullScreenLoader';

import { SocialSignUpSchema } from 'helpers/schemas';
import { ApiError } from 'helpers/api';
import amplitudeInstance from 'helpers/amplitude.helper';
import * as constants from 'helpers/constants';
import * as userActions from 'resources/user/user.actions';

import styles from './CompleteSocialSignUp.styles';

function CompleteSocialSignUp({ navigation, route }) {
  const { verificationToken, email, facebook, google, apple } = route.params;
  const [isSubmitting, setSubmitting] = useState(false);
  const [isEmailDisabled, setEmailDisabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      setEmailDisabled(true);
    }
  }, []);

  const onSubmit = useCallback(
    async (userData, { setErrors }) => {
      try {
        setSubmitting(true);
        await dispatch(
          userActions.signUp({
            ...userData,
            facebook,
            google,
            apple,
            verificationToken,
          }),
        );

        setSubmitting(false);
        navigation.navigate('PinCodeChoose', {
          withLogo: false,
          showProgressBar: true,
          pinFlow: constants.AUTH.SIGN_UP,
        });
        amplitudeInstance.logEvent(
          constants.ANALYTICS_EVENTS.SIGNUP_ENTERS_INFO,
        );
      } catch (e) {
        if (e instanceof ApiError) {
          setErrors(e.data);
          setSubmitting(false);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUp' }],
          });
        }
      }
    },
    [navigation, verificationToken, facebook, google, apple],
  );

  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    isValid,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    onSubmit,
    initialValues: {
      email,
      username: '',
    },
    validateOnMount: true,
    validationSchema: SocialSignUpSchema,
  });

  const handleInputChange = useCallback(
    (fieldName, value) => {
      setFieldTouched(fieldName, false);
      setFieldValue(fieldName, value.trim());
    },
    [setFieldValue, setFieldTouched],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isSubmitting && <FullScreenLoader />}
      <View style={styles.screen}>
        <AuthHeaderLayout style={styles.authHeaderLayout}>
          <ProgressBar currentStep={2} totalSteps={3} />
          <AuthHeader
            title="Complete Your Account"
            subtitle="Enter your email and choose a DuniaPay username"
          />
        </AuthHeaderLayout>
        <View style={styles.wrapperInput}>
          <Input
            label="Email address"
            value={values.email}
            onChangeText={(e) => handleInputChange('email', e)}
            onBlur={handleBlur('email')}
            errorMessage={touched.email ? errors.email : ''}
            disabled={isEmailDisabled}
          />
          <Input
            label="Username"
            labelStyle={styles.passwordInput}
            value={values.username}
            onChangeText={(e) => handleInputChange('username', e)}
            onBlur={handleBlur('username')}
            errorMessage={touched.username ? errors.username : ''}
          />
        </View>
        <View style={styles.wrapperButton}>
          <Button disabled={!isValid} title="Sign up" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
}

CompleteSocialSignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      verificationToken: PropTypes.string.isRequired,
      email: PropTypes.string,
      facebook: PropTypes.string,
      google: PropTypes.string,
      apple: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default CompleteSocialSignUp;
