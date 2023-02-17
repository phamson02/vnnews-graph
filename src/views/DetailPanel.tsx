import React, { FC, useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FiltersState } from "../types";
import { dijkstra, edgePathFromNodePath } from "graphology-shortest-path";
import { useSigma } from "react-sigma-v2";

import Panel from "./Panel";
import NodeSearchField from "../components/node/NodeSearchField";
import EdgesDetailPanel from "../components/node/EdgesDetailPanel";

const DetailPanel: FC<{
  filters: FiltersState;
}> = ({ filters }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

  const [source, setSource] = useState<string | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const [nodePath, setNodePath] = useState<string[]>([]);
  const [edgePath, setEdgePath] = useState<string[]>([]);

  useEffect(() => {
    if (source && target) {
      const path = dijkstra.bidirectional(graph, source, target)
      setNodePath(path);
      
      if (path?.length) {
        setEdgePath(edgePathFromNodePath(graph, path));
      }

      const sourceDisplayData = sigma.getNodeDisplayData(source);
      const targetDisplayData = sigma.getNodeDisplayData(target);

      if (sourceDisplayData && targetDisplayData)
        sigma.getCamera().animate(
          {
            x: (sourceDisplayData.x + targetDisplayData.x) / 2,
            y: (sourceDisplayData.y + targetDisplayData.y) / 2,
            ratio: 0.3,
          },
          {
            duration: 600,
          }
        );

        if (sourceDisplayData && targetDisplayData) {
          console.log((sourceDisplayData.x + targetDisplayData.x) / 2),
          console.log((sourceDisplayData.y + targetDisplayData.y) / 2)
        }
    }
  }, [source, target]);

  useEffect(() => {
    // Check if nodePath is null
    if (!nodePath?.length) {
      setShowDetails(false);
      return;
    }

    sigma.setSetting("nodeReducer", (node, data) => {
      if (node === source || node === target) {
        return { ...data, highlighted: true, color: "#00FF00", zIndex: 1 };
      } else if (nodePath.includes(node)) {
        return { ...data, highlighted: true, color: "#FF0000", zIndex: 1 };
      } else {
        return {
          ...data,
          highlighted: false,
          color: "#bbb",
          zIndex: 0,
          label: "",
          image: null,
        };
      }
    });

    sigma.setSetting("edgeReducer", (edge, data) => {
      if (edgePath.includes(edge)) {
        return { ...data, color: "#FF0000", zIndex: 1 };
      } else {
        return { ...data, hidden: true, color: "#eee" };
      }
    });

    setShowDetails(true);
  }, [nodePath, edgePath]);

  return (
    <Panel
      title={
        <>
          <BsInfoCircle className="text-muted" /> Details
        </>
      }>
      <div className="text-center">
        <p className="text-muted">Select two nodes to see details</p>
      </div>
      <div className="search-wrapper">
        <NodeSearchField
          filters={filters}
          selected={source}
          setSelected={setSource}
        />
        <NodeSearchField
          filters={filters}
          selected={target}
          setSelected={setTarget}
        />
      </div>
      {showDetails ? (
        <EdgesDetailPanel nodePath={nodePath} edgePath={edgePath} />
      ) : (
        <div className="text-center">
          <p className="text-muted">No path found</p>
        </div>
      )}
    </Panel>
  );
};

export default DetailPanel;
