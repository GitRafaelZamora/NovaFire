const axios = require('axios');

// NOTE: Functions must be running locally
// NOTE: Run "firebase serve" to start server locally
describe("User", () => {
    describe("Login()", () => {
        test('Correct Credentials', (done) => {
            let user = {
                email: "User1@email.com",
                password: "U1!123"
            };

            axios.post('http://localhost:5000/novafire-c701c/us-central1/api/user/login', user)
                .then((res) => {
                    expect(res.data).toHaveProperty('token');
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
        test('Wrong Email Credentials', (done) => {
            let user = {
                email: "User@email.com",
                password: "U1!123"
            };

            axios.post('http://localhost:5000/novafire-c701c/us-central1/api/user/login', user)
                .then((res) => {
                    // Should jump straight to error
                })
                .catch(err => {
                    expect(err.response.status).toEqual(403);
                    expect(err.response.data).toHaveProperty('general');
                    done();
                });
        });
        test('Wrong Password Credentials', (done) => {
            let user = {
                email: "User1@email.com",
                password: "U!123"
            };

            axios.post('http://localhost:5000/novafire-c701c/us-central1/api/user/login', user)
                .then((res) => {
                    // Should jump straight to error
                })
                .catch(err => {
                    expect(err.response.status).toEqual(403);
                    expect(err.response.data).toHaveProperty('general');
                    done();
                });
        });
        test('No Credentials', (done) => {
            let user = {
                email: "",
                password: ""
            };

            axios.post('http://localhost:5000/novafire-c701c/us-central1/api/user/login', user)
                .then((res) => {
                    // Should jump straight to error
                })
                .catch(err => {
                    expect(err.response.status).toEqual(400);
                    expect(err.response.data).toHaveProperty('email');
                    expect(err.response.data).toHaveProperty('password');
                    done();
                });
        });
    });
});
