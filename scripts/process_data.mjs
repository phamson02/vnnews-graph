import fs from 'fs';
import path from 'path';

import Graph from 'graphology';
import circular from 'graphology-layout/circular.js';
import forceAtlas2 from 'graphology-layout-forceatlas2';


function layoutGraph() {
  const filePath = path.join(process.cwd(), 'public', 'dataset.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
      const dataset = JSON.parse(data);
      const graph = new Graph({ type: "undirected" });

      const scores = dataset.nodes.map((node) => node.score);
      const minScore = Math.min(...scores);
      const maxScore = Math.max(...scores);
      const MIN_NODE_SIZE = 6;
      const MAX_NODE_SIZE = 20;

      const scaleSize = (score) => {
        return (
          MIN_NODE_SIZE +
          ((score - minScore) / (maxScore - minScore)) *
            (MAX_NODE_SIZE - MIN_NODE_SIZE)
        );
      };

      dataset.nodes.forEach((node) => {
        return graph.addNode(node.key, {
          size: scaleSize(node.score),
          ...node,
        });
      });
      dataset.edges.forEach((edge) =>
        graph.addEdge(edge.source, edge.target, {
          size: edge.size / 2,
          articles: edge.articles,
        }),
      );

      const positions = circular(graph, { dimensions: ["x", "y"], scale: 100 });
      graph.forEachNode((node) => {
        const { x, y } = positions[node];
        graph.setNodeAttribute(node, "x", x);
        graph.setNodeAttribute(node, "y", y);
      });

      const new_positions = forceAtlas2(graph, {
        iterations: 5000,
        attributes: {
          weight: "size",
        },
        weighted: true,
        settings: {
          adjustSizes: true,
          barnesHutOptimize: true,
          barnesHutTheta: 1,
          scalingRatio: 10,
          edgeWeightInfluence: 1,
          gravity: 40,
        },
      });

      dataset.nodes.forEach((node) => {
        // Add new attributes to the nodes:
        const { x, y } = new_positions[node.key];
        node.x = x;
        node.y = y;
      }); 

      // Write to json file:
      const outputFilePath = path.join(process.cwd(), 'public', 'dataset.json');
      fs.writeFile(outputFilePath, JSON.stringify(dataset, null, 4), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Data written to file");
      });
    });
}

layoutGraph();