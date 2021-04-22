import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import PropTypes from 'prop-types';

import colors from 'themes/colors';

import Text from 'components/Text';

import { COUNTRIES } from 'helpers/constants';

import ArrowDown from 'assets/icons/arrowDown.svg';

import styles from './SelectCountries.styles';

const countries = COUNTRIES.map(({ name, icon }) => ({
  label: name,
  value: name,
  icon,
}));

const getCountryIcon = (country) => {
  const { icon } = COUNTRIES.find(({ name }) => name === country);
  return icon;
};

function SelectCountries({
  selectedCountry,
  onChange,
  style,
  label,
  placeholder,
  disabled,
}) {
  let Country;
  if (disabled) {
    Country = getCountryIcon(selectedCountry);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      {disabled ? (
        <View style={styles.inputDisabled}>
          <Country />
          <Text style={styles.countryDisabled}>{selectedCountry}</Text>
          <ArrowDown style={styles.arrowDownDisabled} />
        </View>
      ) : (
        <DropDownPicker
          containerStyle={styles.dropdownContainer}
          items={countries}
          defaultValue={selectedCountry}
          style={styles.input}
          dropDownStyle={styles.dropdown}
          placeholder={placeholder}
          selectedLabelStyle={styles.selectedLabel}
          activeLabelStyle={styles.activeLabel}
          placeholderStyle={styles.placeholderStyle}
          arrowColor={colors.black}
          arrowStyle={styles.arrow}
          itemStyle={styles.item}
          onChangeItem={(item) => onChange(item.value)}
        />
      )}
    </View>
  );
}

SelectCountries.propTypes = {
  selectedCountry: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  style: ViewPropTypes.style,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectCountries.defaultProps = {
  style: null,
  label: 'Country',
  disabled: false,
  placeholder: 'Select a country',
  onChange: () => {},
};

export default SelectCountries;
