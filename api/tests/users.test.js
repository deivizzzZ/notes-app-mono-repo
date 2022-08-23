const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { server } = require('../index')
const User = require('../models/User')
const { api, getUsers } = require('./helpers')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('pswd', 10)
  const user = new User({ username: 'miduroot', passwordHash })

  await user.save()
})

describe('get all users', () => {
  test('returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns all initial users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
  })
})

describe('creating a new user', () => {
  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'midudev',
      name: 'Miguel',
      password: 'tw1tch'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'miduroot',
      name: 'Miguel',
      password: 'midutest'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors.username.message).toContain('`username` to be unique')

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
