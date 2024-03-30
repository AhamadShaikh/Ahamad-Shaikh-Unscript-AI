import React, { useState } from 'react';
import "./Home.css";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from '../Components/DraggableCard.jsx';

const Home = ({ homePageData }) => {

    const [selected, setSelected] = useState(null);

    const handleKeyDown = (event, cardId) => {
        if (event.key === "Enter" && selected === cardId) {
            event.preventDefault();
            // Open the modal to update the configuration
        }
    };

    const handleDelete = (cardId) => {
        setHomePageData((prevState) =>
            prevState.filter((el) => el.id !== cardId)
        );
        setSelected(null);
    };

    return (
        <div id='home-main'>
            <Droppable droppableId='home'>
                {
                    (provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <div className='home-inner'>
                                {
                                    homePageData?.map((card, index) => (
                                        <DraggableCard key={index}
                                        card={card}
                                        index={index}
                                        selected={selected}
                                        setSelected={setSelected}
                                        handleKeyDown={handleKeyDown}
                                        handleDelete={handleDelete} />
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
