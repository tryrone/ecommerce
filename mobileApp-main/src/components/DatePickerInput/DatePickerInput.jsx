import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Calendar from 'assets/icons/calendar.svg';

import Text from 'components/Text';
import Input from 'components/Input';

import styles from './DatePickerInput.styles';

const timeOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};
const locale = 'en-US';
function DatePickerInput({
  onChange,
  placeholder,
  disabled,
  minDate,
  maxDate,
  initialValue,
  label,
  value,
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const formattedDate = useMemo(() => {
    if (!value) {
      return placeholder;
    }
    const date = new Date(value);
    return date.toLocaleDateString(locale, timeOptions);
  }, [value, placeholder]);

  const onOpenModal = useCallback(() => {
    setDatePickerVisibility(true);
  }, [setDatePickerVisibility]);

  const hideModal = useCallback(() => {
    setDatePickerVisibility(false);
  }, [setDatePickerVisibility]);

  const onSelectDate = useCallback(
    (selectedDate) => {
      setDatePickerVisibility(false);
      onChange(selectedDate.toISOString());
    },
    [setDatePickerVisibility, onChange],
  );

  return (
    <View>
      {!!label && <Text style={styles.label}>{label}</Text>}
      {disabled ? (
        <Input
          name="birthDate"
          disabled
          value={formattedDate}
          inputLabelWrapper={styles.input}
        />
      ) : (
        <>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={onOpenModal}
            activeOpacity={0.6}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              {formattedDate}
            </Text>
            <Calendar />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onCancel={hideModal}
            onConfirm={onSelectDate}
            date={initialValue}
            minimumDate={minDate}
            maximumDate={maxDate}
          />
        </>
      )}
    </View>
  );
}

DatePickerInput.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  initialValue: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  label: PropTypes.string,
};

DatePickerInput.defaultProps = {
  placeholder: 'Select a date',
  onChange: () => {},
  label: '',
  value: null,
  initialValue: new Date(),
  maxDate: null,
  minDate: null,
  disabled: false,
};

export default DatePickerInput;
