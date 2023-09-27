import { create } from 'zustand'
import { CartData, ProductLineData } from '../types'
import { ProductData } from 'tp-kit/types'
import { ProductCartLine } from 'tp-kit/components';

export const useStore = create<CartData>(set => ({
    lines:[]
}))

export function addLine(product: ProductData) {
    useStore.setState((state) => {
        const index = state.lines.findIndex(line => line.product.id === product.id)
        if (index != -1) {
            state.lines[index].qty += 1
        } else {
            state.lines.push({
                qty:1,
                product:product
            })
        }
        return {lines:[...state.lines]}
    })
}

export function updateLine(line: ProductLineData) {
    useStore.setState((state) => {
        const index = state.lines.findIndex(cline => cline.product.id === line.product.id)
        if (index != -1) {
            state.lines[index] = line
        }
        return {lines:[...state.lines]}
    })
}

export function removeLine(productId: number) {
    useStore.setState((data) => {
        data.lines.forEach((line,index) => {
            if (line.product.id == productId) {
                data.lines.splice(index,1)
            }
        })
        return {lines:[...data.lines]}
    })
}

export function clearCart() {
    useStore.setState((data) => ({
        lines:[]
    }))
}

export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.qty;
}

export function computeCartTotal(lines: ProductLineData[]): number {
    let total = 0;
    lines.forEach( line => {
        total += line.product.price * line.qty
    })
    return total;
}