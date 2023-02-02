import React, { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";

import Panel from "./Panel";

const DetailPanel: FC = () => {
  return (
    <Panel
      title={
        <>
          <BsInfoCircle className="text-muted" /> Details
        </>
      }
    >
    </Panel>
  );
};

export default DetailPanel;
