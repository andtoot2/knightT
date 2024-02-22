class WeightedGraph {
    constructor(vertices) {
      this.vertices = vertices;
      this.adjacencyMatrix = Array.from({ length: vertices }, () =>
        Array(vertices).fill(0)
      );
    }
  
    addEdge(vertex1, vertex2, weight) {
      if (
        vertex1 >= 0 &&
        vertex1 < this.vertices &&
        vertex2 >= 0 &&
        vertex2 < this.vertices
      ) {
        this.adjacencyMatrix[vertex1][vertex2] = weight;
        this.adjacencyMatrix[vertex2][vertex1] = weight;
      } else {
        console.log('Invalid vertices');
      }
    }
  
    // Optional: You can add more methods for graph operations as needed
  
    printGraph() {
      for (let i = 0; i < this.vertices; i++) {
        const row = this.adjacencyMatrix[i].join(', ');
        console.log(`Vertex ${i}: [${row}]`);
      }
    }
  }
  
  // Example usage:
  const graph = new WeightedGraph(4);
  
  graph.addEdge(0, 1, 4);
  graph.addEdge(0, 2, 2);
  graph.addEdge(1, 2, 5);
  graph.addEdge(1, 3, 10);
  graph.addEdge(2, 3, 3);
  
  graph.printGraph();

  export default WeightedGraph;