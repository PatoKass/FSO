import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogServices from '../services/blogs.js'

describe('blogs are displayed correctly', () => {
  let blog = {}
  const user = userEvent.setup()

  blogServices.update = jest.fn() // so that it mocks the update func for the third test

  beforeEach(() => {
    blog = {
      title: 'hallo',
      author: 'moto',
      url: 'wikiwiki',
      likes: 0,
    }
  })

  test("displaying a blog renders the blog's title and author, but does not render it's URL or number of likes by default", () => {
    const { container } = render(<Blog blog={blog} />)
    const element = container.querySelector('.default-render')

    expect(element).toHaveTextContent('hallo')
    expect(element).toHaveTextContent('moto')
    expect(element).not.toHaveTextContent('wikiwiki')
  })

  test('url and likes are correctly shown once the show button is clicked', async () => {
    const { container } = render(<Blog blog={blog} />)
    const button = screen.getByText('show')
    await user.click(button)

    const postedBlog = container.querySelector('.hidden-render')

    expect(postedBlog).toHaveTextContent('wikiwiki')
    expect(postedBlog).toHaveTextContent('likes:')
  })
  test('pressing like button multiple times works as intended', async () => {
    const { container } = render(<Blog blog={blog} />)
    const postedBlog = container.querySelector('.hidden-render')
    const button = screen.getByText('like')
    let likes = blog.likes

    await user.click(button)
    await user.click(button)

    expect(postedBlog).toHaveTextContent(`likes: ${Number(likes) + 2} `)
  })

  test('the form calls the event handler it received as props with the right details when new blog is created', async () => {
    const createBlog = jest.fn()
    const { container } = render(
      <BlogForm createBlog={createBlog} newBlog={{}} setNewBlog={jest.fn()} />
    )
    const inputs = screen.getAllByRole('textbox')

    await user.type(inputs[0], 'How to buy a potato')
    await user.type(inputs[1], 'Elon Musk')
    await user.type(inputs[2], 'www.wikipedia.com')
    const form = container.querySelector('.BlogForm')
    fireEvent.submit(form)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          elements: expect.objectContaining({
            Title: expect.objectContaining({ value: 'How to buy a potato' }),
            Author: expect.objectContaining({ value: 'Elon Musk' }),
            Url: expect.objectContaining({ value: 'www.wikipedia.com' }),
          }),
        }),
      })
    )
  })
})
