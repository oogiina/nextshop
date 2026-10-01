'use client'
import { useState } from 'react'
export default function CartButton() {
    const [cartCount, setCartCount] = useState(0)
    return (
   <>
      <button
        onClick={() => {
          setCartCount(prev => prev + 1)
        }}
      >
        Сагсанд хийх
      </button>

      <p>Сагс: {cartCount}</p>
    </>
    )
}
