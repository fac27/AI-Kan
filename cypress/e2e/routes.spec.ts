describe("Visiting the main route", () => {
  it("displays login options", () => {
    cy.visit("https://ai-kan.vercel.app/")
  })
})

describe('Visiting "/project"', () => {
  it("displays stored project info", () => {
    cy.visit("http://localhost:3000/project")
    cy.get("div").should("be.visible")
  })
  it("Allows User to edit Task titles", () => {
    cy.visit("http://localhost:3000/project")
    cy.get(".TestTaskTitle1").type("Hello")
    cy.get(".TestTaskTitle1").should("contain.value", "Hello")
  })
  it("Allows User to edit Task descriptions", () => {
    cy.visit("http://localhost:3000/project")
    cy.get(".TestTaskDescription1").type("Hello")
    cy.get(".TestTaskDescription1").should("contain.value", "Hello")
  })
  it("Allows User to edit Issue titles", () => {
    cy.visit("http://localhost:3000/project")
    cy.get(".TestIssueTitle1").type("Hello")
    cy.get(".TestIssueTitle1").should("contain.value", "Hello")
  })
  it("Allows User to edit Issue descriptions", () => {
    cy.visit("http://localhost:3000/project")
    cy.get(".TestIssueDescription1").type("Hello")
    cy.get(".TestIssueDescription1").should("contain.value", "Hello")
  })
  it("Allows User to check Task as done/not done", () => {
    cy.visit("http://localhost:3000/project")
    cy.get(".TestTaskCheckbox1")
      .should("be.not.checked")
      .check()
      .should("be.checked")
    cy.get(".TestIssueCheckbox1-1").should("be.checked")
  })
  it("Allows User to check Issue as done/not done", () => {
    cy.visit("http://localhost:3000/project")
    cy.get(".TestIssueCheckbox2-2")
      .should("be.not.checked")
      .check()
      .should("be.checked")
    cy.get(".TestIssueCheckbox2-3").check().should("be.checked")
    cy.get(".TestTaskCheckbox2").should("be.checked")
  })
})
