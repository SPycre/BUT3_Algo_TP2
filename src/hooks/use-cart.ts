import { create } from 'zustand'
import { CartData, ProductLineData } from '../types'
import { ProductData } from 'tp-kit/types'
import { ProductCartLine } from 'tp-kit/components';

const useStore = create<CartData>(set => ({
    lines:[]
}))

export function addLine(product: ProductData) {
    useStore(data => {
        let exist = false
        data.lines.forEach(line => {
            if (line.product == product) {
                line.qty += 1
                exist = true
            }
        })
        if (!exist) {
            data.lines.push({
                qty:1,
                product:product
            })
        }
    })
}

export function updateLine(line: ProductLineData) {
    useStore(data => {
        data.lines.forEach(cline => {
            if (cline.product == line.product) {
                cline.qty = line.qty
            }
        })
    })
}

export function removeLine(productId: number) {
    useStore(data => {
        data.lines.forEach((line,index) => {
            if (line.product.id == productId) {
                data.lines.splice(index,1)
            }
        })
    })
}

export function clearCart() {
    useStore(data => {
        data.lines.splice(0,data.lines.length)
    })
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