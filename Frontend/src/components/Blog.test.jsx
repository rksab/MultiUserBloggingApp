import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, vi, beforeEach } from 'vitest'


test('renders title and author, but not url or likes by default', () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        id: '1',
        user: [{ username: 'root', name: 'Superuser', id: '123' }],
      }
    
    const user = { username: 'root' }
    const {container} = render(
        <Blog blog={blog} user={user} updateBlog={() => {}} deleteBlog={() => {}} />
      )
    expect(container.querySelector('.author')).toBeDefined()
    expect(container.querySelector('.title')).toBeDefined()
    expect(screen.queryByText(/likes: 7/)).not.toBeInTheDocument()
    expect(screen.queryByText(/url: https:\/\/reactpatterns\.com\//)).not.toBeInTheDocument()
  })

test('renders title, author, url and likes when show is clicked', async () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        id: '1',
        user: [{ username: 'root', name: 'Superuser', id: '123' }],
      }
    
    const user = { username: 'root' }
    const {container} = render(
        <Blog blog={blog} user={user} updateBlog={() => {}} deleteBlog={() => {}} />
      )
    const user1 = userEvent.setup()
    const button = screen.getByText('view')
    await user1.click(button)
    expect(container.querySelector('.author')).toBeDefined()
    expect(container.querySelector('.title')).toBeDefined()
    expect(screen.queryByText(/likes: 7/)).toBeInTheDocument()
    expect(screen.queryByText(/url: https:\/\/reactpatterns\.com\//)).toBeInTheDocument()

  })

  test('clicks like twice', async () => {
    const mockUpdateBlog = vi.fn()
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        id: '1',
        user: [{ username: 'root', name: 'Superuser', id: '123' }],
      }
    
    const user = { username: 'root' }
    const {container} = render(
        <Blog blog={blog} user={user} updateBlog={mockUpdateBlog} deleteBlog={() => {}} />
      )
    const user1 = userEvent.setup()
    const button = screen.getByText('view')
    await user1.click(button)
    const like = screen.getByText('Increase Likes')
    await user1.click(like)
    await user1.click(like)
    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })

  
  