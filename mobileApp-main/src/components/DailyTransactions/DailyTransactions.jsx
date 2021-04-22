import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Text from 'components/Text';
import { formatTransactionAmount } from 'helpers/utils.helper';
import { getDailyTotal } from 'resources/user/user.api';

import FullScreenLoader from 'components/FullScreenLoader';
import Transaction from '../Transaction';

import styles from './DailyTransactions.styles';

function DailyTransactions({ date, transactions, crypto }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const formattedTotalAmount = useMemo(() => {
    return formatTransactionAmount(totalAmount, crypto);
  }, [totalAmount]);

  const formattedDate = useMemo(() => {
    return new Date(date).toLocaleDateString('en', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
  }, [date]);

  useEffect(() => {
    try {
      setLoading(true);
      const init = async () => {
        const start = new Date(date).setHours(0, 0, 0, 0);
        const end = new Date(date).setHours(24, 0, 0, 0);
        const total = crypto
          ? await getDailyTotal(start, end, crypto)
          : await getDailyTotal(start, end);
        setTotalAmount(total);
      };

      init();
    } finally {
      setLoading(false);
    }
  }, [date, transactions.length]);

  return (
    <View>
      {isLoading && <FullScreenLoader />}
      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>{formattedDate}</Text>
        <Text style={[styles.subtitle, styles.dailyAmount]}>
          {formattedTotalAmount}
        </Text>
      </View>
      {transactions.map(({ id, type, partner, amount, note, status }) => (
        <Transaction
          key={id}
          partner={partner}
          transactionType={type}
          amount={amount}
          crypto={crypto}
          note={note}
          status={status}
        />
      ))}
    </View>
  );
}

DailyTransactions.propTypes = {
  date: PropTypes.string.isRequired,
  crypto: PropTypes.string,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      partner: PropTypes.shape({
        username: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
      amount: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

DailyTransactions.defaultProps = {
  crypto: null,
};

export default DailyTransactions;
