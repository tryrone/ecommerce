import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Alert, ActivityIndicator } from 'react-native';

import * as userApi from 'resources/user/user.api';
import { getContactsFromPhoneBook } from 'helpers/utils.helper';

import SearchIcon from 'assets/icons/search.svg';

import colors from 'themes/colors';

import MainHeader from 'components/MainHeader';
import DismissKeyboard from 'components/DismissKeyboard';
import NoContact from 'components/NoContact';
import Input from 'components/Input';
import InviteContactServerList from './components/InviteContactServerList';

import styles from './InviteContacts.styles';

function InviteContacts() {
  const [listNotDuniapayUsers, setListNotDuniapayUsers] = useState([]);
  const [filteredContactsList, setFilteredContactsList] = useState([]);
  const [searchText, setSearchText] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const listPhoneContacts = await getContactsFromPhoneBook();
        const notDuniapayUsers = await userApi.getNotDuniapayUsers(
          listPhoneContacts,
        );
        setListNotDuniapayUsers(notDuniapayUsers);
        setFilteredContactsList(notDuniapayUsers);
      } catch (e) {
        Alert.alert('Warning', 'Please reload screen');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [setListNotDuniapayUsers]);

  const onChangeSearchText = useCallback(
    (text) => {
      setSearchText(text);
      const formattedText = text.trim().toLowerCase();
      if (formattedText) {
        const filteredList = listNotDuniapayUsers.filter((contact) => {
          return contact.givenName.toLowerCase().includes(formattedText);
        });
        setFilteredContactsList(filteredList);
      } else {
        setFilteredContactsList(listNotDuniapayUsers);
      }
    },
    [listNotDuniapayUsers],
  );

  return (
    <DismissKeyboard>
      <MainHeader title="Contacts" />
      <View style={styles.screenContent}>
        <Input
          value={searchText}
          onChangeText={onChangeSearchText}
          placeholder="Search by name"
          leftIcon={SearchIcon}
        />
        {filteredContactsList.length ? (
          <ScrollView style={styles.scrollView}>
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.theme} />
            ) : (
              <InviteContactServerList
                title="NOT DUNIAPAY USERS"
                listNotDuniapayUsers={filteredContactsList}
              />
            )}
          </ScrollView>
        ) : (
          <NoContact
            title="No contacts to invite"
            subTitle="All of your contacts already use DuniaPay."
          />
        )}
      </View>
    </DismissKeyboard>
  );
}

export default InviteContacts;
