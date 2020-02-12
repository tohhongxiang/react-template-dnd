import React, { useState } from 'react'
import Block, { BlockType } from './Block'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import WidgetList from './WidgetList'
import styles from './Editor.module.scss'
import reorderBlocks from './functions/reorderBlocks'
import insertBlocks from './functions/insertBlock'
import Previewer from './Previewer'

interface IBlocks {
    [key: string]: Omit<BlockType, 'index'>
}

const data = {}

export default function Editor() {
    const [blocks, setBlocks] = useState<IBlocks>(data)
    const [blockOrder, setBlockOrder] = useState<string[]>([])

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result

        if (!destination) return // dropped outside
        if (source.index === destination.index && source.droppableId === destination.droppableId) return // no change

        if (draggableId.includes('widget')) { //drag widget into content
            const blockTypeToCreate = draggableId.replace('-widget', '')
            const createdBlock = createBlock(blockTypeToCreate)
            setBlocks(prevBlocks => ({
                ...prevBlocks,
                [createdBlock.id]: createdBlock
            }))

            return setBlockOrder(prevBlockOrder => {
                const newBlockOrder = insertBlocks(prevBlockOrder, destination.index, createdBlock.id)
                return newBlockOrder
            })
        }

        return setBlockOrder(prevBlockOrder => { // rearrange content
            const newOrder = reorderBlocks(prevBlockOrder, source.index, destination.index)
            return newOrder
        })
    }

    const updateBlock = (id: BlockType['id'], updatedText: BlockType['text']) => {
        setBlocks(prevBlocks => ({
            ...prevBlocks,
            [id]: {
                ...prevBlocks[id],
                text: updatedText
            }
        }))
    }

    const deleteBlock = (id: BlockType['id']) => {
        setBlocks(prevBlocks => {
            const newBlocks = {...prevBlocks}
            delete newBlocks[id]
            return newBlocks
        })

        setBlockOrder(prevBlockOrder => prevBlockOrder.filter(block => block !== id))
    }

    const [isPreviewing, setIsPreviewing] = useState(false)

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.editLayout}>
                <div className={styles.editor}>
                    <header className={styles.editorHeader}>
                        <h1>{isPreviewing ? 'Preview' : 'Edit'}</h1>
                        <button onClick={() => setIsPreviewing(p => !p)}>{isPreviewing ? 'Edit' : 'Preview'}</button>
                    </header>
                    {!isPreviewing ? <Droppable droppableId="editor">
                        {(provided, snapshot) => 
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <div className={`${snapshot.isDraggingOver && styles.isDraggingOver} ${styles.editorContent}`}>
                                    {blockOrder.length > 0 ? blockOrder.map((block : keyof IBlocks, index) => {
                                        const blockInfo = blocks[block]
                                        return <Block key={blockInfo.id} {...blockInfo} index={index} updateBlock={updateBlock} deleteBlock={deleteBlock}/>
                                    }) : <p><i>Drag a widget in from the right</i></p>}
                                    {provided.placeholder}
                                </div>
                            </div>
                        }
                    </Droppable> : <Previewer content={blockOrder.map(blockId => blocks[blockId])} />}
                </div>
                {isPreviewing || <WidgetList />}
            </div>
        </DragDropContext>
    )
}

function createBlock(type: string) : Omit<BlockType, 'index'> {
    return {
        id: Date.now().toString(),
        type,
        text: ''
    }
}
