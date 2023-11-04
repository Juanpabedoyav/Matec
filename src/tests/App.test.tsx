import { describe, test, expect } from 'vitest'
import {render, screen} from '@testing-library/react'
import App from '../App'

describe('<App />', () => {
    test('should add items to the list', async() => {
        render(<App />);
        const allButton = screen.getAllByRole('button')
        expect(allButton).toBeDefined();
      });
        
        
})