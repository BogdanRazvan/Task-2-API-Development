const request = require('supertest');
const assert = require('assert');

let userId; // Capture the ID of the created user

describe('Users API', function() {
    const newUserData = { email: 'test@test.test', name: 'Test name', age: 21 };

    it('add user', function(done) {
        request('http://localhost:3002')
          .post('/api/users')
          .send(newUserData)
          .expect(201)
          .expect(function(res) {
            assert(res.body.hasOwnProperty('email'));
            assert(res.body.hasOwnProperty('name'));
            assert(res.body.hasOwnProperty('age'));
            userId = res.body._id; // Capture the ID of the created user
          })
          .end(function(err, res) {
            if (err) throw res.text;
            done();
          });
      });

      it('get user by ID', function(done) {
        // Assume you have a user with ID 123 that you want to retrieve
        request('http://localhost:3002')
          .get(`/api/users/${userId}`) // Specify the endpoint for retrieving a user with ID 123
          .expect(200) // Expect a status code of 200 (OK) if the user is found
          .expect(function(res) {
            assert(res.body.hasOwnProperty('name')); // Assert that the response contains the user's name
            assert(res.body.hasOwnProperty('email')); // Assert that the response contains the user's email
            assert(res.body.hasOwnProperty('age')); // Assert that the response contains the user's age
          })
          .end(function(err, res) {
            if (err) throw res.text; // Throw an error if there's an error during the request
            done(); // Call the done() function to indicate that the test is complete
          });
      });

      it('get all users', function(done) {
        request('http://localhost:3002')
          .get('/api/users') // Specify the endpoint for retrieving all users
          .expect(200) // Expect a status code of 200 (OK) if users are successfully retrieved
          .expect(function(res) {
            assert(Array.isArray(res.body)); // Assert that the response is an array of users
            assert(res.body.some(user => user._id === userId)); // Assert the added user is here
          })
          .end(function(err, res) {
            if (err) throw err; // Throw an error if there's an error during the request
            done(); // Call the done() function to indicate that the test is complete
          });
      });

      it('update user', function(done) {
        // Assume you have a user with ID 123 that you want to update
        const updatedUserData = { name: 'Updated Name', email: 'updated@test.test', age: 30 }; // New data to update the user
        
        request('http://localhost:3002')
          .put(`/api/users/${userId}`) // Specify the endpoint for updating a user with ID 123
          .send(updatedUserData) // Send the new data in the request body
          .expect(200) // Expect a status code of 200 (OK) if the user is successfully updated
          .expect(function(res) {
            assert(res.body.hasOwnProperty('name')); // Assert that the response contains the updated name
            assert(res.body.hasOwnProperty('email')); // Assert that the response contains the updated age
            assert(res.body.hasOwnProperty('age')); // Assert that the response contains the updated age
            assert(res.body.name === updatedUserData.name); // Assert that the name is updated correctly
            assert(res.body.email === updatedUserData.email); // Assert that the name is updated correctly
            assert(res.body.age === updatedUserData.age); // Assert that the age is updated correctly
          })
          .end(function(err, res) {
            if (err) throw res.text; // Throw an error if there's an error during the request
            done(); // Call the done() function to indicate that the test is complete
          });
      });

      it('update user', function(done) {
        // Assume you have a user with ID 123 that you want to update
        const updatedUserData = { name: 'Updated Name', email: 'updated@test.test', age: 30 }; // New data to update the user
        
        request('http://localhost:3002')
          .put(`/api/users/${userId}`) // Specify the endpoint for updating a user with ID 123
          .send(updatedUserData) // Send the new data in the request body
          .expect(200) // Expect a status code of 200 (OK) if the user is successfully updated
          .expect(function(res) {
            assert(res.body.hasOwnProperty('name')); // Assert that the response contains the updated name
            assert(res.body.hasOwnProperty('email')); // Assert that the response contains the updated age
            assert(res.body.hasOwnProperty('age')); // Assert that the response contains the updated age
            assert(res.body.name === updatedUserData.name); // Assert that the name is updated correctly
            assert(res.body.email === updatedUserData.email); // Assert that the name is updated correctly
            assert(res.body.age === updatedUserData.age); // Assert that the age is updated correctly
          })
          .end(function(err, res) {
            if (err) throw res.text; // Throw an error if there's an error during the request
            done(); // Call the done() function to indicate that the test is complete
          });
      });
      
      it('delete user', function(done) {
        if (!userId) {
            return done(new Error('User ID not available')); // Check if userId is available
        }
        
        request('http://localhost:3002')
          .delete(`/api/users/${userId}`) // Use the captured userId variable in the DELETE request
          .expect(200)
          .expect(function(res) {
            assert(res.body.message === 'User deleted successfully');
          })
          .end(function(err, res) {
            if (err) throw res.text;
            done();
          });
      });
});
