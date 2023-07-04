describe('Visiting the main route', () => {
  it('displays login options', () => {
    cy.visit("https://ai-kan.vercel.app/")
  })
})

describe('Visiting "/project"', ()=>{
  it('displays stored project info', ()=>{
    cy.visit("http://localhost:3000/")
    cy.get("div").should('be.visible')
  })
})