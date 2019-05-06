const request = require('supertest');

const server = require('./server');

describe("GET route for '/families'", () => {
    it('returns status 200', async() => {
        const response = await request(server).get('/families')
        expect(response.status).toBe(200);
    });

});

describe(" ", () => {
    it(' ', async() => {
        const response = await request(server)
        expect(response)
    });
});