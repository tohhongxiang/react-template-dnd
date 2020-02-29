import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import ActiveWidget from './ActiveWidget'
import DisplayWidget from './DisplayWidget'
import { Widget } from '../../widgetData'
import styles from './ContentEditorItem.module.scss'

interface WidgetProps {
    index: number,
    focus: number | null,
    widget: Widget,
    updateWidget: (value: any) => void,
    focusWidget: () => void,
    deleteWidget: () => void
}

export default function ContentEditorItem({index, focus, widget, updateWidget, focusWidget, deleteWidget}: WidgetProps) {
    return (
        <Draggable draggableId={`${index}`} index={index}>
            {provided => (
                <div {...provided.draggableProps} ref={provided.innerRef} className={styles.contentEditorItem}>
                    <div className={styles.dragActions}>
                        <div {...provided.dragHandleProps} className={styles.dragHandle} />
                        {focus !== index && <button onClick={focusWidget}>Edit</button>}
                        <button onClick={deleteWidget}>Delete</button>
                    </div>
                    {
                        focus === index ? 
                        <ActiveWidget widget={widget} updateWidget={updateWidget} key={index} /> :
                        <DisplayWidget widget={widget} key={index} />
                    }
                </div>
            )}
        </Draggable>
    )
}
