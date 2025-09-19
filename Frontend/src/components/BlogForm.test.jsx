import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, vi, beforeEach } from 'vitest'
import BlogForm from './BlogForm.jsx'

test('createblog is working', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog = {createBlog}/>)
    const author = screen.getByPlaceholderText('author')
    const title = screen.getByPlaceholderText('title')
    const url = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText("Done");

    await user.type(author, 'test author')
    await user.type(title, 'test title')
    await user.type(url, 'test url')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test title')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('test url')
})