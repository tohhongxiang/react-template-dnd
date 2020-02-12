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
                {provided => <ul className={styles.widgetList} {...provided.droppableProps} ref={provided.innerRef}>
                    {availableWidgets.map((widget: any, index) => (
                        <li>
                        <Draggable draggableId={`${widget.id}-widget`} index={index} key={widget.id} >
                            {(provided, snapshot) =>  (
                                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                    <div className={`${styles.widgetButton} ${snapshot.isDragging && styles.isDragging}`}>{widget.type}</div>
                                </div>
                            )}
                        </Draggable>
                        </li>
                    ))}
                    {provided.placeholder}
                </ul>}
            </Droppable>
        </div>
    )
}
