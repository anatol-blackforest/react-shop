import React from 'react'
import renderer from 'react-test-renderer'

import App from './app'


test('Контент меняется по клику на табы', () => {
  const component = renderer.create(<App />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot();


  tree.props.selectedTab(0)
  // перерисовка
  tree = component.toJSON()
  expect(tree).toMatchSnapshot();

  tree.props.selectedTab(1)
  // перерисовка
  tree = component.toJSON()
  expect(tree).toMatchSnapshot();
})
