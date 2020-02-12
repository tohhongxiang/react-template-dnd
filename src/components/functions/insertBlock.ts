export default function insertBlock(currentOrder: string[], index: number, elementId: string) {
    const newOrder = Array.from(currentOrder)
    newOrder.splice(index, 0, elementId)
    return newOrder
}