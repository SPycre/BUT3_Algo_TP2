import { computeLineSubTotal, useStore } from "../hooks/use-cart";


export default function CartCounter() {
    console.log("rendu counter")
    const lines = useStore((state) => state.lines)
    return (
        <section className="w-full">{lines.length}</section>
    )
}