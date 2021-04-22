import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Home from 'assets/icons/home.svg';

import { ANALYTICS_EVENTS } from 'helpers/constants';
import useSlidingPanel from 'hooks/useSlidingPanel';
import { getLatestTransactions } from 'resources/user/user.api';
import amplitudeInstance from 'helpers/amplitude.helper';
import * as userSelectors from 'resources/user/user.selectors';
import * as userActions from 'resources/user/user.actions';
import FullScreenLoader from 'components/FullScreenLoader';

import HomepageHeader from 'components/HomepageHeader';
import HomepageEmpty from 'components/HomepageEmpty';
import DailyTransactions from 'components/DailyTransactions';
import Avatar from 'components/Avatar';

import DepositIcon from 'assets/icons/depositWhiteIcon.svg';
import SendIcon from 'assets/icons/sendMoneyWhiteIcon.svg';
import ReceiveIcon from 'assets/icons/receiveMoneyWhiteIcon.svg';

import styles from './Homepage.styles';

const getBalanceLatestTransactions = async (dispatch) => {
  const availableBalance = await dispatch(userActions.getBalance());
  const { count, transactions } = await getLatestTransactions();
  return { count, transactions, availableBalance };
};

function Homepage({ navigation }) {
  const userData = useSelector(userSelectors.getUserData);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const userProperties = {
      Mobile: userData.phoneNumber,
      Email: userData.email,
    };
    amplitudeInstance.setUserId(userData._id);
    amplitudeInstance.setUserProperties(userProperties);
    amplitudeInstance.logEvent(ANALYTICS_EVENTS.LOG_IN);
  }, []);

  const {
    onPressOut,
    onPressIn,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onMomentumDragEnd,
    allowDragging,
    balance,
    headerStyles,
    transactions,
    panelRef,
    draggableRange,
    draggedValue,
    snappingPoints,
    groupedTransactions,
    loadMore,
    scrollEnabled,
    textSubtitleScale,
  } = useSlidingPanel({
    getBalanceLatestTransactions,
    getLatestTransactions,
    setLoading,
  });

  const onPressDeposit = useCallback(
    () => navigation.navigate('DepositMoneyMethods'),
    [navigation],
  );

  const onPressSend = useCallback(() => navigation.navigate('Send'), [
    navigation,
  ]);

  const onPressReceive = useCallback(
    () => navigation.navigate('QRCodeGenerate', { value: userData._id }),
    [navigation],
  );

  const onAvatarPress = useCallback(() => {
    navigation.navigate('Profile');
  }, []);

  const headerActions = useMemo(() => {
    return [
      {
        title: 'Deposit',
        icon: DepositIcon,
        action: onPressDeposit,
      },
      {
        title: 'Send',
        icon: SendIcon,
        action: onPressSend,
      },
      {
        title: 'Receive',
        icon: ReceiveIcon,
        action: onPressReceive,
      },
    ];
  }, [onPressDeposit, onPressSend, onPressReceive]);

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <HomepageHeader
        title="Your balance"
        subtitle={`₣ ${balance}`}
        propsStyles={headerStyles}
        headerActions={headerActions}
        renderLeftElement={() => (
          <TouchableOpacity activeOpacity={0.7} onPress={onAvatarPress}>
            <Avatar
              username={userData.username}
              avatarUrl={userData.avatar.url}
            />
          </TouchableOpacity>
        )}
        headerStyle={styles.headerStyle}
        textSubtitleScale={textSubtitleScale}
      />
      {!transactions.length ? (
        <HomepageEmpty onLinkPress={onPressDeposit}>
          {`Looks like there is no credit in your wallet at the moment. {Deposit} to see your first transaction.`}
        </HomepageEmpty>
      ) : (
        <SlidingUpPanel
          ref={panelRef}
          draggableRange={draggableRange}
          animatedValue={draggedValue}
          onMomentumDragEnd={onMomentumDragEnd}
          backdropOpacity={0}
          snappingPoints={snappingPoints}
          showBackdrop={false}
          height={draggableRange.top}
          allowDragging={allowDragging}
        >
          <View style={styles.screen}>
            <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
              <View style={styles.iconContainer}>
                <Home />
              </View>
              <Text style={styles.title}>Latest transactions</Text>
            </Pressable>
            <FlatList
              keyExtractor={([key]) => key}
              ItemSeparatorComponent={() => <View style={styles.divideLine} />}
              data={groupedTransactions}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              renderItem={({ item: [key, items] }) => (
                <DailyTransactions date={key} transactions={items} />
              )}
              scrollEnabled={scrollEnabled}
              onMomentumScrollEnd={onMomentumScrollEnd}
              onMomentumScrollBegin={onMomentumScrollBegin}
              style={styles.scrollView}
            />
          </View>
        </SlidingUpPanel>
      )}
    </>
  );
}

Homepage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Homepage;
