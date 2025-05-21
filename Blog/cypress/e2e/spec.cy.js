describe("Navbar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174/");
  });

  // Test for the Home button
  // it checks if the button is present and clickable
  it("navigate to home page ", () => {
    cy.get('[data-testid="home-button"]').click();
    cy.url().should("eq", "http://localhost:5174/");
  });

  // Test for the Authors page it chect if clicked on author button it navigate to authors page
  it("navigate to author page ", () => {
    cy.get('[data-testid="authors-button"]').click();
    cy.url().should("include", "/authors");
  });

  // Test for the search input it chechk if user enter "a" and the result is filtered
  it("filtered when user type a ", () => {
    cy.get('[data-testid="authors-button"]').click();
    cy.url().should("include", "/authors");

    cy.get('input[placeholder="Search by title"]').should("exist").type("a");

    cy.wait(500);

    cy.get('[data-testid="author-name"]').each(($el) => {
      const name = $el.text().toLowerCase();
      expect(name.startsWith("a")).to.be.true;
    });
  });
});
