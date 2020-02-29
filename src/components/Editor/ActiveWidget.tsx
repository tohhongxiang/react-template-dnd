import React, { useRef } from 'react'
import { Widget } from '../../widgetData'
import styles from './ActiveWidget.module.scss'

interface ActiveWidgetProps {
    widget: Widget,
    updateWidget: (updatedValues: any) => void
}

export default function ActiveWidget({widget, updateWidget}: ActiveWidgetProps) {
    const ref = useRef<HTMLDivElement>(null)
    const handleSubmit = () => {
        const updatedValues = Array.from(ref.current!.querySelectorAll('input')).map(input => {
            const result : {props: {[key: string]: any}, arrayIndices: string[], [key: string]: any} = {props: {}, arrayIndices: []}
            
            const [category, key, ...arrayIndices] = input.id.split('-')
            if (arrayIndices.length === 1 && arrayIndices[0] === "") {
                result.arrayIndices = []
            } else {
                result.arrayIndices = arrayIndices
            }

            if (category) {
                result[category][key] = input.value
            } else {
                result[key] = input.value
            }
            return result
        })
        updateWidget(updatedValues)
    }

    return (
        <div ref={ref}>
            {renderWidgetEditableFields(widget)}
            <button onClick={handleSubmit}>OK</button>
        </div>
    )
}

function renderWidgetEditableFields(widget: Widget, overallIndex: number[] = []) : any {
    const overallIndexKey = overallIndex.join('-')
    const editProps = Object.entries(widget.props).map(([key, value]) => renderLabelWithInput(key, value, `props-${key}-${overallIndexKey}`))
    const editInnerText = widget.innerText ? renderLabelWithInput(widget.type, widget.innerText, `-innerText-${overallIndexKey}`) : null
    const editFields = widget.fields.map((field, index) => renderWidgetEditableFields(field, [...overallIndex, index]))
    console.log(widget)
    return (
        <div key={overallIndexKey}>
            <strong>{widget.name}</strong>
            {editProps}
            {editInnerText}
            {editFields.map((editField, index) => (
                <div className={styles.fieldGroup} key={index}>
                    {editField}
                </div>
            ))}
        </div>
    )
}

function renderLabelWithInput(key: string, value: any, id: string) {
    return (
        <div key={id}>
            <label htmlFor={id}>{key}</label>
            <input id={id} defaultValue={value}/>
        </div>
    )
}

// function renderEditableField(field: Widget, index: string[]) {
//     const joinedIndex = index.join('-')
//     return (
//         <div key={joinedIndex}>
//             {field.innerText && <>
//                 <label htmlFor={`innerText-${joinedIndex}`}>{field.type}</label>
//                 <input id={`innerText-${joinedIndex}`} defaultValue={field.innerText} />
//             </>}
//             {Object.entries(field.props).map(([key, value]) => (
//                 <div key={key}>
//                     <label htmlFor={`${key}-${joinedIndex}`}>{key}</label>
//                     <input id={`${key}-${joinedIndex}`} defaultValue={value as string}/>
//                 </div>
//             ))}
//         </div>
//     )
// }
