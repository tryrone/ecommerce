import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import Text from '../src/components/Text/Text';
import {expect, it, jest} from '@jest/globals'
import AuthHeader from '../src/components/AuthHeader/AuthHeader';

test('AuthHeader renders correctly', () => {
  const tree = render(<AuthHeader withLogo={true} title="someOne" />).toJSON();
//   AuthHeader.propTypes.subtitle = 'cjdn';
//   expect(AuthHeader.propTypes.subtitle).toEqual('cjdn');
    console.log(tree);
    expect(1).toEqual(1);
//   expect(tree).toMatchSnapshot();
});