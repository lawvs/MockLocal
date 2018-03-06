const server = require('../app')
const supertest = require('supertest')

const client = supertest(server)

describe('Test MockLocal Results', () => {
  it('Valid GET data on /api/test/mock', (done) => {
    client.get('/api/test/mock')
      .expect(200, 'OK!', done)
  })

  it('Invalid POST data on /api/test/mock', (done) => {
    client.post('/api/test/mock')
      .expect(404, '404 Not Found', done)
  })

  after(() => {
    // server close
    server.close()
  })
})