import React from 'react';
import { View, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import RightIcon from 'components/RightIcon';

import Plus from 'assets/icons/plus.svg';

import LeftIcon from './LeftIcon';

import styles from './Contact.styles';

function Contact({
  icon,
  onContactClick,
  onInviteClick,
  children,
  isLastContact,
  isRightIcon,
  isDivideLine,
  contactInfoStyles,
}) {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.contactInfoContainer, contactInfoStyles]}
          onPress={onContactClick}
          activeOpacity={1}
        >
          <LeftIcon icon={icon} />
          {children}
        </TouchableOpacity>
        {isRightIcon && (
          <RightIcon
            onRightIconClick={onInviteClick}
            rightIconText="Invite"
            rightIcon={Plus}
          />
        )}
      </View>
      {!isLastContact && isDivideLine && <View style={styles.divideLine} />}
    </>
  );
}

Contact.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onContactClick: PropTypes.func,
  onInviteClick: PropTypes.func,
  isLastContact: PropTypes.bool,
  isRightIcon: PropTypes.bool,
  isDivideLine: PropTypes.bool,
  contactInfoStyles: ViewPropTypes.style,
};

Contact.defaultProps = {
  onContactClick: () => {},
  onInviteClick: () => {},
  isLastContact: false,
  isRightIcon: false,
  isDivideLine: true,
  contactInfoStyles: null,
};

export default Contact;
