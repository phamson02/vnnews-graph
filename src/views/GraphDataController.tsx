import { useSigma } from "react-sigma-v2";
import { FC, useEffect } from "react";
import { keyBy, omit } from "lodash";

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
      graph.addEdge(edge.source, edge.target, {
        size: edge.size / 2,
        articles: edge.articles,
      }),
    );

    // Use degrees as node sizes:
    const scores = graph
      .nodes()
      .map((node) => graph.getNodeAttribute(node, "score"));
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const MIN_NODE_SIZE = 6;
    const MAX_NODE_SIZE = 20;

    const scaleSize = (score: number) => {
      return (
        MIN_NODE_SIZE +
        ((score - minScore) / (maxScore - minScore)) *
          (MAX_NODE_SIZE - MIN_NODE_SIZE)
      );
    };

    graph.forEachNode((node) => {
      const score = graph.getNodeAttribute(node, "score");
      graph.setNodeAttribute(node, "size", scaleSize(score));
    });

    return () => graph.clear();
  }, [graph, dataset]);

  /**
   * Apply filters to graphology:
   */
  useEffect(() => {
    const { clusters, tags } = filters;
    graph.forEachNode((node, { cluster, tag }) =>
      graph.setNodeAttribute(node, "hidden", !clusters[cluster] || !tags[tag]),
    );
  }, [graph, filters]);

  return <>{children}</>;
};

export default GraphDataController;
