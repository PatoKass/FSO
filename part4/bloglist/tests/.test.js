const mongoose = require('mongoose')
const { totalLikes, dummy, favoriteBlog } = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0,
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    },
  ]
  const emptyList = []

  test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
  })
  test('of empty list is zero', () => {
    const result = totalLikes(emptyList)
    expect(result).toBe(0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('when passed a list with multiple blogs, it equals to the sum of likes', () => {
    const result = totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('most liked blog', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0,
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    },
  ]
  test('it calculates the most liked blog', () => {
    const result = favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

test('it gets the correct amount of blogs in JSON format', async () => {
  const res = await api.get('/api/blogs')
  expect(res.status).toBe(200)
  expect(res.headers['content-type']).toMatch(/application\/json/)
  expect(res.body).toHaveLength(19) //or whatever hardcoded length to match the amount of blogs in db
})

describe('when posting a new blog', () => {
  test('blogs have a property named "id"', async () => {
    const res = await api.get('/api/blogs')

    res.body.forEach((blog) => {
      expect(blog._id).toBeUndefined()
      expect(blog.id).toBeDefined()
    })
  })

  test('posting to the api succesfully creates and adds a new blog', async () => {
    const beforeBlogs = await api.get('/api/blogs')
    const initialL = beforeBlogs.body.length

    const testBlog = new Blog({
      title: 'testblog',
      author: 'Sergio Aguero',
      url: 'www.messi10.com.ar/goat',
      likes: 10,
    })

    await testBlog.save()

    const afterBlogs = await api.get('/api/blogs') //new request should contain the new blog now
    const finalL = afterBlogs.body.length

    expect(finalL).toBe(initialL + 1)
    //toStrictEqual is the right choice here instead of toBe
    expect(afterBlogs.body[initialL]).toStrictEqual({
      title: 'testblog',
      id: afterBlogs.body[initialL].id,
      author: 'Sergio Aguero',
      url: 'www.messi10.com.ar/goat',
      likes: 10,
    })
  }, 10000) //regularly takes more than the standard 5000 ms timeout

  test('if no likes property is entered, it defaults to zero', async () => {
    const testBlog = new Blog({
      title: 'no-likes testblog',
      author: 'Frank Zappa',
      url: 'www.tukitaka.net',
    })

    await testBlog.save()

    const afterBlogs = await api.get('/api/blogs')

    const lastBlog = afterBlogs.body[afterBlogs.body.length - 1]

    expect(lastBlog.likes).toEqual(0)
  })
  test('if no url or title properties are present, returns status 400', async () => {
    const testBlog = new Blog({
      author: 'Age of Empires II Definitive Edition',
    })

    const res = await api.post('/api/blogs').send(testBlog)

    expect(res.status).toBe(400)
  })
})
test('deletes a single blog', async () => {
  const blogs = await api.get('/api/blogs')
  const testBlog = blogs.body[0] // it could be a random one but whatever

  const res = await api.delete(`/api/blogs/${testBlog.id}`)

  expect(res.status).toBe(204)
})
test('updates the number of likes on put request', async () => {
  const beforeBlogs = await api.get('/api/blogs')
  const preLikes = beforeBlogs.body[0].likes
  const id = beforeBlogs.body[0].id

  const res = await api.put(`/api/blogs/${id}`).send({ likes: preLikes + 1 })

  expect(res.body.likes).toBe(preLikes + 1)
})

describe('creating invalid users does not work', () => {
  test('creating duplicate users is not valid', async () => {
    const newUser = new User({
      username: 'DupliTest',
      name: 'Lionel Messi',
      password: 'messi10',
    })
    const sameUser = new User({
      username: 'DupliTest',
      name: 'Lionel Messi',
      password: 'messi10',
    })

    await newUser.save()

    try {
      await sameUser.save()
    } catch (error) {
      expect(error.code).toBe(11000)
      expect(error.message).toContain('duplicate key error')
    }
  })

  test('password must have at least a length of 3', async () => {
    const badPassUser = {
      username: 'Lio2',
      name: 'LionelMessi',
      password: '10',
    }
    const res = await api.post('/api/users').send(badPassUser)

    expect(res.status).toBe(400)
    expect(res.body.error).toBe(
      'Password must be at least three characters long'
    )
  })

  test('posting new user works fine', async () => {
    const newUser = new User({
      username: 'test',
      name: 'Lionel Messi',
      password: 'messi10',
    })
    const savedUser = await newUser.save()

    expect(savedUser).toBeDefined()
    expect(savedUser.username).toBe('test')
    expect(savedUser.name).toBe('Lionel Messi')
  })

  test('username and name are required', async () => {
    const noNameUser = new User({
      username: 'Lio',
      password: 'messi10',
    })
    const noUsernameUser = new User({
      name: 'Lio',
      password: 'messi10',
    })

    const noNamePost = await api.post('/api/users').send(noNameUser)
    const noUsernamePost = await api.post('/api/users').send(noUsernameUser)

    expect(noNamePost.status).toBe(400)
    expect(noUsernamePost.status).toBe(400)
    expect(noUsernamePost.body.error && noNamePost.body.error).toBe(
      'Name or username are missing'
    )
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
