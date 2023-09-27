import { Button, ProductCartLine } from "tp-kit/components"
import { clearCart, computeCartTotal, removeLine, updateLine, useStore } from "../hooks/use-cart"

export default function Cart() {
    const lines = useStore((state) => state.lines)
    return (
        <section className="w-full lg:w-1/3 space-y-8">
            {lines.map((line) => (
                <ProductCartLine
                product={line.product}
                key={line.product.id}
                qty={line.qty}
                onDelete={() => {removeLine(line.product.id)}}
                onQtyChange={(qty) => {updateLine({product:line.product,qty:qty})}}
                />
            ))}
			<div className="font-bold flex justify-between"><span>Total : </span><span>{computeCartTotal(lines)} €</span></div>
            <Button fullWidth>Commander</Button>
			<Button variant={"outline"} onClick={() => clearCart()} fullWidth>Vider le panier</Button>
		</section>
    )
}