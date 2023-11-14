import { Button, FormattedPrice, ProductCartLine } from "tp-kit/components"
import { clearCart, computeCartTotal, removeLine, updateLine, useStore } from "../hooks/use-cart"
import CartCounter from "./cart-counter"
import { createOrder } from "../actions/create-orders"

export default function Cart() {
    const lines = useStore((state) => state.lines)
    return (
        <>
        {lines.map((line) => (
                <ProductCartLine
                className="m-1"
                product={line.product}
                key={line.product.id}
                qty={line.qty}
                onDelete={() => {removeLine(line.product.id)}}
                onQtyChange={(qty) => {updateLine({product:line.product,qty:qty})}}
                />
            ))}
			<div className="font-bold flex justify-between"><FormattedPrice price={computeCartTotal(lines)}/></div>
            <Button className="m-1" fullWidth onClick={() => {
                createOrder(lines)
                clearCart()
            }}>Commander</Button>
			<Button className="m-1" variant={"outline"} onClick={() => clearCart()} fullWidth>Vider le panier</Button>
        </>  
    )
}