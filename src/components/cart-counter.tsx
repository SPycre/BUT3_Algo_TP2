import { useStore } from "../hooks/use-cart"


export default function CartCounter() {
    console.log("render count")
    const count = useStore((state) => state.count)
    return (
        <>{count}</>
    )
}