import React, { useRef, useCallback } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

import CryptoCard from '../CryptoCard';

import styles from './CryptoCarusel.styles';

const { width } = Dimensions.get('window');

const itemWidth = width - 30;

function CryptoCarusel({ activeIndexSlide, setActiveIndexSlide, data }) {
  const navigation = useNavigation();
  const ref = useRef();

  const onCardPress = useCallback((crypto) => {
    navigation.navigate('CryptoPerformance', { crypto });
  }, []);

  return (
    <View style={styles.carusel}>
      <Carousel
        layout="default"
        ref={ref}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onCardPress(item.title)}
            style={styles.caruselCard}
          >
            <CryptoCard item={item} />
          </TouchableOpacity>
        )}
        sliderWidth={itemWidth}
        itemWidth={itemWidth}
        itemHeight={78}
        sliderHeight={78}
        onSnapToItem={setActiveIndexSlide}
        removeClippedSubviews={false}
      />
      <Pagination
        containerStyle={styles.dotWrapper}
        dotsLength={data.length}
        activeDotIndex={activeIndexSlide}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
      />
    </View>
  );
}

CryptoCarusel.propTypes = {
  activeIndexSlide: PropTypes.number.isRequired,
  setActiveIndexSlide: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
      cryptoIcon: PropTypes.elementType.isRequired,
    }),
  ).isRequired,
};

export default CryptoCarusel;
