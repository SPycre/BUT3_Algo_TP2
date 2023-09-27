import { computeLineSubTotal, useStore } from "../hooks/use-cart";


export default function CartCounter() {
    console.log("rendu counter")
    const count = useStore((state) => state.count)
    return (
        <section className="w-full">{count}</section>
    )
}