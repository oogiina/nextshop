'use client'

import { useState } from "react"

export default function CartButton(props: { productName: string }) {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div>
     <button
  onClick={() => {  setCartCount(cartCount + 1)
    console.log(props.productName)
  }}
>
  Сагсанд хийх👾
</button>
      <p>Сагс: {cartCount}</p>
    </div>
  )
}
