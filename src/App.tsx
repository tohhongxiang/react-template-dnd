import React, { useState } from 'react'
import './App.scss'
import Editor from './components/Editor'
import WidgetList from './components/WidgetList'
import styles from './App.module.scss'
import widgetData, { Widget } from './widgetData'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

export default function App() {
    const [items, setItems] = useState<{[key: string]: Widget}>({})
    const [sequence, setSequence] = useState<string[]>([])
    const [focus, setFocus] = useState<number | null>(null)

    const updateWidget = (index: number) => (updatedValues: any) => {
        const id = sequence[index]
        const updatedWidget = updatedValues.reduce((accum: Widget, value: any) => {
            return recursiveUpdate(value.arrayIndices, accum, value)
        }, items[id])

        setItems(prevItems => ({
            ...prevItems,
            [id]: updatedWidget
        }))
        setFocus(null)

        function recursiveUpdate(arrayIndices: number[], objectToUpdate: Widget, updatedField: Widget): Widget {
            if (arrayIndices.length === 0) {
                return {
                    ...objectToUpdate,
                    props: {...objectToUpdate.props, ...updatedField.props},
                    style: {...objectToUpdate.style, ...updatedField.style}
                }
            } else if (arrayIndices.length === 1) {
                const allFields : Widget['fields'] = JSON.parse(JSON.stringify(objectToUpdate.fields))
                const fieldToUpdate = allFields[arrayIndices[0]]
                allFields.splice(arrayIndices[0], 1, {
                    ...fieldToUpdate, 
                    ...updatedField, 
                    props: {...fieldToUpdate.props, ...updatedField.props}, 
                    style: {...fieldToUpdate.style, ...updatedField.style}
                })

                return {
                    ...objectToUpdate,
                    fields: allFields
                }
            } else {
                const updateField : Widget['fields'] = JSON.parse(JSON.stringify(objectToUpdate.fields))
                updateField.splice(arrayIndices[0], 1, recursiveUpdate(arrayIndices.slice(1), updateField[arrayIndices[0]], updatedField))
                return {
                    ...objectToUpdate,
                    fields: updateField
                }
            }
        }
    }
    
    const focusWidget = (indexToFocus: number) => () => setFocus(indexToFocus)
    
    const handleDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result
        
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        
        if (source.droppableId !== destination.droppableId && destination.index !== null) {
            insertWidget(draggableId, destination.index)
        } else {
            reorderWidget(source.index, destination.index)
        }
        
        function insertWidget(widgetId: string, destination: number) {
            const id = widgetId.replace('widget-', '')
            const insertedWidget = widgetData[id]
            const generatedId = `${Date.now().toString()}-${id}`
            setItems(prevItems => ({
                ...prevItems,
                [generatedId]: insertedWidget
            }))
            return setSequence(prevSequence => {
                const updatedSequence = Array.from(prevSequence)
                updatedSequence.splice(destination, 0, generatedId)
                return updatedSequence
            })
        }

        function reorderWidget(from: number, to: number) {
            setSequence(prevSequence => {
                const updatedSequence = Array.from(prevSequence)
                const itemToMove = updatedSequence.splice(from, 1)[0]
                updatedSequence.splice(to, 0, itemToMove)
                return updatedSequence
            })
        }
    }

    const deleteWidget = (index: number) => () => {
        const id = sequence[index]
        console.log({id, sequence, items})

        setSequence(prevSeq => {
            const updatedSeq = [...prevSeq]
            updatedSeq.splice(index, 1)
            return updatedSeq
        })

        setItems(prevItems => {
            const updatedItems = JSON.parse(JSON.stringify(prevItems))
            delete updatedItems[id]
            return updatedItems
        })
    }

    return (
        <div className={styles.layout}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Editor items={sequence.map(id => items[id])} 
                focus={focus} updateWidget={updateWidget} 
                focusWidget={focusWidget} deleteWidget={deleteWidget}
                />
                <WidgetList widgets={widgetData}/>
            </DragDropContext>
        </div>
    )
}
