describe('Dashboard', () => {
  beforeEach(() => {
    // Mock authentication
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'mock-token');
    });
  });

  it('should display dashboard page', () => {
    cy.visit('/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('should show loading state', () => {
    cy.visit('/dashboard');
    // Check for loading indicators
  });

  it('should display stats cards', () => {
    cy.visit('/dashboard');
    cy.contains('Total Sales').should('be.visible');
    cy.contains('Active Users').should('be.visible');
  });
});

