import React, { FC } from "react";
import { useSigma } from "react-sigma-v2";
import EdgeDetail from "./EdgeDetail";

const EdgesDetailPanel: FC<{
  nodePath: string[];
  edgePath: string[];
}> = ({ nodePath, edgePath }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

  let label: string[] = [];
  nodePath.forEach((node) => {
    const nodeData = graph.getNodeAttributes(node);
    label.push(nodeData.label);
  });

  return (
    <div>
      {nodePath.map((node, index) => {
        if (index === nodePath.length - 1)
          return <h3 key={node}>{label[index]}</h3>;
        return (
          <div key={node + nodePath[index + 1]}>
            <h3>{label[index]}</h3>
            <EdgeDetail
              key={`${node}-${nodePath[index + 1]}`}
              source={node}
              target={nodePath[index + 1]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EdgesDetailPanel;
