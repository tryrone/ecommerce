import React, { useCallback } from 'react';
import { View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getInitials } from 'helpers/utils.helper';
import { APP_LINKS } from 'helpers/constants';

import * as userSelectors from 'resources/user/user.selectors';
import * as userApi from 'resources/user/user.api';
import Text from 'components/Text';
import Contact from 'components/Contact';

import styles from './InviteContactServerList.styles';

function InviteContactServerList({ title, listNotDuniapayUsers }) {
  const userData = useSelector(userSelectors.getUserData);

  const handleInviteClick = useCallback(async ({ phoneNumber, givenName }) => {
    try {
      await userApi.sendInvite({
        phoneNumber,
        smsBody: `Hey there! Let's use DuniaPay together! 
                  My username is: ${userData.username}. 
                  To join the app on ios: ${APP_LINKS.IOS}, 
                  on android: ${APP_LINKS.ANDROID}`,
      });
      Alert.alert(
        'Invitation Sent',
        `You have invited ${givenName} to use DuniaPay`,
      );
    } catch (e) {
      Alert.alert('Error', e.data.code);
    }
  }, []);

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      {listNotDuniapayUsers.map(({ givenName, phoneNumber }, index) => (
        <Contact
          isLastContact={index === listNotDuniapayUsers.length - 1}
          icon={getInitials(givenName)}
          onInviteClick={() => {
            handleInviteClick({ phoneNumber, givenName });
          }}
          key={Math.random()}
          isRightIcon
        >
          <View style={styles.cardContent}>
            <Text style={styles.phoneContactName}>{givenName}</Text>
          </View>
        </Contact>
      ))}
    </>
  );
}

InviteContactServerList.propTypes = {
  listNotDuniapayUsers: PropTypes.arrayOf(
    PropTypes.shape({
      givenName: PropTypes.string,
      phoneNumber: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string,
};

InviteContactServerList.defaultProps = {
  title: '',
};

export default InviteContactServerList;
