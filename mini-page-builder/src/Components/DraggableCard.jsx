import React from 'react'
import { Draggable } from "react-beautiful-dnd"
import "./DraggableCard.css"

const DraggableCard = ({ card, index }) => {
    return (
        <Draggable draggableId={card.id.toString()} index={index}>
            {(provided,snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className='card-main'>
                        {card.content}
                    </div>
                </div>
            )}
        </Draggable>

    )
}

export default DraggableCard