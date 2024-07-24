'use strict';

// supertest is written by express team for testing express
const supertest = require('supertest');
const server = require('../server.js');
const { start } = require('../server.js');

// TODO: How do we run tests when port is in use?
// jest.mock('../server', () => ({
//     app: {
//         listen: jest.fn((port, callback) => {
//             callback();
//         }),
//     },
// }));

describe('Web Server', () => {

    let consoleSpy;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    // it('should start the server on the given port', () => {
    //     const port = 3000;
    //     start(port);
    //     expect(server.app.listen).toHaveBeenCalledWith(port, expect.any(Function));
    //     expect(console.log).toHaveBeenCalledWith(`listening on port ${port}`);
    // });

    const mockRequest = supertest(server.app);
    
    // each 'it' block should be one part of the server.
    it('handles invalid requests', async () => {
        const response = await mockRequest.get('/foo');
        expect(response.status).toBe(404);
    });

    it('handles errors', async () => {
        const response = await mockRequest.get('/broken');
        expect(response.status).toBe(500);
    });

    it('handles home route', async () => {
        const response = await mockRequest.get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World');
    });

    it('handles data route', async () => {
        const response = await mockRequest.get('/data?name=Aaron&age=30');
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Aaron');
        expect(response.body.age).toBe('30');
        
    });

    it('handles middleware', async () => {
        const response = await mockRequest.get('/data?name=Test&Age100');
        expect(response.status).toBe(200);
        expect(response.body.timestamp).toBeDefined();
        expect(response.body.proof).toBeDefined();
    })
});
