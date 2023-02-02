import React, { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";
import FormSearch from "../components/node/FormSearch";
import { FiltersState } from "../types";

import Panel from "./Panel";
import SearchField from "./SearchField";

const DetailPanel: FC<{
  filters: FiltersState;
}> = ({  filters }) => {
  return (
    <Panel
      title={
        <>
          <BsInfoCircle className="text-muted" /> Details
        </>
      }
    >
      <FormSearch filters={filters} />
      
    </Panel>
  );
};

export default DetailPanel;
