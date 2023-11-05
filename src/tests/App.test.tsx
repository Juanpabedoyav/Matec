import { describe, test, expect } from 'vitest'
import {render,  screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('<App />', () => {
  render(<App />)
  const user = userEvent.setup()

    test('should show input search', async() => {
        const input = screen.getByRole('textbox') as HTMLInputElement
        expect(input).toBeDefined()
        await user.type(input, 'iphone')
        expect(input.value).not.toBe('')
      });
    test('should show the button create order', () =>{
        const createOrder = screen.getByText(/Create Order/i)
        expect(createOrder).toBeDefined()
        createOrder.click()
        screen.debug()
    })
        
})