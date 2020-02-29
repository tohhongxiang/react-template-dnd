import { Widget } from '../../widgetData'
import React from 'react'

interface DisplayWidgetProps {
    widget: Widget
}

export default function DisplayWidget({ widget }: DisplayWidgetProps) {
    return renderWidget(widget)
}

// TODO remove the usage of dangerouslySetInnerHTML
function renderWidget(widget: Widget, indices: number[] = []): any {
    const overallProps: {[key: string]: any} = {
        ...widget.props, 
        style: widget.style, 
        key: indices.join('-')
    }

    if (widget.innerText) {
        overallProps.dangerouslySetInnerHTML = {__html: widget.innerText}
    }
    
    return React.createElement(
        widget.type,
        overallProps,
        widget.fields.length > 0 ? 
            widget.fields.map((field, index) => renderWidget(field, [...indices, index])) : null
    )
}