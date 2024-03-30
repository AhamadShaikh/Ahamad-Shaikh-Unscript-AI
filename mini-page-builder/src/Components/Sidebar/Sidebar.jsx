import React from 'react'
import DraggableCard from '../DraggableCard';
import "./Sidebar.css"
import { Droppable } from 'react-beautiful-dnd';

const Sidebar = ({ sidebarData }) => {
    return (
        <div id='sidebar-main'>
            <Droppable droppableId='sidebar'>
                {
                    (provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <div className='sidebar-inner'>
                                {
                                    sidebarData?.map((card, index) => (
                                        <DraggableCard key={index} card={card} index={index} />
                                    ))
                                }
                            </div>
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>

        </div>
    )
}

export default Sidebar


