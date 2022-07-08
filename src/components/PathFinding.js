import React from "react";
import "./PathFinding.css";
import Node from "./Node";
import {dijkstra, getNodesInShortestPathOrder} from '../pathfindingAlgos'

const start_row = 3;
const start_col = 5;

const finish_row = 10;
const finish_col = 45;

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


                const currNode = {
                    col,
                    row,
                    isStart: row === start_row && col === start_col,
                    isFinish: row === finish_row && col === finish_col,
                    distance: Infinity,
                    isVisited: false,
                    isWall: false,
                    previousNode: null,
                    visitedDuringMaze: false
                };

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

        const startNode = grid[start_row][start_col];
        const destNode = grid[finish_row][finish_col];

        const visitedNodes = dijkstra(grid, startNode, destNode);

        const nodesToAnimate = getNodesInShortestPathOrder(destNode);

        this.animateDijkstra(visitedNodes, nodesToAnimate);

    }

    handleMouseDown(row, col, wallStatus) {
        const newGrid = getNewGridWithWallToggled(this.state.nodes, row, col, wallStatus);
        this.setState({nodes: newGrid, mouseIsPressed: true});

    }

    handleMouseEnter(row, col, wallStatus) {
        if (!this.state.mouseIsPressed) {
            return;
        }
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col, wallStatus);
        this.setState({nodes: newGrid});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    resetWalls() {
        const newGrid = this.state.nodes.slice();
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 50; j++) {

                const currNode = newGrid[i][j]
                newGrid[i][j] = {
                    ...currNode,
                    isWall: false,
                    visitedDuringMaze: false,
                    previousNode: null
                };
            }
        }

        this.setState({nodes: newGrid});
    }


    generateMaze() {

        this.resetWalls();

        const grid = this.state.nodes.slice();

        const startNode = grid[start_row][start_col];
        const destNode = grid[finish_row][finish_col];

        dijkstra(grid, startNode, destNode);

        const nodesToAnimate = getNodesInShortestPathOrder(destNode);

        for (let i = 0; i < nodesToAnimate.length; i++) {

            let r = getRndInteger(0, 1);

            if (r === 1) {
                let d = getRndInteger(0, 3);
                let row = nodesToAnimate[i].row;
                let col = nodesToAnimate[i].col;

                let r2;
                let c2;

                if (d === 0) {
                    r2 = getRndInteger(0, row);
                    c2 = getRndInteger(col, 49);
                } else if (d === 1) {
                    r2 = getRndInteger(0, row);
                    c2 = getRndInteger(0, col);
                } else if (d === 2) {
                    r2 = getRndInteger(row, 14);
                    c2 = getRndInteger(col, 49);
                } else {
                    r2 = getRndInteger(row, 14);
                    c2 = getRndInteger(0, col);
                }

                console.log([r2, c2]);

                dijkstra(grid, grid[row][col], grid[r2][c2]);

                const visitedNodes2 = getNodesInShortestPathOrder(grid[r2][c2]);

                for (let j = 0; j < visitedNodes2.length; j++) {
                    grid[visitedNodes2[j].row][visitedNodes2[j].col].isWall = true;
                }

            }

            grid[nodesToAnimate[i].row][nodesToAnimate[i].col].isWall = true;
        }



        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 50; j++) {

                const currNode = grid[i][j]
                grid[i][j] = {
                    ...currNode,
                    isWall: !currNode.isWall,
                    previousNode: null
                };
            }
        }
        this.setState({nodes: grid});
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
                                        mouseIsPressed={mClicked}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col, !node.isWall)}
                                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col, !node.isWall)}
                                        onMouseUp={() => this.handleMouseUp()}

                                    ></Node>)}
                            </div>

                        )
                    })
                }
                <button onClick={() => this.visualiseDijkstra()}>Visualise Dijkstra's</button>
                <button onClick={() => this.generateMaze()}>Create Maze</button>
                <button onClick={() => this.resetWalls()}>Reset Walls</button>
            </div>
        );
    }

}


const getNewGridWithWallToggled = (grid, row, col, wallStatus) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    newGrid[row][col] = {
        ...node,
        isWall: wallStatus,
    };
    return newGrid;
};


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}