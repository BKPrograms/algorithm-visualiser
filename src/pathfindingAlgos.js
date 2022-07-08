export function dijkstra(grid, startNode, finishNode){
    if (startNode === finishNode){
        return;
    }

    const visited = [];
    startNode.distance = 0;
    const nodes = getAllNodes(grid);

    while (!!nodes.length){
        sortByDist(nodes);  // Should consider minheap/priority queue instead of array

        const closest = nodes.shift();

        if (closest.isWall){
            continue;
        }

        if (closest.distance === Infinity){
            return visited;
        }

        closest.isVisited = true;

        visited.push(closest);

        if (closest === finishNode){
            return visited;
        }

        updateUnvisited(closest, grid);

    }

}

function getUnvisitedAdjs(node, grid){
    const neighbors = [];
    const {col, row} = node;
    if (row > 0){
        neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1){
        neighbors.push(grid[row + 1][col]);
    }
    if (col > 0){
        neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1){
        neighbors.push(grid[row][col + 1]);
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function updateUnvisited(node, grid){
    const unvisited = getUnvisitedAdjs(node, grid);

    for (const neighbor of unvisited) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortByDist(nodes){

    nodes.sort((node1, node2) => node1.distance - node2.distance);

}


export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;

    while (currentNode.previousNode !== null) {

        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
