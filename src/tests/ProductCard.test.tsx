import { render,  screen } from "@testing-library/react"
import { describe, expect, test, vi } from 'vitest'
import ProductCard from "../components/ProductCard/Index"
import userEvent from "@testing-library/user-event"
describe( '<ProductCard />', () => {

    const user = userEvent.setup()
    const handlerSubmit = vi.fn()
   
    const item = {
        id: crypto.randomUUID(), 
        name: 'test', 
        unit_price: 100, 
        stock: 10, 
        quantity: 1, 
        type: 'sport',
        totalprice: 100
    }
    render(<ProductCard handlerSubmit={handlerSubmit} item={item} key={item.id}/>)
        test('should show the Card', () =>{
            const card = screen.getByRole('article')
            const title = screen.getByText('test')
            expect(card).toBeDefined()
            expect(title).toBeDefined()
 
        })
    test('Button show the Card', async() =>{
        const input = screen.getByRole('spinbutton')
        expect(input).toBeDefined()

        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        const button = form.querySelector('button')
        const isButton = button instanceof HTMLButtonElement
        if(!isButton && button == null) return
        expect(button).toBeDefined()
        await user.type(input, '1')
        await user.click(button)
    })
})