import React from 'react'
import styles from './index.module.scss'
import { Widget } from '../../widgetData'
import { Droppable, Draggable } from 'react-beautiful-dnd'

interface WidgetListProps {
    widgets: {
        [key: string]: Widget
    }
}

export default function WidgetList({widgets} : WidgetListProps) {
    return (
        <Droppable droppableId="widget-list" isDropDisabled={true}>
            {provided => (
                <div className={styles.widgetListRoot} {...provided.droppableProps} ref={provided.innerRef}>
                    {Object.entries(widgets).map(([id, widget], index) => (
                        <Draggable draggableId={`widget-${id}`} index={index} key={id}>
                            {(provided, snapshot) => (
                                <>
                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <p>{widget.name}</p>
                                    </div>
                                    {snapshot.isDragging && <div className={styles.widgetListItemClone}><p>{widget.name}</p></div>}
                                </>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        
    )
}
