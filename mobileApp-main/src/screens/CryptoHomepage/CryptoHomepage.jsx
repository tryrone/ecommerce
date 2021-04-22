import React, { useCallback, useState, useMemo, useEffect } from 'react';
import {
  Text,
  View,
  Pressable,
  FlatList,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Home from 'assets/icons/home.svg';

import { getCryptoInfo } from 'resources/crypto/crypto.actions';
import { getCryptoAssetId } from 'resources/crypto/crypto.api';
import * as cryptoSelectors from 'resources/crypto/crypto.selectors';
import { getCryptoLatestTransactions } from 'resources/user/user.api';

import useInterval from 'hooks/useInterval';
import useSlidingPanel from 'hooks/useSlidingPanel';

import {
  CRYPTO_OPERATIONS,
  CURRENCIES,
  getCurrencyIcon,
  getCurrencySymbol,
  processCryptoFiatMoney,
} from 'helpers/currency.helper';

import colors from 'themes/colors';

import HomepageHeader from 'components/HomepageHeader';
import HomepageEmpty from 'components/HomepageEmpty';
import DailyTransactions from 'components/DailyTransactions';
import FullScreenLoader from 'components/FullScreenLoader';

import BackArrowIcon from 'assets/icons/blackBackIcon.svg';
import SendSellIcon from 'assets/icons/depositWhiteIcon.svg';
import SendIcon from 'assets/icons/sendMoneyWhiteIcon.svg';
import ReceiveIcon from 'assets/icons/receiveMoneyWhiteIcon.svg';

import CryptoCarusel from './components/CryptoCarusel';

import styles from './CryptoHomepage.styles';

const getCryptoByIndexCarusel = (index) => {
  switch (index) {
    case 0:
      return CURRENCIES.CRYPTO.BITCOIN;
    case 1:
      return CURRENCIES.CRYPTO.ETHEREUM;
    case 2:
      return CURRENCIES.CRYPTO.CELO;
    default:
      return CURRENCIES.CRYPTO.BITCOIN;
  }
};

const getLatestTransactions = () => {
  return { transactions: [] };
};

const delay = 5000;

function CryptoHomepage({ navigation }) {
  const dispatch = useDispatch();
  const crypto = useSelector(cryptoSelectors.getCryptoInfo);
  const [activeIndexSlide, setActiveIndexSlide] = useState(0);
  const selectedCrypto = useMemo(() => {
    return getCryptoByIndexCarusel(activeIndexSlide);
  }, [activeIndexSlide]);

  const [isQRCodeLoading, setQRCodeLoading] = useState(false);
  const [isTransactionsLoading, setTransactionsLoading] = useState(false);

  useInterval(async () => {
    await dispatch(getCryptoInfo());
  }, delay);

  useEffect(() => {
    try {
      setTransactionsLoading(true);
      const init = async () => {
        await dispatch(getCryptoInfo());

        setTransactionsLoading(false);
      };
      init();
    } catch (e) {
      Alert.alert('Warning', e.data?.exchangeRate || 'Reload screen please', [
        {
          text: 'Cancel',
        },
      ]);
    } finally {
      setTransactionsLoading(false);
    }
  }, [setTransactionsLoading]);

  const getBalanceLatestTransactions = useCallback(async () => {
    try {
      const {
        count = 0,
        transactions = [],
      } = await getCryptoLatestTransactions(0, selectedCrypto);
      return {
        count,
        transactions,
        availableBalance: crypto[selectedCrypto].cryptoBalance,
      };
    } catch (e) {
      Alert.alert('Warning', e.data?.exchangeRate || 'Reload screen please', [
        {
          text: 'Cancel',
        },
      ]);
    }
  }, [selectedCrypto, crypto[selectedCrypto].cryptoBalance]);

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
    textSubtitleScale,
  } = useSlidingPanel({
    getBalanceLatestTransactions,
    getLatestTransactions,
    isCrypto: true,
    dependencies: [selectedCrypto],
    setLoading: setTransactionsLoading,
  });

  const onBuySellPress = useCallback(() => {
    if (selectedCrypto === CURRENCIES.CRYPTO.CELO) {
      Alert.alert(
        '',
        'Unfortunately duniapay does not support your crypto currency yet, but will consider adding in the future.',
      );
    } else {
      navigation.navigate('CryptoOperations', {
        crypto: selectedCrypto,
        operation: CRYPTO_OPERATIONS.BUY_SELL,
      });
    }
  }, [navigation, selectedCrypto]);

  const data = useMemo(
    () =>
      Object.values(CURRENCIES.CRYPTO).map((currency) => ({
        title: currency,
        subTitle: `${crypto[selectedCrypto].cryptoBalance}  ${
          getCurrencySymbol(currency).codeISO
        }`,
        cryptoIcon: getCurrencyIcon(currency),
        dynamic: crypto[selectedCrypto].dynamic,
        priceForOneCrypto: processCryptoFiatMoney(
          crypto[selectedCrypto].sellCryptoPrice,
        ),
      })),
    [
      crypto[selectedCrypto].cryptoBalance,
      crypto[selectedCrypto].dynamic,
      crypto[selectedCrypto].sellCryptoPrice,
    ],
  );

  const onPressSend = useCallback(() => {
    navigation.navigate('CryptoQRCodeScan', { selectedCrypto });
  }, [navigation, selectedCrypto]);

  const onPressReceive = useCallback(async () => {
    try {
      setQRCodeLoading(true);
      const { assetId } = await getCryptoAssetId(selectedCrypto.toLowerCase());
      navigation.navigate('CryptoQRCodeGenerate', {
        value: assetId.toString(),
      });
    } catch (e) {
      Alert.alert('Warning', e.data.message, [
        {
          text: 'Cancel',
        },
      ]);
    } finally {
      setQRCodeLoading(false);
    }
  }, [navigation, selectedCrypto]);

  const onLeftIconPress = useCallback(() => {
    navigation.navigate('More');
  });

  const headerActions = useMemo(() => {
    return [
      {
        title: 'Buy/Sell',
        icon: SendSellIcon,
        action: onBuySellPress,
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
  }, [selectedCrypto, onBuySellPress, onPressSend, onPressReceive]);

  return (
    <>
      {isQRCodeLoading && <FullScreenLoader />}
      <HomepageHeader
        title={`${selectedCrypto} total balance`}
        subtitle={`${getCurrencySymbol(selectedCrypto).sign} ${
          crypto[selectedCrypto].cryptoBalance
        }`}
        propsStyles={headerStyles}
        headerActions={headerActions}
        renderLeftElement={() => (
          <TouchableOpacity activeOpacity={0.7} onPress={onLeftIconPress}>
            <BackArrowIcon />
          </TouchableOpacity>
        )}
        headerStyle={styles.headerStyle}
        convertedMoney={`${
          getCurrencySymbol(CURRENCIES.REAL.DOLLAR).codeISO
        } ${processCryptoFiatMoney(
          crypto[selectedCrypto].convertedUSDBalance,
        )}`}
        isCrypto
        textSubtitleScale={textSubtitleScale}
      >
        <CryptoCarusel
          activeIndexSlide={activeIndexSlide}
          setActiveIndexSlide={setActiveIndexSlide}
          data={data}
        />
      </HomepageHeader>
      {!transactions.length ? (
        <HomepageEmpty onLinkPress={onBuySellPress}>
          {`Looks like there is no credit in your Crypto Wallet at the moment. {Buy} to see your first transaction.`}
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
            {isTransactionsLoading ? (
              <ActivityIndicator size="large" color={colors.theme} />
            ) : (
              <FlatList
                keyExtractor={([key]) => key}
                ItemSeparatorComponent={() => (
                  <View style={styles.divideLine} />
                )}
                data={groupedTransactions}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                renderItem={({ item: [key, items] }) => (
                  <DailyTransactions
                    date={key}
                    transactions={items}
                    crypto={selectedCrypto}
                  />
                )}
                scrollEnabled={scrollEnabled}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onMomentumScrollBegin={onMomentumScrollBegin}
              />
            )}
          </View>
        </SlidingUpPanel>
      )}
    </>
  );
}

CryptoHomepage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default CryptoHomepage;
