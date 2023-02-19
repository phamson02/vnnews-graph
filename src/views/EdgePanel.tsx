import React, { FC } from "react";
import { BsInfoCircle, BsSearch } from "react-icons/bs";

import Panel from "./Panel";

const EdgePanel: FC = () => {
  return (
    <Panel
      initiallyDeployed
      title={
        <>
          <BsInfoCircle className="text-muted" /> Article
        </>
      }>
      <div className="search-wrapper">
        <input type="search" placeholder="Search in nodes..." />
        <BsSearch className="icon" />
      </div>
    </Panel>
  );
};

export default EdgePanel;
