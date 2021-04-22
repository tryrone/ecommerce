import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  ViewPropTypes,
} from 'react-native';

const RNVGSShowView = requireNativeComponent('RNVGSShowView');

function VGSShowView({ cardId, onHandle, style }) {
  const nativeRNVGSShowViewRef = useRef();

  useEffect(() => {
    const nodeHandle = findNodeHandle(nativeRNVGSShowViewRef.current);
    onHandle(nodeHandle);

    UIManager.dispatchViewManagerCommand(
      nodeHandle,
      UIManager.RNVGSShowView.Commands.revealFromManager,
      [cardId],
    );
  }, [cardId]);

  return <RNVGSShowView style={style} ref={nativeRNVGSShowViewRef} />;
}

VGSShowView.propTypes = {
  cardId: PropTypes.string,
  onHandle: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

VGSShowView.defaultProps = {
  cardId: '',
  style: null,
};

export default VGSShowView;
