export default function omitKey(object: {[key: string]: any}, key: string) {
    const objectCopy = JSON.parse(JSON.stringify(object))
    if (objectCopy.hasOwnProperty(key)) {
        delete objectCopy[key]
    }

    return objectCopy
}