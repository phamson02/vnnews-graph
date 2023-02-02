import React, { FC, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import FormSearch from "../components/node/NodeSearchField";
import { FiltersState } from "../types";

import Panel from "./Panel";
import SearchField from "./SearchField";
import NodeSearchField from "../components/node/NodeSearchField";

const DetailPanel: FC<{
  filters: FiltersState;
}> = ({ filters }) => {
  const [source, setSource] = useState<string | null>(null);
  const [target, setTarget] = useState<string | null>(null);

  const handleSearch = () => {
    console.log(source, target);
    
  };

  return (
    <Panel
      title={
        <>
          <BsInfoCircle className="text-muted" /> Details
        </>
      }>
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
        <button className="btn" onClick={handleSearch}>
          search
        </button>
      </div>
    </Panel>
  );
};

export default DetailPanel;
