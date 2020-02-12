import React from 'react'
import { BlockType } from './Block'
import styles from './Previewer.module.scss'

interface PreviewerProps {
    content: Omit<BlockType, 'index'>[]
}

export default function Previewer({content} : PreviewerProps) {
    const elements = content.map(block => React.createElement(block.type, {className: styles[block.type]}, block.text))
    return (
        <div>
            {elements}
        </div>
    )
}
