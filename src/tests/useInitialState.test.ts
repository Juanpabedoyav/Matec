import { describe, expect, test } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useInitialState from "../hooks/useInitialState";

describe('useInitialState hook', () => {
  test('should add product to shoppin Cart', () => {
    const { result } = renderHook(() => useInitialState())
    //check initial cart is empty
    expect(result.current.state.cart.length).toBe(0)
    expect(result.current.state.isOpenOrder).toBe(true)
    //add product to cart
    act(() => {
      result.current.addProduct({
        id: crypto.randomUUID(), 
        name: 'test', 
        unit_price: 100, 
        stock: 10, 
        quantity: 1, 
        type: 'sport',
        totalprice: 100  
      })
    })
    //check cart has one product
    expect(result.current.state.cart.length).toBe(1)

  })
})