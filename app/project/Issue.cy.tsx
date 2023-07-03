import React from 'react'
import Issue from './Issue'

describe('<Issue />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Issue />)
  })
})