import React, { useCallback, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import MainHeader from 'components/MainHeader';
import Button from 'components/Button';
import Input from 'components/Input';
import FullScreenLoader from 'components/FullScreenLoader';
import PasswordRules from 'components/PasswordRules';

import { CreateNewPasswordSchema } from 'helpers/schemas';
import * as userApi from 'resources/user/user.api';

import styles from './CreateNewPassword.styles';

const initialValues = {
  password: '',
  repeatPassword: '',
  currentPassword: '',
};

function CreateNewPassword({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const {
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
    errors,
    touched,
    handleBlur,
    handleSubmit,
  } = useFormik({
    onSubmit: async (data, { setErrors }) => {
      try {
        setLoading(true);
        await userApi.createNewPassword({
          currentPassword: data.currentPassword,
          newPassword: data.password,
        });
        setLoading(false);
        navigation.navigate('PinCodeReset');
      } catch (e) {
        setErrors(e.data);
        setLoading(false);
      }
    },
    validateOnMount: true,
    validationSchema: CreateNewPasswordSchema,
    initialValues,
  });

  const handleChangePassword = useCallback(
    (value) => {
      setFieldValue('password', value);
      setFieldTouched('password', false);
    },
    [setFieldValue, setFieldTouched],
  );

  const handleChangeRepeatPassword = useCallback(
    (value) => {
      setFieldValue('repeatPassword', value);
      setFieldTouched('repeatPassword', false);
    },
    [setFieldValue, setFieldTouched],
  );

  const handleChangeCurrentPassword = useCallback(
    (value) => {
      setFieldValue('currentPassword', value);
      setFieldTouched('currentPassword', false);
    },
    [setFieldValue, setFieldTouched],
  );

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}
        keyboardVerticalOffset={30}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {isLoading && <FullScreenLoader />}
          <MainHeader
            title="Reset Password"
            subTitle="Enter you current password, then create a new one and repeat it"
          />
          <View style={styles.wrapperInput}>
            <Input
              label="Current Password"
              value={values.currentPassword}
              onChangeText={handleChangeCurrentPassword}
              textContentType="password"
              errorMessage={
                touched.currentPassword ? errors.currentPassword : ''
              }
              onBlur={handleBlur('currentPassword')}
            />
            <Input
              label="New password"
              labelStyle={styles.passwordInput}
              value={values.password}
              onChangeText={handleChangePassword}
              textContentType="password"
              errorMessage={touched.password ? errors.password : ''}
              onBlur={handleBlur('password')}
            />
            <PasswordRules style={styles.passwordRulesWrapper} />
            <Input
              labelStyle={styles.passwordInput}
              label="Repeat new password"
              value={values.repeatPassword}
              onChangeText={handleChangeRepeatPassword}
              textContentType="password"
              onBlur={handleBlur('repeatPassword')}
              errorMessage={touched.repeatPassword ? errors.repeatPassword : ''}
            />
          </View>
          <View style={styles.wrapperButton}>
            <Button
              disabled={!isValid}
              title="Next"
              style={styles.button}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

CreateNewPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default CreateNewPassword;
