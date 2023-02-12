import React, { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";

import Panel from "./Panel";

const DescriptionPanel: FC = () => {
  return (
    <Panel
      initiallyDeployed
      title={
        <>
          <BsInfoCircle className="text-muted" /> Description
        </>
      }
    >
      <p>
        This map represents a <i>network</i> of entities and their relationships as extracted from Vietnamese online news articles. Each{" "}
        <i>node</i> represents an entity (a person or group of persons), and each edge some articles in which the two entities are  mentioned together.
      </p>
      <p>
        The map is updated daily with new articles. You can use the search bar to find a specific entity, or click on a node to see the articles in which it appears.
      </p>
      <p>
        The template of this web application has been developed by{" "}
        <a target="_blank" rel="noreferrer" href="https://www.ouestware.com/en/">
          OuestWare
        </a>
        , using{" "}
        <a target="_blank" rel="noreferrer" href="https://reactjs.org/">
          react
        </a>{" "}
        and{" "}
        <a target="_blank" rel="noreferrer" href="https://www.sigmajs.org">
          sigma.js
        </a>
        . You can read the source code{" "}
        <a target="_blank" rel="noreferrer" href="https://github.com/jacomyal/sigma.js/tree/main/demo">
          on GitHub
        </a>
        .
      </p>
      <p>
        Nodes sizes are related to their{" "}
        <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Eigenvector_centrality">
          eigenvector centrality
        </a>
        . We assign the size for each node of each person or organisation based on how many other influential people or organisations they have appeared together with.
      </p>
    </Panel>
  );
};

export default DescriptionPanel;
