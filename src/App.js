import './App.css';
import SortingVisualiser from "./components/SortingVisualiser";
import PathFindingVisualiser from "./components/PathFinding";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Navbar from "./components/navbar.component";
import React from ".";
import "bootstrap/dist/css/bootstrap.min.css";
import GraphsVisualiser from "./components/GraphsVisualiser";

function App() {
    return (
        <BrowserRouter basename={'bkprograms.github.io/'}>
            <Navbar/>
            <br/>
            <Routes>

                <Route path="/" exact element={<SortingVisualiser/>}/>
                <Route path="/path" exact element={<PathFindingVisualiser/>}/>
                <Route path="/graphs" exact element={<GraphsVisualiser/>}/>


            </Routes>
        </BrowserRouter>
    );
}

export default App;
