const supertest = require('supertest');
const app = require('./server');
const mongoose = require('mongoose')
const config = require('config');
const db = config.get('mongoURI');

describe("Testing the loputoo API", () => {
    beforeAll(async () => {
        await mongoose.connect(db, { useNewUrlParser: true })
    })


	it("Tests the base route", async (done) => {

		const response = await supertest(app).get('/');

        expect(response.status).toBe(200);

        done()
    });

    it('Should save user to database', async (done) => {
        let username = Math.random().toString(36).substring(7);

        const response = await supertest(app).post('/api/auth/signup')
          .send({
            name: 'test.name',
            email: 'testing@gmail.com',
            password: 'qwerty',
            group: 'vs'
          })

        done()
    })
});