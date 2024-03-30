import React, { useState, useEffect, useRef } from 'react'
import Home from '../Home/Home'
import Sidebar from '../Components/Sidebar/Sidebar'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./MainRoot.css"
import Modal from '../Components/Modal/Modal';

const initialCards = [
    { id: 'label', content: 'Label' },
    { id: 'input', content: 'Input' },
    { id: 'button', content: 'Button' },
];

const initialState = {
    text: "",
    x: '',
    y: '',
    fontSize: '',
    fontWeight: ''
}

const MainRoot = () => {

    const [homePage, setHomepage] = useState([]);
    const [sidebar, setSidebar] = useState(initialCards);
    const [modalOpen, setModalOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [submittedData, setSubmittedData] = useState(initialState)
    const [form, setForm] = useState('')
    const [selectedElement, setSelectedElement] = useState(null);

    const { domEle } = useRef(null)


    const handleChange = (e) => {
        const { name, value, type } = e.target
        let setForm = type === "number" ? +value : value
        setSubmittedData((prev) => ({ ...prev, [name]: setForm }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('data', JSON.stringify(submittedData))
        const { x, y } = submittedData;
        const labelElement = document.getElementById('label-element');
        labelElement.style.position = 'absolute';
        labelElement.style.left = `${x}px`;
        labelElement.style.top = `${y}px`;
        setModalOpen(false)
    }



    const onDragEnd = (result) => {
        const { destination, source } = result;
        console.log(result);

        if (result.draggableId === "label") {
            setForm('label')
        } else if (result.draggableId === "input") {
            setForm('input')
        } else if (result.draggableId === "button") {
            setForm('button')
        }

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const x = result.destination.clientX;
        const y = result.destination.clientY;
        setMousePosition({ x, y });

        console.log(mousePosition);


        setModalOpen(true);

        let add;
        let home = [...homePage];
        let side = [...sidebar];

        if (source.droppableId === "home") {
            add = home[source.index];
            home.splice(source.index, 1);
        } else {
            add = side[source.index];
            side.splice(source.index, 1);
        }

        if (destination.droppableId === "home") {
            home.splice(destination.index, 0, add);
        } else {
            side.splice(destination.index, 0, add);
        }

        setHomepage(home);
        setSidebar(side);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <div id='main-container'>
                <div></div>
                <div>
                    <Home homePageData={homePage} />
                </div>
                <div>
                    <Sidebar sidebarData={sidebar} />
                </div>
            </div>
            {modalOpen && (
                <Modal closeModal={handleCloseModal}>
                    {
                        form === 'label' ? <form className='form' onSubmit={handleSubmit}>
                            <h2>Edit Label</h2>
                            <hr />
                            <div className='text' >
                                <span>Text</span>
                                <input type="text" name='text' value={submittedData.text} onChange={handleChange} placeholder='This is a label' />
                            </div>
                            <div className='x'>
                                <span>X</span>
                                <input type="number" name='x' value={submittedData.x} onChange={handleChange} />
                            </div>
                            <div className='y'>
                                <span>Y</span>
                                <input type="number" name='y' value={submittedData.y} onChange={handleChange} />
                            </div>
                            <div className='font-size'>
                                <span>Font Size</span>
                                <input type="number" name='fontSize' value={submittedData.fontSize} onChange={handleChange} />
                            </div>
                            <div className='font-weight'>
                                <span>Font Weight</span>
                                <input type="number" name='fontWeight' value={submittedData.fontWeight} onChange={handleChange} />
                            </div>
                            <div className='submit-btn'>
                                <input type="submit" value={"Save Changes"} />
                            </div>
                        </form> : form === 'input' ? <form className='form'>
                            <h2>Edit Input</h2>
                            <hr />
                            <div className='text'>
                                <span>Text</span>
                                <input type="text" placeholder='This is a label' />
                            </div>
                            <div className='x'>
                                <span>X</span>
                                <input type="number" />
                            </div>
                            <div className='y'>
                                <span>Y</span>
                                <input type="number" />
                            </div>
                            <div className='font-size'>
                                <span>Font Size</span>
                                <input type="number" />
                            </div>
                            <div className='font-weight'>
                                <span>Font Weight</span>
                                <input type="number" />
                            </div>
                            <div className='submit-btn'>
                                <input type="submit" value={"Save Changes"} />
                            </div>
                        </form> : <form className='form'>
                            <h2>Edit Button</h2>
                            <hr />
                            <div className='text'>
                                <span>Text</span>
                                <input type="text" placeholder='This is a label' />
                            </div>
                            <div className='x'>
                                <span>X</span>
                                <input type="number" />
                            </div>
                            <div className='y'>
                                <span>Y</span>
                                <input type="number" />
                            </div>
                            <div className='font-size'>
                                <span>Font Size</span>
                                <input type="number" />
                            </div>
                            <div className='font-weight'>
                                <span>Font Weight</span>
                                <input type="number" />
                            </div>
                            <div className='submit-btn'>
                                <input type="submit" value={"Save Changes"} />
                            </div>
                        </form>
                    }

                </Modal>
            )}
        </DragDropContext>

    )
}

export default MainRoot