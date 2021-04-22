import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Big from 'big.js';

import { getKeyboardVerticalOffset } from 'helpers/utils.helper';
import {
  CRYPTO_OPERATIONS,
  CURRENCIES,
  getCurrencySymbol,
  processCryptoFiatMoney,
  getMantissa,
  getRawNumberString,
} from 'helpers/currency.helper';
import {
  getCryptoFiatBalance,
  exchangeCrypto,
} from 'resources/crypto/crypto.api';

import Text from 'components/Text';
import FullScreenLoader from 'components/FullScreenLoader';
import MainHeader from 'components/MainHeader';
import Button from 'components/Button';
import ConvertCards from './components/ConvertCards';

import styles from './CryptoOperations.styles';

Big.NE = '-16';

const getTitleHeader = (operation, crypto) => {
  return operation === CRYPTO_OPERATIONS.BUY_SELL
    ? `Buy/Sell ${crypto}`
    : `Send ${crypto}`;
};

function CryptoOperations({ route, navigation }) {
  const { operation, crypto } = route.params;

  const cardsValues = useMemo(
    () => ({
      from: {
        currency: CURRENCIES.REAL.FRANK,
        value: '0',
      },
      to: {
        currency: crypto,
        value: '0',
      },
    }),
    [crypto],
  );

  const [cards, setCards] = useState(cardsValues);

  const [balanceRealMoney, setBalanceRealMoney] = useState('0');
  const [balanceCryptoMoney, setBalanceCryptoMoney] = useState('0');
  const [duniapayFee, setDuniapayFee] = useState(0);
  const [sellCryptoPrice, setSellCryptoPrice] = useState(1);
  const [buyCryptoPrice, setBuyCryptoPrice] = useState(1);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isError, setError] = useState(false);

  const getConvertedPrice = ({ amount, isSell, isFiat }) => {
    let price;
    if (!amount) return '0';

    const amountMoney = new Big(getRawNumberString(amount));

    if (isSell) {
      setError(false);
      const sellPrice = new Big(sellCryptoPrice);
      if (isFiat) {
        if (amountMoney <= duniapayFee) setError(true);
        price = amountMoney.minus(duniapayFee).div(sellPrice);
      } else {
        price = Math.floor(amountMoney.mul(sellPrice).plus(duniapayFee));
      }
    }
    if (!isSell) {
      setError(false);
      const buyPrice = new Big(buyCryptoPrice);
      if (isFiat) {
        price = amountMoney.plus(duniapayFee).div(buyPrice);
      } else {
        price = Math.floor(amountMoney.mul(buyPrice).minus(duniapayFee));
        if (price <= duniapayFee) setError(true);
      }
    }

    return getMantissa(price);
  };

  const handleChangeMoney = useCallback(
    (value, currency) => {
      const isFromReal = cards.from.currency === CURRENCIES.REAL.FRANK;
      if (currency === CURRENCIES.REAL.FRANK) {
        const processedMoney = processCryptoFiatMoney(value);

        return isFromReal
          ? setCards((state) => ({
              ...state,
              from: { ...state.from, value: processedMoney },
              to: {
                ...state.to,
                value: processCryptoFiatMoney(
                  getConvertedPrice({
                    amount: processedMoney,
                    isSell: true,
                    isFiat: true,
                  }),
                ),
              },
            }))
          : setCards((state) => ({
              ...state,
              from: {
                ...state.from,
                value: processCryptoFiatMoney(
                  getConvertedPrice({
                    amount: processedMoney,
                    isSell: false,
                    isFiat: true,
                  }),
                ),
              },
              to: { ...state.to, value: processedMoney },
            }));
      }

      const processedCrypto = processCryptoFiatMoney(value);
      return isFromReal
        ? setCards((state) => ({
            ...state,
            to: { ...state.to, value: processedCrypto },
            from: {
              ...state.from,
              value: processCryptoFiatMoney(
                getConvertedPrice({
                  amount: processedCrypto,
                  isSell: true,
                  isFiat: false,
                }),
              ),
            },
          }))
        : setCards((state) => ({
            ...state,
            from: { ...state.from, value: processedCrypto },
            to: {
              ...state.to,
              value: processCryptoFiatMoney(
                getConvertedPrice({
                  amount: processedCrypto,
                  isSell: false,
                  isFiat: false,
                }),
              ),
            },
          }));
    },
    [setCards, cards.from.currency, sellCryptoPrice, cards.to.value],
  );

  useEffect(() => {
    const init = async () => {
      try {
        setSubmitting(true);
        const {
          fiatBalance,
          cryptoBalance,
          sellCrypto,
          buyCrypto,
          duniapayFee: fee,
        } = await getCryptoFiatBalance(crypto);
        setBalanceRealMoney(fiatBalance.toString());
        setBalanceCryptoMoney(cryptoBalance.toString());
        setDuniapayFee(fee);
        setSellCryptoPrice(sellCrypto);
        setBuyCryptoPrice(buyCrypto);
        setCards((state) => ({
          ...state,
          from: { ...state.from, value: '0' },
          to: {
            ...state.to,
            value: '0',
          },
        }));
      } finally {
        setSubmitting(false);
      }
    };

    init();
  }, [cards.from.currency]);

  const handlePressConfirm = useCallback(async () => {
    const data = {
      isFromFiatToCrypto: cards.from.currency === CURRENCIES.REAL.FRANK,
      crypto,
      cryptoAmount:
        cards.from.currency === CURRENCIES.REAL.FRANK
          ? getRawNumberString(cards.to.value)
          : getRawNumberString(cards.from.value),
      fiatAmount:
        cards.from.currency === CURRENCIES.REAL.FRANK
          ? getRawNumberString(cards.from.value)
          : getRawNumberString(cards.to.value),
      sellPrice: sellCryptoPrice,
      buyPrice: buyCryptoPrice,
    };
    try {
      setSubmitting(true);
      const { amount } = await exchangeCrypto(data);
      navigation.navigate('Congratulations', {
        title: 'Congratulations!',
        buttonName: 'Back to Wallet',
        screenStyle: styles.successScreen,
        onContinuePress: () => navigation.navigate('CryptoHomepage'),
        subTitle: (
          <Text>
            You just bought{' '}
            <Text style={styles.amountMoney}>
              {`${getCurrencySymbol(cards.to.currency).sign}${amount}`}
            </Text>{' '}
            to your DuniaPay Wallet.
          </Text>
        ),
      });
    } catch (e) {
      const error = e.data?.message || '';
      navigation.navigate('Error', {
        errorText: error,
      });
    } finally {
      setSubmitting(false);
    }
  }, [navigation, crypto, cards.to.value, cards.to.currency]);

  const actualBalance = useMemo(() => {
    const rawNumbersFrom = getRawNumberString(cards.from.value);

    return cards.from.currency === CURRENCIES.REAL.FRANK
      ? new Big(balanceRealMoney).minus(rawNumbersFrom || '0').toString()
      : new Big(balanceCryptoMoney).minus(rawNumbersFrom || '0').toString();
  }, [
    balanceRealMoney,
    balanceCryptoMoney,
    cards.to.value,
    cards.to.currency,
    cards.from.value,
  ]);

  const isActiveButton = useMemo(() => {
    return (
      getRawNumberString(cards.from.value) > 0 &&
      getRawNumberString(cards.to.value) > 0 &&
      actualBalance >= 0 &&
      !isError
    );
  }, [cards.from.value, cards.to.value, actualBalance, isError]);

  return (
    <>
      {isSubmitting && <FullScreenLoader />}
      <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          style={styles.container}
          keyboardVerticalOffset={getKeyboardVerticalOffset()}
        >
          <MainHeader title={getTitleHeader(operation, crypto)} />
          <Text
            style={[
              styles.headerSubTitle,
              actualBalance < 0 && styles.isNegativeBalance,
            ]}
          >{`Available balance: ${actualBalance < 0 ? '-' : ''}${
            getCurrencySymbol(cards.from.currency).sign
          } ${Math.abs(actualBalance)}`}</Text>
          {isError && (
            <Text style={styles.errorTitle}>
              This transaction is too small. Please spend more money.
            </Text>
          )}
          <View style={styles.contentWrapper}>
            <ConvertCards
              cards={cards}
              setCards={setCards}
              handleChangeMoney={handleChangeMoney}
            />
            <Button
              onPress={handlePressConfirm}
              style={styles.button}
              title={
                operation === CRYPTO_OPERATIONS.BUY_SELL ? 'Buy now' : 'Confirm'
              }
              disabled={!isActiveButton}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

CryptoOperations.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      operation: PropTypes.string,
      crypto: PropTypes.string,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default CryptoOperations;
