import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { formatTransactionAmount } from 'helpers/utils.helper';

import ReceiveMoney from 'assets/icons/receiveMoneyGrayIcon.svg';
import SendMoney from 'assets/icons/sendMoneyGrayIcon.svg';
import Deposit from 'assets/icons/depositGrayIcon.svg';

import Status from './components/Status';

import styles from './Transaction.styles';

const getTransactionType = (type, partner, crypto, note) => {
  if (partner) {
    return type === 'credit' ? 'Received' : 'Sent';
  }

  if (!crypto) {
    if (note === 'purchase') {
      return 'Purchased';
    }
    return type === 'credit' ? 'Deposited' : 'Withdrawn';
  }
  return 'Purchased';
};

const getTransactionUsername = (partner) => {
  if (!partner) {
    return 'Myself';
  }

  const { username, firstName = '', lastName = '' } = partner;

  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }

  return username;
};

const getTransactionIcon = (amount, partner, crypto) => {
  if (amount < 0) {
    if (!partner && crypto) return <Deposit />;
    return <SendMoney />;
  }
  if (partner) return <ReceiveMoney />;
  return <Deposit />;
};

function Transaction({
  transactionType,
  partner,
  amount,
  crypto,
  note,
  status,
}) {
  const formattedAmount = useMemo(
    () => formatTransactionAmount(amount, crypto),
    [amount, crypto],
  );

  return (
    <View style={styles.contentContainer}>
      <View style={styles.iconWrapper}>
        {getTransactionIcon(amount, partner, crypto)}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{getTransactionUsername(partner)}</Text>
        <Text style={styles.subtitle}>
          {getTransactionType(transactionType, partner, crypto, note)}
        </Text>
      </View>
      <Status status={status} />
      <Text
        style={[
          styles.moneyAmount,
          amount > 0 && styles.receiveMoney,
          formattedAmount.length > 15 && styles.bigAmount,
        ]}
      >
        {formattedAmount}
      </Text>
    </View>
  );
}

Transaction.propTypes = {
  transactionType: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  crypto: PropTypes.string,
  partner: PropTypes.shape({
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  note: PropTypes.string,
  status: PropTypes.string,
};

Transaction.defaultProps = {
  partner: null,
  crypto: null,
  note: null,
  status: null,
};

export default Transaction;
