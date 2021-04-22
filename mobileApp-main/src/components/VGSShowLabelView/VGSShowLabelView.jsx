import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, ViewPropTypes } from 'react-native';

const RNVGSShowLabelView = requireNativeComponent('RNVGSShowLabelView');

function VGSShowLabelView({ nodeHandle, contentPath, style }) {
  return (
    <RNVGSShowLabelView
      style={style}
      contentPath={contentPath}
      vgsShowViewNodeHandle={nodeHandle}
    />
  );
}

VGSShowLabelView.propTypes = {
  nodeHandle: PropTypes.number.isRequired,
  contentPath: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

VGSShowLabelView.defaultProps = {
  style: null,
};

export default VGSShowLabelView;
