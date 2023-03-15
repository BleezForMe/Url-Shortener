describe('URL Shortener API', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000', { failOnStatusCode: false });
    });

    it('should create a shortened URL', () => {
        cy.request({
            method: 'POST',
            url: '/api/shorten',
            body: {
                url: 'https://www.example.com'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('url', 'https://www.example.com');
        });
    });

    it('should redirect to the original URL', () => {
        cy.request({
            method: 'POST',
            url: '/api/shorten',
            body: {
                url: 'https://www.example.com'
            }
        }).then((response) => {
            cy.request({
                method: 'GET',
                url: `/api/shortened/${response.body.id}`,
                followRedirect: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('url', 'https://www.example.com');
            });
        });
    });
});
