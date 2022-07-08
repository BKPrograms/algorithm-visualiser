import React from "react";


export default class GraphsVisualiser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {nodes: [], mouseIsPressed: false, mouseX: 0, mouseY: 0};

        this.nodesRef = React.createRef();
    }

    componentDidMount() {
        this.drawNodes();
    }

    drawNodes() {
        const canvas = this.nodesRef.current;

        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'lightgrey';
        ctx.strokeStyle = 'black';

        for (let i = 0; i < this.state.nodes.length; i++) {
            ctx.beginPath();
            ctx.arc(this.state.nodes[i].x, this.state.nodes[i].y, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
        ctx.closePath();
    }

    addNode = (event) => {
        let newX = event.clientX - event.target.offsetLeft;
        let newY = event.clientY - event.target.offsetTop;

        const nodes2 = this.state.nodes
        nodes2.push({x: newX, y: newY});

        this.setState({nodes: nodes2});

        this.drawNodes();
    };


    clearNodes = () => {
        const canvas = this.nodesRef.current;

        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.setState({nodes: []});
    }

    render() {

        return (
            <div className="graphDiv">
                <canvas className="graphCanv" style={{backgroundColor: "whitesmoke"}}
                        ref={this.nodesRef} width={window.innerWidth} height={window.innerHeight - 200}
                        onClick={this.addNode}/>

                <button onClick={this.clearNodes}>Clear Nodes</button>
            </div>);


    }
}