import React, { useCallback, useMemo, useState } from 'react';
import { View, Pressable, FlatList, TouchableOpacity } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import PropTypes from 'prop-types';

import useSlidingPanel from 'hooks/useSlidingPanel';
import { processMoney } from 'helpers/utils.helper';

import Text from 'components/Text';
import FullScreenLoader from 'components/FullScreenLoader';
import HomepageHeader from 'components/HomepageHeader';
import HomepageEmpty from 'components/HomepageEmpty';
import DailyTransactions from 'components/DailyTransactions';
import InfoLabel from 'components/InfoLabel';

import BackArrowIcon from 'assets/icons/blackBackIcon.svg';
import DepositIcon from 'assets/icons/deposit.svg';
import SettingsIcon from 'assets/icons/settings.svg';
import WithdrawIcon from 'assets/icons/receiveMoneyWhiteIcon.svg';
import HomeIcon from 'assets/icons/home.svg';

import styles from './SavingsPool.styles';

const getLatestTransactions = () => {
  return { transactions: [] };
};

function SavingsPool({ navigation, route }) {
  const { savingsPool } = route.params;
  const [isLoading, setLoading] = useState(false);

  const {
    onPressOut,
    onPressIn,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onMomentumDragEnd,
    allowDragging,
    headerStyles,
    transactions,
    panelRef,
    draggableRange,
    draggedValue,
    snappingPoints,
    groupedTransactions,
    loadMore,
    scrollEnabled,
  } = useSlidingPanel({
    getLatestTransactions,
    setLoading,
  });

  const onBackArrowPress = useCallback(() => {
    navigation.goBack();
  }, []);

  const onDepositPress = useCallback(() => {
    navigation.navigate('ConfirmSavingsDeposit', { savingsPool });
  }, []);

  const onManagePoolPress = useCallback(() => {
    navigation.navigate('ManageSavingsPool', { savingsPool });
  }, []);

  const onWithdrawPress = useCallback(() => {}, []);

  const headerActions = useMemo(() => {
    return [
      {
        title: 'Deposit',
        icon: DepositIcon,
        action: onDepositPress,
      },
      {
        title: 'Manage pool',
        icon: SettingsIcon,
        action: onManagePoolPress,
      },
      {
        title: 'Withdraw',
        icon: WithdrawIcon,
        action: onWithdrawPress,
      },
    ];
  }, [onDepositPress, onManagePoolPress, onWithdrawPress]);

  const interestAmount = useMemo(() => {
    return (savingsPool.amount / 100) * savingsPool.interestPercent;
  }, [savingsPool.amount, savingsPool.interestPercent]);

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <HomepageHeader
        title={savingsPool.name}
        subtitle={`₣ ${processMoney(savingsPool.amount.toString())}`}
        propsStyles={headerStyles}
        headerActions={headerActions}
        renderLeftElement={() => (
          <TouchableOpacity activeOpacity={0.7} onPress={onBackArrowPress}>
            <BackArrowIcon />
          </TouchableOpacity>
        )}
        renderInfoLabel={() => (
          <View style={styles.poolInterest}>
            <InfoLabel
              text={`${savingsPool.interestPercent} % | ~ ₣ ${processMoney(
                interestAmount.toString(),
              )}`}
            />
          </View>
        )}
      />
      {!transactions.length ? (
        <HomepageEmpty onLinkPress={onDepositPress}>
          {`Looks like you haven't made any savings yet. {Deposit} from your Wallet to see your first saving.`}
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
                <HomeIcon />
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
            />
          </View>
        </SlidingUpPanel>
      )}
    </>
  );
}

SavingsPool.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      savingsPool: PropTypes.shape({
        name: PropTypes.string,
        amount: PropTypes.number,
        interestPercent: PropTypes.number,
      }),
    }),
  }).isRequired,
};

export default SavingsPool;
