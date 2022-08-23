import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from "@testing-library/dom"
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'This is a test',
    date: new Date().toISOString(),
    important: true
  }

  const component = render(<Note note={note} />)

  // component.debug()

  // const li = component.container.querySelector('li')
  // console.log(prettyDOM(li))

  component.getByText('This is a test')
  // expect(component.container).toHaveTextContent(note.content)
})

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'This is a test',
    date: new Date().toISOString(),
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(<Note note={note} toggleImportance={mockHandler} />)

  const button = component.getByText('make not important')
  fireEvent.click(button)

  // expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler).toHaveBeenCalledTimes(1)
})
