export default function reorderBlocks(currentOrder: string[], from: number, to: number) {
    const newOrder = Array.from(currentOrder)
    const elementToMove = newOrder.splice(from, 1)
    newOrder.splice(to, 0, ...elementToMove)

    return newOrder
}