import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LazyFallback from '../LazyFallback';

describe('src/components/elements/LazyFallback', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LazyFallback />);
    expect(tree).toMatchSnapshot();
  });
});
