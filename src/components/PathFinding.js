import React from "react";
import "./PathFinding.css";
import Node from "./Node";
import {dijkstra, getNodesInShortestPathOrder} from '../pathfindingAlgos'

export default class PathFindingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {nodes: [], mouseIsPressed: false};
    }

    componentDidMount() {

        const nodes2 = [];

        for (let row = 0; row < 15; row++) {

            const currRow = [];

            for (let col = 0; col < 50; col++) {


                const currNode = {col, row, isStart: row === 11 && col === 5, isFinish: row === 10 && col === 45, distance: Infinity,
                    isVisited: false, isWall: false, previousNode: null};

                currRow.push(currNode);

            }

            nodes2.push(currRow);

        }

        this.setState({nodes: nodes2});


    }

    animateDijkstra(visited, shortestOrder) {

        for (let i = 0; i <= visited.length; i++) {
            if (i === visited.length) {
                setTimeout(() => {
                    this.animateShortestPath(shortestOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visited[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }


    }


    animateShortestPath(shortestOrder) {
        for (let i = 0; i < shortestOrder.length; i++) {
            setTimeout(() => {
                const node = shortestOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 50 * i);
        }
    }

    visualiseDijkstra() {
        const grid = this.state.nodes;

        const startNode = grid[10][5];
        const destNode = grid[10][45];

        const visitedNodes = dijkstra(grid, startNode, destNode);

        const nodesToAnimate = getNodesInShortestPathOrder(destNode);

        this.animateDijkstra(visitedNodes, nodesToAnimate);

    }

    handleMouseDown(row, col){
        console.log("down");
        const newGrid = getNewGridWithWallToggled(this.state.nodes, row, col);
        this.setState({nodes: newGrid, mouseIsPressed: true});

    }

    handleMouseEnter(row, col) {
        console.log("enter");
        if (!this.state.mouseIsPressed){
            return;
        }
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }

    handleMouseUp() {
        console.log("up");
        this.setState({mouseIsPressed: false});
    }

    render() {

        const nodes2 = this.state.nodes;
        const mClicked = this.state.mouseIsPressed;

        return (<div className="grid">
                <div>Click on empty nodes to place walls</div>
                {
                    nodes2.map((row, rowIndex) => {
                        return (<div>

                                {row.map((node, nodeIndex) =>
                                    <Node
                                        key={nodeIndex}
                                        col={node.col}
                                        row={node.row}
                                        isStart={node.isStart}
                                        isFinish={node.isFinish}
                                        isWall={node.isWall}
                                        mouseIsPressed = {mClicked}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseUp={() => this.handleMouseUp()}

                                    ></Node>)}
                            </div>

                        )
                    })
                }
                <button onClick={() => this.visualiseDijkstra()}>Visualise Dijkstra's</button>
            </div>
        );
    }

}


const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    newGrid[row][col] = {
        ...node,
        isWall: !node.isWall,
    };
    return newGrid;
};