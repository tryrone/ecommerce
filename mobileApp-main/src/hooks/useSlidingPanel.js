import { useState, useCallback, useRef, useMemo } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';

import { HOMEPAGE_HEADER } from 'helpers/constants';
import { groupTransactionsList } from 'helpers/utils.helper';
import { processCryptoFiatMoney } from 'helpers/currency.helper';
import { getSliderProps } from 'helpers/slidingPanel.helper';

const { height } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight(true);

function useSlidingPanel({
  getBalanceLatestTransactions,
  getLatestTransactions,
  isCrypto = false,
  dependencies = [],
  setLoading,
}) {
  const dispatch = useDispatch();

  const tabBarHeight = useBottomTabBarHeight();
  const [balance, setBalance] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const panelRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        try {
          setLoading(true);
          const {
            count,
            transactions: _transactions,
            availableBalance,
          } = await getBalanceLatestTransactions(dispatch);

          setTotalTransactions(count);
          setTransactions(_transactions);
          setHasMore(_transactions.length < count);
          setBalance(processCryptoFiatMoney(availableBalance.toString()));
        } catch (e) {
          return e;
        } finally {
          setLoading(false);
        }
      };

      init();
    }, dependencies),
  );

  const loadMore = useCallback(async () => {
    if (!hasMore) {
      return;
    }

    const { transactions: _transactions } = await getLatestTransactions(
      transactions.length,
    );

    const allTransactions = [...transactions, ..._transactions];

    setHasMore(allTransactions.length < totalTransactions);
    setTransactions(allTransactions);
  }, [hasMore, transactions, totalTransactions]);

  const groupedTransactions = useMemo(
    () => groupTransactionsList(transactions),
    [transactions],
  );

  const headerHeight = isCrypto
    ? HOMEPAGE_HEADER.FULL_CRYPTO_HEIGHT
    : HOMEPAGE_HEADER.FULL_HEIGHT;

  const draggableRange = useMemo(
    () => ({
      top:
        height - HOMEPAGE_HEADER.SMALL_HEIGHT - tabBarHeight - statusBarHeight,
      bottom: height - headerHeight - tabBarHeight - statusBarHeight,
    }),
    [],
  );

  const [draggedValue] = useState(new Animated.Value(draggableRange.bottom));

  const {
    hideFullScreenPanelOptions,
    headerStyles,
    snappingPoints,
    textSubtitleScale,
  } = getSliderProps(draggableRange, draggedValue, isCrypto);

  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [allowDragging, setAllowDragging] = useState(true);
  const [lastDragValue, setLastDragValue] = useState(draggableRange.bottom);
  const [beginScrollPosition, setBeginScrollPosition] = useState(1);

  const enableDragging = useCallback(() => {
    setAllowDragging(true);
    setScrollEnabled(false);
  }, [setAllowDragging, setScrollEnabled]);

  const enableScroll = useCallback(() => {
    setAllowDragging(false);
    setScrollEnabled(true);
  }, [setAllowDragging, setScrollEnabled]);

  const slidePanelDown = useCallback(() => {
    if (panelRef && panelRef.current) {
      panelRef.current.show(hideFullScreenPanelOptions);
    }
  }, [panelRef]);

  const onMomentumDragEnd = useCallback(
    (value) => {
      setLastDragValue(value);
      const isPanelOnTop = value === draggableRange.top;
      return isPanelOnTop ? enableScroll() : enableDragging();
    },
    [draggableRange, scrollEnabled],
  );

  const onMomentumScrollEnd = useCallback(
    (event) => {
      const { nativeEvent } = event;
      const isScrollOnTop = nativeEvent.contentOffset.y === 0;
      const isScrollTopUpperLimits = beginScrollPosition <= 0 && isScrollOnTop;
      if (isScrollTopUpperLimits) {
        enableDragging();
        slidePanelDown();
      }
    },
    [enableDragging, slidePanelDown, beginScrollPosition, panelRef],
  );

  const onMomentumScrollBegin = useCallback(
    (event) => {
      const { nativeEvent } = event;
      setBeginScrollPosition(nativeEvent.contentOffset.y);
    },
    [setBeginScrollPosition],
  );

  const onPressIn = useCallback(() => {
    const isPanelOnTop = lastDragValue === draggableRange.top;
    if (isPanelOnTop) {
      enableDragging();
    }
  }, [lastDragValue, enableDragging]);

  const onPressOut = useCallback(() => {
    const isPanelOnTop = lastDragValue === draggableRange.top;
    if (isPanelOnTop) {
      enableScroll();
    }
  }, [lastDragValue]);

  return {
    onPressOut,
    onPressIn,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onMomentumDragEnd,
    allowDragging,
    balance,
    headerStyles,
    transactions,
    panelRef,
    draggableRange,
    draggedValue,
    snappingPoints,
    groupedTransactions,
    loadMore,
    scrollEnabled,
    setLoading,
    textSubtitleScale,
  };
}

export default useSlidingPanel;
