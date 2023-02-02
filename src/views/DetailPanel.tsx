import React, { FC, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FiltersState } from "../types";

import Panel from "./Panel";
import SearchField from "./SearchField";


const DetailPanel: FC<{ filters: FiltersState }> = ({ filters }) => {

  const [filtersState, setFiltersState] = useState<FiltersState>({
    clusters: {},
    tags: {},
  });

  return (
    <Panel
      title={
        <>
          <BsInfoCircle className="text-muted" /> Details
        </>
      }
    >
      <SearchField filters={filtersState} />
      <SearchField filters={filtersState} />
    </Panel>
  );
};

export default DetailPanel;
