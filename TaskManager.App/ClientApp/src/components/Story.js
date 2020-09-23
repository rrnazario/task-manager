import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Column } from './Column'

export class Story extends Component {
    constructor(props) {
        super(props);

        this.state = { toDoTasks: [], doneTasks: [] };
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        toDo: 'toDoTasks',
        done: 'doneTasks'
    };

    getList = id => this.state[this.id2List[id]];

    componentDidMount() {
        this.getToDoTasks();
        this.getDoneTasks();
    }

    getToDoTasks = () => this.getTasks(0);
    getDoneTasks = () => this.getTasks(1);

    getTasks = (status) => {
        let tasks = this.props.tasks.filter(task => task.status === status);

        tasks = tasks.map(task =>
            ({
                id: `item-${task.id}-${this.props.id}`,
                title: task.title,
                description: task.description,
                endDate: task.endDate === '0001-01-01T00:00:00' ? '-' : task.endDate
            }));

        switch (status) {
            case 0:
                this.setState({ toDoTasks: tasks });
                break;
            case 1:
                this.setState({ doneTasks: tasks });
                break;
            default:
                break;
        }
    }

    // a little function to help us with reordering the result
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
* Moves an item from one list to another list.
*/
    move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    onDragEnd = (result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = this.reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'done') {
                state = { doneTasks: items };
            }
            else {
                state = { toDoTasks: items };
            }

            this.setState(state);
        } else {
            const result = this.move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                toDoTasks: result.toDo,
                doneTasks: result.done
            });
        }
    };

    //Mounting lists
    render() {
        return (
            <div className="storyArea">
                <div className="storyTitle">
                    <h4>{this.props.description}</h4>
                </div>
                <div className="columnsArea">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Column id="toDo" title="To Do" tasks={this.state.toDoTasks} />
                        <Column id="done" title="Done" tasks={this.state.doneTasks} />
                    </DragDropContext>
                </div>
            </div>
        );
    }
}