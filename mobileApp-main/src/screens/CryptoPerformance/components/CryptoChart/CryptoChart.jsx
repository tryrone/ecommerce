import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import colors from 'themes/colors';

const { width } = Dimensions.get('window');
const screenHorizontalPaddings = 32;
const chartHeight = 220;

function CryptoChart({ data, decimalPlaces }) {
  return (
    <LineChart
      data={{
        datasets: [{ data }],
      }}
      width={width - screenHorizontalPaddings}
      height={chartHeight}
      withVerticalLines={false}
      withDots={false}
      chartConfig={{
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: () => colors.theme,
        strokeWidth: 2,
        decimalPlaces,
        propsForBackgroundLines: {
          strokeDasharray: Platform.OS === 'ios' ? [] : '',
          strokeDashoffset: null,
          stroke: colors.chartBorder,
        },
        propsForHorizontalLabels: {
          fill: colors.gray,
        },
      }}
      bezier
    />
  );
}

CryptoChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  decimalPlaces: PropTypes.number,
};

CryptoChart.defaultProps = {
  decimalPlaces: 0,
};

export default CryptoChart;
