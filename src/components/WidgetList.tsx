import React from 'react'
import styles from './WidgetList.module.scss'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const availableWidgets = [
    {
        type: 'h1',
        id: 'h1'
    },
    {
        type: 'h2',
        id: 'h2'
    },
    {
        type: 'h3',
        id: 'h3'
    },
    {
        type: 'p',
        id: 'p'
    },
]

export default function WidgetList() {
    return (
        <div className={styles.widgetContainer}>
            <Droppable droppableId="widget-list" isDropDisabled={true}>
                {(provided, snapshot) => <ul className={styles.widgetList} ref={provided.innerRef} {...provided.droppableProps}>
                    {availableWidgets.map((widget: any, index) => (
                        <Draggable draggableId={`${widget.id}-widget`} index={index} key={widget.id}>
                            {(provided, snapshot) =>  (
                                <>
                                    <li 
                                        ref={provided.innerRef} 
                                        {...provided.dragHandleProps} 
                                        {...provided.draggableProps} 
                                        style={provided.draggableProps.style} 
                                        className={`${styles.widgetButton} ${snapshot.isDragging && styles.isDragging}`}>
                                        {widget.type}
                                    </li>
                                    {snapshot.isDragging && (
                                        <li className={`${styles.widgetButton} ${styles.widgetClone}`}>{widget.type}</li>
                                    )}
                                </>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>}
            </Droppable>
        </div>
    )
}
