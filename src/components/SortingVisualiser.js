import React from "react";
import "./SortingVisualiser.css";
import {
    getMergeAnims,
    getBubbleAnims,
    getQuickSortAnims,
    getHeapSortAnims,
    getMinHeapSortAnims,
    getInsertSortAnims
} from "../sortingAlgos";

const SPEED = 1/100;

export default class SortingVisualiser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {array: [], value: 400};
    }

    componentDidMount() {
        this.resetArray();
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < this.state.value; i++) {
            array.push(this.getRandomInt(1, 750))
        }

        this.setState({array});
    }

    mergeSort() {

        const animations = getMergeAnims(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;

            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'green';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * SPEED);
            }


        }
    }


    bubbleSort() {

        const animations2 = getBubbleAnims(this.state.array);

        for (let i = 0; i < animations2.length; i++) {
            const arrbar = document.getElementsByClassName('array-bar');
            const cChange = (i % 4 !== 2) && (i % 4 !== 3)

            if (cChange) {

                const [baronei, bartwoi] = animations2[i];
                const barOneStyle = arrbar[baronei].style;
                const barTwoStyle = arrbar[bartwoi].style;
                const color = i % 4 === 0 ? 'red' : 'green';

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);


            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations2[i];
                    const barOneStyle = arrbar[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * SPEED);
            }
        }


    }

    quickSort() {

        const anim3 = getQuickSortAnims(this.state.array);

        const arrbar = document.getElementsByClassName('array-bar');

        for (let i = 0; i < anim3.length; i++) {

            const cChange = anim3[i][2];

            if (cChange === 0) {

                const [baronei, bartwoi, j] = anim3[i];
                const barOneStyle = arrbar[baronei].style;
                const barTwoStyle = arrbar[bartwoi].style;
                const color = i % 4 === 0 ? 'red' : 'green';

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);

            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight, j] = anim3[i];
                    const barOneStyle = arrbar[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * SPEED);
            }
        }


    }

    maxheapSort() {

        const anim4 = getHeapSortAnims(this.state.array);

        const arrbar = document.getElementsByClassName('array-bar');

        for (let i = 0; i < anim4.length; i++) {

            const cChange = anim4[i][2];

            if (cChange === 0) {

                const [baronei, bartwoi, j] = anim4[i];
                const barOneStyle = arrbar[baronei].style;
                const barTwoStyle = arrbar[bartwoi].style;
                const color = i % 4 === 0 ? 'red' : 'green';

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);

            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight, j] = anim4[i];
                    const barOneStyle = arrbar[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * SPEED);
            }
        }


    }

    minheapSort() {

        const anim4 = getMinHeapSortAnims(this.state.array);

        const arrbar = document.getElementsByClassName('array-bar');

        for (let i = 0; i < anim4.length; i++) {

            const cChange = anim4[i][2];

            if (cChange === 0) {

                const [baronei, bartwoi, j] = anim4[i];
                const barOneStyle = arrbar[baronei].style;
                const barTwoStyle = arrbar[bartwoi].style;
                const color = i % 4 === 0 ? 'red' : 'green';

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);

            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight, j] = anim4[i];
                    const barOneStyle = arrbar[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * SPEED);
            }
        }


    }

    insertionSort() {

        const anim5 = getInsertSortAnims(this.state.array);

        const arrbar = document.getElementsByClassName('array-bar');

        for (let i = 0; i < anim5.length; i++) {

            const cChange = anim5[i][2];

            if (cChange === 0){

                const [baronei, bartwoi, j] = anim5[i];
                const barOneStyle = arrbar[baronei].style;
                const barTwoStyle = arrbar[bartwoi].style;
                const color = i % 4 === 0 ? 'red' : 'green';

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);

            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight, j] = anim5[i];
                    const barOneStyle = arrbar[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * SPEED);
            }



        }

    }

    render() {
        const arr2 = this.state.array;

        return (
            <div className="array-container">
                {arr2.map((value, i) =>

                    (<div className="array-bar" key={i} style={{height: `${value}px`}}></div>)
                )}
                <div>
                    <button onClick={() => this.resetArray()}>Generate new array</button>
                    <button onClick={() => this.mergeSort()}>Mergesort</button>
                    <button onClick={() => this.quickSort()}>Quicksort</button>
                    <button onClick={() => this.maxheapSort()}>MaxHeapsort</button>
                    <button onClick={() => this.minheapSort()}>MinHeapsort</button>
                    <button onClick={() => this.bubbleSort()}>Bubblesort</button>
                    <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button onClick={() => this.selectionSort()}>Selection Sort</button>
                    <div>
                        <input type="range" min="10" max="400" value={this.state.value} className="slider" id="myRange"
                               onChange={

                                   (event) => this.setState({value: event.target.value}
                                   )
                               } step="1"/>
                    </div>
                    <span id="output">{this.state.value}</span>
                </div>


            </div>
        )
    }
}