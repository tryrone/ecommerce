import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import * as constants from 'helpers/constants';
import AuthHeader from 'components/AuthHeader';
import HeaderWithBackArrow from 'components/HeaderWithBackArrow';
import AuthHeaderLayout from 'components/AuthHeaderLayout';
import Button from 'components/Button';
import ButtonLink from 'components/ButtonLink';
import Input from 'components/Input';
import Text from 'components/Text';
import SocialButtons from 'components/SocialButtons';
import { SignInSchema } from 'helpers/schemas';
import ApiError from 'helpers/api/api.error';
import { setPassword } from 'helpers/keychain.helper';

import * as userActions from 'resources/user/user.actions';

import styles from './SignIn.styles';

const initialValues = {
  email: '',
  password: '',
};

function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    async (values, { setErrors }) => {
      await setPassword('');
      try {
        await dispatch(userActions.signIn(values));

        navigation.navigate('PinCodeChoose', {
          withLogo: true,
          showProgressBar: false,
          pinFlow: constants.AUTH.SIGN_IN,
        });
      } catch (e) {
        if (e instanceof ApiError) {
          setErrors(e.data);
        } else {
          throw e;
        }
      }
    },
    [dispatch],
  );

  const onBackNavigation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
    initialValues,
    validateOnMount: true,
    validationSchema: SignInSchema,
  });
  const handleEmailChange = useCallback(
    (value) => {
      setFieldTouched('email', false);
      setFieldValue('email', value.trim());
    },
    [setFieldValue, setFieldTouched],
  );

  const navigateToResetPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.screen}>
        <AuthHeaderLayout>
          <HeaderWithBackArrow onBackNavigation={onBackNavigation}>
            <AuthHeader
              withLogo
              title="Welcome Back!"
              subtitle="Enter your email address and password to sign in"
            />
          </HeaderWithBackArrow>
        </AuthHeaderLayout>
        <View style={styles.wrapperInput}>
          <Input
            label="Email address"
            value={values.email}
            onChangeText={handleEmailChange}
            onBlur={handleBlur('email')}
            errorMessage={touched.email ? errors.email : ''}
            inputWrapperStyle={errors.credentials && styles.inputOutOfFocused}
          />
          <Input
            labelStyle={styles.passwordInput}
            label="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            textContentType="password"
            onBlur={handleBlur('password')}
            errorMessage={touched.password ? errors.password : ''}
            inputWrapperStyle={errors.credentials && styles.inputOutOfFocused}
          />
          {errors.credentials && (
            <Text style={styles.textError}>{errors.credentials}</Text>
          )}
        </View>
        <View style={styles.forgotWrapper}>
          <Text style={styles.forgotText}>Forgot password? </Text>
          <ButtonLink
            textStyle={styles.forgotLink}
            title="Reset it"
            onPress={navigateToResetPassword}
          />
        </View>
        <View style={styles.wrapperButton}>
          <SocialButtons
            title="or sign in with your social account"
            type={constants.AUTH.SIGN_IN}
          />
          <Button disabled={!isValid} title="Sign in" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignIn;
