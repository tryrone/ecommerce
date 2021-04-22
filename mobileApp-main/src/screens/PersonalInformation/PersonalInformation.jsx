import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as userActions from 'resources/user/user.actions';
import * as userSelectors from 'resources/user/user.selectors';
import { COUNTRIES } from 'helpers/constants';
import usePhoneNumber from 'hooks/usePhoneNumber';

import Text from 'components/Text';
import Input from 'components/Input';
import MainHeader from 'components/MainHeader';
import PhoneNumberInput from 'components/PhoneNumberInput';
import Button from 'components/Button';
import FullScreenLoader from 'components/FullScreenLoader';
import SelectCountries from 'components/SelectCountries';
import DatePickerInput from 'components/DatePickerInput';

import styles from './PersonalInformation.styles';

function PersonalInformation() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  const initialValues = useSelector(userSelectors.getUserData);
  const handleSubmit = useCallback(
    async (phoneNumber) => {
      try {
        setLoading(true);

        if (phoneNumber === initialValues.phoneNumber) return;
        await dispatch(userActions.updatePhoneNumber(phoneNumber));
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  const {
    onChangeFormattedPhone,
    phoneNumberInputRef,
    phoneError,
    onContinue,
    onChangePhone,
  } = usePhoneNumber(handleSubmit);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        await dispatch(userActions.getCurrentUser());
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <>
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <SafeAreaView style={styles.wrapper}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={30}
            style={styles.wrapper}
          >
            <ScrollView
              style={styles.wrapper}
              contentContainerStyle={styles.container}
            >
              <View style={styles.wrapper}>
                <MainHeader title="Personal Information" />
                <View style={styles.content}>
                  <View style={styles.inputWrapper}>
                    <Input
                      label="First Name"
                      disabled
                      name="firstName"
                      value={initialValues.firstName}
                      inputLabelWrapper={styles.input}
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      disabled
                      value={initialValues.lastName}
                      inputLabelWrapper={styles.input}
                    />
                    <DatePickerInput
                      disabled
                      label="Birth Date"
                      value={initialValues.birthDate}
                      placeholder="Select a date"
                    />
                    <SelectCountries
                      disabled
                      selectedCountry={initialValues.country || COUNTRIES[1].name}
                      style={styles.input}
                    />
                    <Input
                      name="email"
                      label="Email"
                      value={initialValues.email}
                      disabled
                      inputLabelWrapper={styles.input}
                    />

                    <Text style={styles.label}>Phone Number</Text>
                    <PhoneNumberInput
                      phoneNumber={initialValues.phoneNumber || ''}
                      name="phoneNumber"
                      inputRef={phoneNumberInputRef}
                      onChangeFormattedPhone={onChangeFormattedPhone}
                      error={phoneError}
                      onChangePhone={onChangePhone}
                    />
                  </View>
                  <Button
                    title="Save Changes"
                    onPress={onContinue}
                    style={styles.button}
                    disabled={Boolean(phoneError)}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
}

export default PersonalInformation;
