Cypress.Commands.add('createShortenedUrl', (url) => {
  cy.request('POST', 'http://localhost:5000/api/shorten', { url }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('url', url);
  });
});

Cypress.Commands.add('getShortenedUrl', (id) => {
  cy.request('GET', `http://localhost:5000/api/shortened/${id}`).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('id', id);
  });
});
