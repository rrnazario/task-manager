import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Moment from 'react-moment';
import moment from 'moment'
import CalendarToday from '@material-ui/icons/CalendarToday'

const marginGrid = 8;

export class Column extends Component {
    

    getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: marginGrid,
        width: 250
    });

    

    getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: marginGrid * 2,
        margin: `0 0 ${marginGrid}px 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgrey' : 'white',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    render() {
        return (
            <Droppable droppableId={this.props.id}>
                {(provided, snapshot) => (
                    <div
                        className="storyColumn"
                        ref={provided.innerRef}
                        style={this.getListStyle(snapshot.isDraggingOver)}>
                        <div className="columnTitle">
                            <p>{this.props.title}</p>
                            <hr />
                        </div>
                        {this.props.tasks.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (                                    
                                    <div
                                        className="taskCard"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={this.getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        <div style={{textAlign: "left"}}>
                                            {item.title}
                                        </div>
                                        <div style={{ textAlign: "left", fontSize:"10px" }}>
                                            {item.description}
                                        </div>
                                        <div style={{ textAlign: "right", fontSize: "12px", color: "rgba(98, 152, 142)" }}>                                            
                                            {moment(item.endDate).isValid()
                                                ? (<div style={{ verticalAlign: "center" }}>
                                                    <CalendarToday style={{ fontSize: 12 }} /> <Moment format="MM/DD/YYYY">{item.endDate}</Moment>
                                                </div>) 
                                                : <span>-</span>
                                            }                 
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}