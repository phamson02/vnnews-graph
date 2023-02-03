import { useSigma } from "react-sigma-v2";
import { FC, useEffect } from "react";
import { keyBy, omit } from "lodash";
import circular from "graphology-layout/circular";
import forceAtlas2 from "graphology-layout-forceatlas2";

import { Dataset, FiltersState } from "../types";

const GraphDataController: FC<{ dataset: Dataset; filters: FiltersState }> = ({
  dataset,
  filters,
  children,
}) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

  /**
   * Feed graphology with the new dataset:
   */
  useEffect(() => {
    if (!graph || !dataset) return;

    const clusters = keyBy(dataset.clusters, "key");
    const tags = keyBy(dataset.tags, "key");

    dataset.nodes.forEach((node) => {
      return graph.addNode(node.key, {
        ...node,
        ...omit(clusters[node.cluster], "key"),
        image: `${process.env.PUBLIC_URL}/images/${tags[node.tag]?.image}`,
      });
    });
    dataset.edges.forEach((edge) =>
      graph.addEdge(edge.source, edge.target, { size: edge.size })
    );

    const positions = circular(graph, { dimensions: ["x", "y"] });
    graph.forEachNode((node) => {
      const { x, y } = positions[node];
      graph.setNodeAttribute(node, "x", x);
      graph.setNodeAttribute(node, "y", y);
    });

    forceAtlas2.assign(graph, {
      iterations: 100,
      attributes: {
        weight: "size",
      },
      weighted: true,
    });

    // Use degrees as node sizes:
    const scores = graph
      .nodes()
      .map((node) => graph.getNodeAttribute(node, "score"));
    const minDegree = Math.min(...scores);
    const maxDegree = Math.max(...scores);
    const MIN_NODE_SIZE = 3;
    const MAX_NODE_SIZE = 30;
    graph.forEachNode((node) =>
      graph.setNodeAttribute(
        node,
        "size",
        ((graph.getNodeAttribute(node, "score") - minDegree) /
          (maxDegree - minDegree)) *
          (MAX_NODE_SIZE - MIN_NODE_SIZE) +
          MIN_NODE_SIZE
      )
    );

    return () => graph.clear();
  }, [graph, dataset]);

  /**
   * Apply filters to graphology:
   */
  useEffect(() => {
    const { clusters, tags } = filters;
    graph.forEachNode((node, { cluster, tag }) =>
      graph.setNodeAttribute(node, "hidden", !clusters[cluster] || !tags[tag])
    );
  }, [graph, filters]);

  return <>{children}</>;
};

export default GraphDataController;
