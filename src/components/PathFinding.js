import React from "react";
import "./PathFinding.css";
import Node from "./Node";

export default class PathFindingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {nodes: []};
    }

    componentDidMount() {

        const nodes = [];

        for (let row = 0; row < 15; row++) {

            const currRow = [];

            for (let col = 0; col < 50; col++) {

                currRow.push([]);

            }

            nodes.push(currRow);

        }

        this.setState({nodes});


    }

    render() {

        const nodes2 = this.state.nodes;

        return (<div className="grid">

            {
                nodes2.map((row, rowIndex) => {
                    return(<div>
                        {row.map((node, nodeIndex) => <Node></Node>)}
                    </div>)
                })
            }

        </div>);
    }

}