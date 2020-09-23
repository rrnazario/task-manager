import React, { Component } from 'react';
import { Story } from './components/Story';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { stories: [], loading: true };
    }

    async getItemsFromBackend() {

        const response = await fetch('story');
        const data = await response.json();
        console.log(data);
        this.setState({ stories: data, loading: false });
    }

    componentDidMount() {
        this.getItemsFromBackend();
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : App.renderStories(this.state.stories);

        return (
            <div>
                <h2>Stories</h2>
                {contents}
            </div>
        );
    }    

    static renderStories(stories) {
        return (
            <div id="root">
                {stories.map((story, index) =>
                    <Story key={index} id={story.id} description={story.description} tasks={story.tasks} />
                )}
            </div>
        );
    }

}
