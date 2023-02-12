import React, { FC, useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { useSigma } from "react-sigma-v2";

const EdgesDetailPanel: FC<{
  nodePath: string[];
  edgePath: string[];
}> = ({ nodePath, edgePath }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

  return <div className="search-wrapper"></div>;
};

export default EdgesDetailPanel;
