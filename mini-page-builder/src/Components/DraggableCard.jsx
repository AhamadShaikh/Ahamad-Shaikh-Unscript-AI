import React from 'react'
import { Draggable } from "react-beautiful-dnd"
import "./DraggableCard.css"

const DraggableCard = ({ card,
    index,
    selected,
    setSelected,
    handleKeyDown,
    handleDelete, }) => {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`card-main ${selected === card.id ? "selected" : ""}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => setSelected(card.id)}
                    onKeyDown={(event) => handleKeyDown(event, card.id)}
                    tabIndex="0"
                >
                    {card.content}
                </div>
            )}
        </Draggable>
    );
}

export default DraggableCard