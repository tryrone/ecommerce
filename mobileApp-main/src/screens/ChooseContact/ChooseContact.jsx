import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';

import useThrottle from 'hooks/useThrottle';
import { SEND_FLOW } from 'helpers/constants';
import { getContactsFromPhoneBook } from 'helpers/utils.helper';

import * as userApi from 'resources/user/user.api';

import PlusIcon from 'assets/icons/plus.svg';
import SearchIcon from 'assets/icons/search.svg';

import colors from 'themes/colors';

import MainHeader from 'components/MainHeader';
import DismissKeyboard from 'components/DismissKeyboard';
import NoContact from 'components/NoContact';
import Input from 'components/Input';
import ContactServerList from './components/ContactServerList';

import styles from './ChooseContact.styles';

const getFilteredUsers = (userArray1, userArray2) => {
  const result = [...userArray1];
  const set = new Set(userArray1.map(({ userId }) => userId));

  userArray2.forEach((user) => {
    if (!set.has(user.userId)) {
      result.push(user);
    }
  });
  return result;
};

function ChooseContact({ navigation, route }) {
  const { sendFlow } = route.params;

  const [listCrossContacts, setListCrossContacts] = useState([]);
  const [filteredContactsList, setFilteredContactsList] = useState([]);
  const [searchText, setSearchText] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const listPhoneContacts = await getContactsFromPhoneBook();
        const crossContacts = await userApi.getCrossContacts(listPhoneContacts);
        setListCrossContacts(crossContacts);
        setFilteredContactsList(crossContacts);
      } catch (e) {
        Alert.alert('Warning', 'Please reload screen');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [setListCrossContacts]);

  const onInviteClick = useCallback(() => {
    navigation.navigate('InviteContacts');
  }, [navigation]);

  const throttleGetFilteredDuniapayUsers = useThrottle(
    async (filteredList, filter) => {
      const filteredDuniapayUsers = await userApi.getFilteredDuniapayUsers(
        filter,
      );
      setFilteredContactsList(
        getFilteredUsers(filteredList, filteredDuniapayUsers),
      );
    },
    1000,
  );

  const onChangeSearchText = useCallback(
    async (text) => {
      setSearchText(text);
      const formattedText = text.trim().toLowerCase();
      if (formattedText) {
        const filteredList = listCrossContacts.filter((contact) => {
          return contact.givenName.toLowerCase().includes(formattedText);
        });

        if (sendFlow === SEND_FLOW.DUNIAPAY) {
          await throttleGetFilteredDuniapayUsers(filteredList, {
            filter: formattedText,
          });
        } else {
          setFilteredContactsList(filteredList);
        }
      } else {
        setFilteredContactsList(listCrossContacts);
      }
    },
    [listCrossContacts],
  );

  const isContactFlow = useMemo(() => {
    return sendFlow === SEND_FLOW.CONTACT_LIST;
  }, [sendFlow]);

  const subTitle = useMemo(() => {
    if (filteredContactsList.length && !isContactFlow) {
      return 'Who would you like to pay?';
    }
    if (isContactFlow) return '';
    return ' ';
  }, [filteredContactsList.length, isContactFlow]);

  return (
    <DismissKeyboard>
      <MainHeader
        title={isContactFlow ? 'Contacts' : 'Send Money'}
        subTitle={subTitle}
        rightCornerText="Invite"
        handleRightIconClick={onInviteClick}
        rightIconStyle={styles.inviteContainer}
        rightIcon={isContactFlow ? PlusIcon : null}
      />
      <SafeAreaView style={styles.screen}>
        <View style={styles.screenContent}>
          <Input
            value={searchText}
            onChangeText={onChangeSearchText}
            placeholder="Search by name"
            leftIcon={SearchIcon}
          />
          {filteredContactsList.length ? (
            <ScrollView style={styles.contactsList}>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.theme} />
              ) : (
                <ContactServerList
                  title="ALL CONTACTS"
                  listCrossContacts={filteredContactsList}
                  navigation={navigation}
                  sendFlow={sendFlow}
                />
              )}
            </ScrollView>
          ) : (
            <NoContact
              title="No contacts"
              subTitle="No one from your contacts use DuniaPay."
            />
          )}
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

ChooseContact.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      sendFlow: PropTypes.oneOf(Object.values(SEND_FLOW)),
    }),
  }).isRequired,
};

export default ChooseContact;
