import React from 'react'
import styles from './index.module.scss'
import { Widget } from '../../widgetData'
import {Droppable} from 'react-beautiful-dnd'
import ContentEditorItem from './ContentEditorItem'

interface EditorProps {
    items: Widget[],
    focus: number | null,
    focusWidget: (index: number) => () => void,
    updateWidget: (index: number) => (value: any) => void,
    deleteWidget: (index: number) => () => void
}

export default function Editor({items, focus, focusWidget, updateWidget, deleteWidget}: EditorProps) {
    return (
        <Droppable droppableId="editor">
            {(provided) => (
                <div className={styles.editorRoot} {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => <ContentEditorItem 
                        key={index}
                        index={index} 
                        focus={focus} 
                        widget={item} 
                        updateWidget={updateWidget(index)} 
                        focusWidget={focusWidget(index)}
                        deleteWidget={deleteWidget(index)}
                    />)}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
