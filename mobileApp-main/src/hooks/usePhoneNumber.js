import { useState, useCallback, useRef } from 'react';
import { ApiError } from 'helpers/api';

function usePhoneNumber(handleSubmit) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState(null);
  const phoneNumberInputRef = useRef();

  const onChangePhone = useCallback(
    (text) => {
      setPhoneError(null);
      setPhoneNumber(text);
    },
    [setPhoneError, setPhoneNumber],
  );

  const onChangeFormattedPhone = useCallback(
    (text) => {
      setPhoneError(null);
      setFormattedPhoneNumber(text);
    },
    [setPhoneError, setFormattedPhoneNumber],
  );

  const onContinue = useCallback(async () => {
    const isValidPhone = phoneNumberInputRef.current?.isValidNumber(
      phoneNumber,
    );
    if (!isValidPhone) {
      setPhoneError('Phone number is invalid');
      return;
    }

    try {
      await handleSubmit(formattedPhoneNumber);
    } catch (error) {
      if (error instanceof ApiError) {
        setPhoneError(error.data.phoneNumber);
      }
    }
  }, [phoneNumber, handleSubmit, formattedPhoneNumber]);

  return {
    onChangePhone,
    onContinue,
    onChangeFormattedPhone,
    phoneError,
    phoneNumber,
    formattedPhoneNumber,
    phoneNumberInputRef,
    setPhoneError,
  };
}

export default usePhoneNumber;
