import React from "react";
import "./SortingVisualiser.css";
import {getMergeAnims, getBubbleAnims} from "../sortingAlgos";

export default class SortingVisualiser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {array: [], value: 200};
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
                }, i * 1);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 1);
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
                }, i * 1);


            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations2[i];
                    const barOneStyle = arrbar[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 1);
            }
        }


    }

    quickSort() {

    }

    heapSort() {

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
                    <button onClick={() => this.heapSort()}>Heapsort</button>
                    <button onClick={() => this.bubbleSort()}>Bubblesort</button>
                    <div>
                        <input type="range" min="1" max="300" value={this.state.value} className="slider" id="myRange"
                               onChange={
                                   (event) => this.setState({value: event.target.value})
                               } step="1"/>
                    </div>
                    <span id="output">{this.state.value}</span>
                </div>


            </div>
        )
    }

    arrAreEq(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            console.log("size diff");
            return false;
        }

        for (let i = 0; i < arr2.length; i++) {
            if (arr1[i] !== arr2[i]) {
                console.log(i);
                return false;
            }
        }
        return true;
    }
}