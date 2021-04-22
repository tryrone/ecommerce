import React, { useCallback } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { getInitials } from 'helpers/utils.helper';
import { ANALYTICS_EVENTS } from 'helpers/constants';
import amplitudeInstance from 'helpers/amplitude.helper';

import Text from 'components/Text';
import Contact from 'components/Contact';

import styles from './ContactServerList.styles';

function ContactServerList({ title, listCrossContacts, navigation, sendFlow }) {
  const handleContactClick = useCallback(
    (userDataFromServer) => {
      navigation.navigate('SendDuniaMoney', {
        phoneContactName: userDataFromServer.givenName,
        duniapayName: userDataFromServer.username,
        recipientId: userDataFromServer.userId,
      });

      amplitudeInstance.logEvent(ANALYTICS_EVENTS.CHOOSE_CONTACT);
    },
    [navigation],
  );

  const onContactClick = (givenName, username, userId, phoneNumber) => {
    if (sendFlow === 'ContactList') {
      return () => {};
    }
    return handleContactClick({
      givenName,
      username,
      userId,
      phoneNumber,
    });
  };

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      {listCrossContacts.map(
        ({ givenName, username, userId, phoneNumber }, index) => (
          <Contact
            isLastContact={index === listCrossContacts.length - 1}
            icon={getInitials(givenName)}
            onContactClick={() => {
              onContactClick(givenName, username, userId, phoneNumber);
            }}
            key={userId}
          >
            <View style={styles.cardContent}>
              <Text style={styles.phoneContactName}>{givenName}</Text>
              <Text style={styles.duniaContactName}>{username}</Text>
            </View>
          </Contact>
        ),
      )}
    </>
  );
}

ContactServerList.propTypes = {
  listCrossContacts: PropTypes.arrayOf(
    PropTypes.shape({
      givenName: PropTypes.string,
      username: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string,
  sendFlow: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ContactServerList.defaultProps = {
  title: '',
  sendFlow: '',
};

export default ContactServerList;
