import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  CRYPTO_OPERATIONS,
  CURRENCIES,
  getCurrencyIcon,
  getCurrencySymbol,
  processCryptoFiatMoney,
} from 'helpers/currency.helper';

import * as cryptoActions from 'resources/crypto/crypto.actions';
import * as cryptoSelectors from 'resources/crypto/crypto.selectors';

import MainHeader from 'components/MainHeader';
import Button from 'components/Button';
import Text from 'components/Text';
import CryptoCard from 'screens/CryptoHomepage/components/CryptoCard';

import colors from 'themes/colors';

import CryptoChart from './components/CryptoChart';

import styles from './CryptoPerformance.styles';

const chartOptions = [
  {
    name: 'day',
    title: '1D',
  },
  {
    name: 'week',
    title: '1W',
  },
  {
    name: 'month',
    title: '1M',
  },
  {
    name: 'year',
    title: '1Y',
  },
];

function CryptoPerformance({ navigation, route }) {
  const dispatch = useDispatch();

  const { crypto } = route.params;

  const [selectedOption, setSelectedOption] = useState('month');
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [isDataRefreshing, setIsDataRefreshing] = useState(false);
  const [chartLoadingError, setChartLoadingError] = useState();

  const cryptoInfo = useSelector(cryptoSelectors.getCryptoInfo);
  const { cryptoHistory, decimalPlaces } = useSelector(
    cryptoSelectors.getCryptoHistory,
  );

  const loadChart = useCallback(async () => {
    if (selectedOption) {
      try {
        setIsChartLoading(true);
        await dispatch(cryptoActions.getCryptoDynamics(crypto, selectedOption));
        setChartLoadingError(null);
      } catch (e) {
        setChartLoadingError(
          'Sorry, an error has occured while loading the chart',
        );
      } finally {
        setIsChartLoading(false);
      }
    }
  }, [selectedOption]);

  useEffect(() => {
    loadChart();
  }, [selectedOption]);

  const onOptionSelect = useCallback((option) => {
    setSelectedOption(option.name);
  }, []);

  const onTradeNowPress = useCallback(() => {
    if (crypto === CURRENCIES.CRYPTO.CELO) {
      Alert.alert(
        '',
        'Unfortunately duniapay does not support your crypto currency yet, but will consider adding it in the future.',
      );
    } else {
      navigation.navigate('CryptoOperations', {
        operation: CRYPTO_OPERATIONS.BUY_SELL,
        crypto,
      });
    }
  }, []);

  const onDataRefresh = useCallback(async () => {
    setIsDataRefreshing(true);
    loadChart();
    await dispatch(cryptoActions.getCryptoInfo());
    setIsDataRefreshing(false);
  }, [selectedOption]);

  const cryptoData = useMemo(() => {
    return {
      title: crypto,
      subTitle: `${cryptoInfo[crypto].cryptoBalance}  ${
        getCurrencySymbol(crypto).codeISO
      }`,
      cryptoIcon: getCurrencyIcon(crypto),
      dynamic: cryptoInfo[crypto].dynamic,
      priceForOneCrypto: processCryptoFiatMoney(
        cryptoInfo[crypto].sellCryptoPrice,
      ),
    };
  }, [cryptoInfo]);

  return (
    <View style={styles.screen}>
      <MainHeader title={`${crypto} Performance`} />
      <ScrollView
        contentContainerStyle={styles.scrollableContent}
        refreshControl={
          <RefreshControl
            refreshing={isDataRefreshing}
            onRefresh={onDataRefresh}
          />
        }
      >
        <View style={styles.screenContent}>
          <View>
            <CryptoCard item={cryptoData} />
            <View style={styles.chartContainer}>
              {(() => {
                if (chartLoadingError) {
                  return (
                    <View style={styles.chartLoaderContainer}>
                      <Text style={styles.chartError}>{chartLoadingError}</Text>
                    </View>
                  );
                }

                if (!cryptoHistory.length || isChartLoading) {
                  return (
                    <View style={styles.chartLoaderContainer}>
                      <ActivityIndicator color={colors.theme} size="large" />
                    </View>
                  );
                }

                return (
                  <CryptoChart
                    data={cryptoHistory}
                    decimalPlaces={decimalPlaces}
                  />
                );
              })()}

              <View style={styles.chartOptions}>
                {chartOptions.map((option) => (
                  <TouchableOpacity
                    key={option.name}
                    activeOpacity={0.7}
                    onPress={() => onOptionSelect(option)}
                    style={[
                      styles.chartOption,
                      selectedOption === option.name &&
                        styles.chartOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chartOptionText,
                        selectedOption === option.name &&
                          styles.chartOptionTextSelected,
                      ]}
                    >
                      {option.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Button title="Trade now" onPress={onTradeNowPress} />
        </View>
      </ScrollView>
    </View>
  );
}

CryptoPerformance.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      crypto: PropTypes.string,
    }),
  }).isRequired,
};

export default CryptoPerformance;
