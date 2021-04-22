import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import BitcoinWallet from 'assets/icons/bitcoinWallet.svg';
import WithdrawalIcon from 'assets/icons/withdrawal.svg';
import RightArrow from 'assets/icons/rightArrow.svg';

import Card from 'components/Card';
import Text from 'components/Text';
import MainHeader from 'components/MainHeader';

import styles from './More.styles';

const routes = [
  {
    Icon: BitcoinWallet,
    title: 'Crypto Wallet',
    subtitle: 'Open Crypto Wallet',
    routeName: 'CryptoHomepage',
  },
  {
    Icon: WithdrawalIcon,
    title: 'Withdrawal',
    subtitle: 'Withdraw money to phone number',
    routeName: 'WithdrawalSavedPhoneNumbers',
  },
];

function More({ navigation }) {
  const handleClick = useCallback(
    (routeName) => {
      navigation.navigate(routeName);
    },
    [navigation],
  );

  const handleBack = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <MainHeader
        title="More"
        subTitle="Choose how to manage your money"
        handleLeftIconClick={handleBack}
      />
      {routes.map(({ Icon, title, subtitle, routeName }) => (
        <Card
          key={title}
          leftIcon={<Icon />}
          rightIcon={<RightArrow />}
          onCardClick={() => handleClick(routeName)}
          cardStyle={styles.card}
          rightIconStyle={styles.arrow}
        >
          <View style={styles.cardContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subtitle}</Text>
          </View>
        </Card>
      ))}
    </View>
  );
}

More.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
};

export default More;
