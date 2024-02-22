import _ from 'lodash';
//import Graph from './board';
import WeightedGraph from './boardTwo';


function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());


function create8x8Graph() {
    const graph = new WeightedGraph(64);
  
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const vertex = row * 8 + col;
  
        // Possible knight moves
        const moves = [
          [-2, -1], [-2, 1],
          [-1, -2], [-1, 2],
          [1, -2], [1, 2],
          [2, -1], [2, 1]
        ];
  
        for (const move of moves) {
          const newRow = row + move[0];
          const newCol = col + move[1];
  
          if (isValidMove(newRow, newCol)) {
            const neighbor = newRow * 8 + newCol;
            graph.addEdge(vertex, neighbor, 1); // Assign a weight of 1 for simplicity
          }
        }
      }
    }
  
    return graph;
  }
  
  // Ensure the graph is connected by a valid knight's move
  function isValidMove(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  class KnightMovesSolver {
    constructor(graph) {
      this.graph = graph;
      this.visited = Array(graph.vertices).fill(false);
      this.path = [];
    }
  
    knightMoves(startVertex, targetVertex) {
      this.dfs(startVertex, targetVertex);
      return this.path;
    }
  
    isValidMove(row, col) {
      return row >= 0 && row < 8 && col >= 0 && col < 8;
    }
  
    dfs(currentVertex, targetVertex) {
      this.visited[currentVertex] = true;
      this.path.push(currentVertex);
  
      if (currentVertex === targetVertex) {
        return true; // Target vertex reached
      }
  
      const row = Math.floor(currentVertex / 8);
      const col = currentVertex % 8;
  
      // Possible knight moves
      const moves = [
        [-2, -1], [-2, 1],
        [-1, -2], [-1, 2],
        [1, -2], [1, 2],
        [2, -1], [2, 1]
      ];
  
      for (const move of moves) {
        const newRow = row + move[0];
        const newCol = col + move[1];
  
        if (this.isValidMove(newRow, newCol)) {
          const neighbor = newRow * 8 + newCol;
          if (!this.visited[neighbor] && this.graph.adjacencyMatrix[currentVertex][neighbor] !== 0) {
            if (this.dfs(neighbor, targetVertex)) {
              return true;
            }
          }
        }
      }
  
      // Backtrack if the target vertex is not reached from this path
      this.path.pop();
      return false;
    }
  }
  
  // Example usage:
  const eightByEightGraph = create8x8Graph();
  const knightSolver = new KnightMovesSolver(eightByEightGraph);
  
  const startVertex = 0; // Starting vertex
  const targetVertex = 63; // Target vertex
  const knightPath = knightSolver.knightMoves(startVertex, targetVertex);
  
  console.log(`Knight's path from vertex ${startVertex} to ${targetVertex}:`);
  console.log(knightPath);