import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Animated, ViewPropTypes } from 'react-native';
import { useSelector } from 'react-redux';

import HideBalance from 'assets/icons/hideBalance.svg';

import * as userSelectors from 'resources/user/user.selectors';

import Text from 'components/Text';

import styles from './HomepageHeader.styles';

function HomepageHeader({
  title,
  subtitle,
  propsStyles,
  headerActions,
  renderLeftElement,
  isCrypto,
  headerStyle,
  convertedMoney,
  children,
  renderInfoLabel,
  textSubtitleScale,
}) {
  const isBalanceHidden = useSelector(userSelectors.getIsBalanceHidden);

  return (
    <View style={[styles.header, headerStyle]}>
      <View style={styles.leftElement}>{renderLeftElement()}</View>
      <Animated.View
        style={[
          styles.text,
          {
            transform: [{ scale: textSubtitleScale }],
          },
        ]}
      >
        <Text style={[styles.text, styles.title]}>{title}</Text>
      </Animated.View>
      <Animated.View style={propsStyles.subtitle}>
        {isBalanceHidden ? (
          <View style={styles.hiddenBalance}>
            <HideBalance />
            <Text style={styles.hiddenBalanceText}>Hidden Balance</Text>
          </View>
        ) : (
          <>
            <Text
              style={[
                styles.headerSubtitle,
                isCrypto && styles.cryptoHeaderSubtitle,
                subtitle.length > 13 && styles.smallHeaderSubtitle,
              ]}
            >
              {subtitle}
            </Text>
            {isCrypto && (
              <Animated.View style={styles.cryptoContainer}>
                <Text style={[styles.text, styles.title]}>
                  {convertedMoney}
                </Text>
              </Animated.View>
            )}
            <Animated.View>{renderInfoLabel()}</Animated.View>
          </>
        )}
      </Animated.View>

      <Animated.View style={styles.iconsContainer}>
        {headerActions.map(
          ({ title: actionTitle, icon: ActionIcon, action }) => (
            <TouchableOpacity
              onPress={action}
              style={styles.actionContainer}
              key={actionTitle}
            >
              <View style={styles.iconBackground}>
                <ActionIcon />
              </View>
              <Text style={styles.text}>{actionTitle}</Text>
            </TouchableOpacity>
          ),
        )}
      </Animated.View>
      {children}
    </View>
  );
}

HomepageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  convertedMoney: PropTypes.string,
  propsStyles: PropTypes.shape({
    title: PropTypes.shape({}),
    subtitle: PropTypes.shape({}),
  }),
  headerActions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.elementType,
      action: PropTypes.func,
    }),
  ),
  renderLeftElement: PropTypes.func,
  isCrypto: PropTypes.bool,
  headerStyle: ViewPropTypes.style,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  renderInfoLabel: PropTypes.func,
  textSubtitleScale: PropTypes.shape({}).isRequired,
};

HomepageHeader.defaultProps = {
  title: '',
  subtitle: '',
  propsStyles: {
    title: {},
    subtitle: {},
  },
  headerActions: [],
  renderLeftElement: () => null,
  convertedMoney: '',
  headerStyle: null,
  isCrypto: false,
  children: null,
  renderInfoLabel: () => null,
};

export default HomepageHeader;
