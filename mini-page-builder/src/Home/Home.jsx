import React, { useState } from 'react';
import "./Home.css";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from '../Components/DraggableCard.jsx';

const Home = ({ homePageData }) => {

    return (
        <div id='home-main'>
            <Droppable droppableId='home'>
                {
                    (provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <div className='home-inner'>
                                {
                                    homePageData?.map((card, index) => (
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
    );
}

export default Home;
