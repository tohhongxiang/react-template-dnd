import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styles from './Block.module.scss'

export interface BlockType {
    id: string,
    type: string,
    text: string,
    index: number
}

interface BlockProps extends BlockType {
    updateBlock: ( id: BlockType['id'], updatedContent: string) => void,
    deleteBlock: (id: BlockType['id']) => void
}

export default function Block({type, text, id, index, updateBlock, deleteBlock} : BlockProps) {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => <div {...provided.draggableProps}  ref={provided.innerRef}>
                <div className={styles.block}>
                    <div {...provided.dragHandleProps} className={styles.dragHandle}></div>
                    <input value={text} onChange={e => updateBlock(id, e.target.value)} className={`${styles.input} ${styles[type]}`} placeholder={type} />
                    <button className={styles.deleteButton} onClick={() => deleteBlock(id)}>x</button>
                </div>
            </div>}
        </Draggable>
    )
}
