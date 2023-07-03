import React from "react"
import Title from "./Title"

describe("<Title />", () => {
  it("renders", () => {
    cy.mount(<Title />)
    cy.get("label").should("have.text", "I want to make a...")
    cy.get("#promptInput").type("snake game in react")
    cy.get("button").click()
  })
})
