import React, { FC, useEffect, useState } from "react";
import { SigmaContainer, ZoomControl, FullScreenControl } from "react-sigma-v2";
import { omit, mapValues, keyBy, constant } from "lodash";

import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";

import GraphSettingsController from "./GraphSettingsController";
import GraphEventsController from "./GraphEventsController";
import GraphDataController from "./GraphDataController";
import DescriptionPanel from "./DescriptionPanel";
import { Dataset, FiltersState } from "../types";
import ClustersPanel from "./ClustersPanel";
import SearchField from "./SearchField";
import drawLabel from "../canvas-utils";
import GraphTitle from "./GraphTitle";
import TagsPanel from "./TagsPanel";

import "react-sigma-v2/lib/react-sigma-v2.css";
import { GrClose } from "react-icons/gr";
import { BiRadioCircleMarked, BiBookContent } from "react-icons/bi";
import {
  BsArrowsFullscreen,
  BsFullscreenExit,
  BsZoomIn,
  BsZoomOut,
} from "react-icons/bs";
import DetailPanel from "./DetailPanel";
import { getData } from "../api/getData";

const Root: FC = () => {
  const [showContents, setShowContents] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [filtersState, setFiltersState] = useState<FiltersState>({
    clusters: {},
    tags: {},
  });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Load data on mount:
  const data: Dataset = {
    nodes: [
      {
        key: "1",
        label: "Phạm Minh Chính",
        tag: "PER",
        cluster: "0",
        score: 1,
      },
      {
        key: "2",
        label: "Nguyễn Xuân Phúc",
        tag: "PER",
        cluster: "0",
        score: 0.8,
      },
      {
        key: "3",
        label: "Nguyễn Phú Trọng",
        tag: "PER",
        cluster: "0",
        score: 0.1,
      },
    ],
    edges: [
      {
        key: "0",
        source: "1",
        target: "2",
        size: 3,
        articles: [
          {
            key: "1",
            title:
              "Phạm Minh Chính: Tôi không có mối quan hệ gì với Nguyễn Xuân Phúc",
            url: "https://vnexpress.net/pham-minh-chinh-toi-khong-co-moi-quan-he-gi-voi-nguyen-xuan-phuc-4200001.html",
            date: "2020-07-01",
          },
        ],
      },
      {
        key: "1",
        source: "1",
        target: "3",
        size: 1,
        articles: [
          {
            key: "2",
            title:
              "Phạm Minh Chính: Tôi không có mối quan hệ gì với Nguyễn Xuân Phúc",
            url: "https://vnexpress.net/pham-minh-chinh-toi-khong-co-moi-quan-he-gi-voi-nguyen-xuan-phuc-4200001.html",
            date: "2020-07-01",
          },
        ],
      },
      {
        key: "2",
        source: "2",
        target: "3",
        size: 1,
        articles: [
          {
            key: "3",
            title:
              "Phạm Minh Chính: Tôi không có mối quan hệ gì với Nguyễn Xuân Phúc",
            url: "https://vnexpress.net/pham-minh-chinh-toi-khong-co-moi-quan-he-gi-voi-nguyen-xuan-phuc-4200001.html",
            date: "2020-07-01",
          },
        ],
      },
    ],
    clusters: [{ key: "0", color: "#6c3e81", clusterLabel: "All nodes" }],
    tags: [
      { key: "ORG", image: "organization.svg" },
      { key: "PER", image: "person.svg" },
      { key: "LOC", image: "unknown.svg" },
    ],
  };

  const setData = () => {
    setDataset(data);
    setFiltersState({
      clusters: mapValues(keyBy(data.clusters, "key"), constant(true)),
      tags: mapValues(keyBy(data.tags, "key"), constant(true)),
    });
    requestAnimationFrame(() => setDataReady(true));
  };

  useEffect(() => {
    // getData().then((dataset: Dataset) => {
    //   setDataset(dataset);
    //   if (!dataset) return null;
    //   setFiltersState({
    //     clusters: mapValues(keyBy(dataset.clusters, "key"), constant(true)),
    //     tags: mapValues(keyBy(dataset.tags, "key"), constant(true)),
    //   });
    //   requestAnimationFrame(() => setDataReady(true));
    // });
    setData();
  }, []);

  if (!dataset) return null;

  return (
    <div id="app-root" className={showContents ? "show-contents" : ""}>
      <SigmaContainer
        graphOptions={{ type: "undirected" }}
        initialSettings={{
          nodeProgramClasses: { image: getNodeProgramImage() },
          labelRenderer: drawLabel,
          defaultNodeType: "image",
          defaultEdgeType: "line",
          labelDensity: 0.07,
          labelGridCellSize: 60,
          labelRenderedSizeThreshold: 15,
          labelFont: "Lato, sans-serif",
          zIndex: true,
        }}
        className="react-sigma">
        <GraphSettingsController hoveredNode={hoveredNode} />
        <GraphEventsController setHoveredNode={setHoveredNode} />
        <GraphDataController dataset={dataset} filters={filtersState} />

        {dataReady && (
          <>
            <div className="controls">
              <div className="ico">
                <button
                  type="button"
                  className="show-contents"
                  onClick={() => setShowContents(true)}
                  title="Show caption and description">
                  <BiBookContent />
                </button>
              </div>
              <FullScreenControl
                className="ico"
                customEnterFullScreen={<BsArrowsFullscreen />}
                customExitFullScreen={<BsFullscreenExit />}
              />
              <ZoomControl
                className="ico"
                customZoomIn={<BsZoomIn />}
                customZoomOut={<BsZoomOut />}
                customZoomCenter={<BiRadioCircleMarked />}
              />
            </div>
            <div className="contents">
              <div className="ico">
                <button
                  type="button"
                  className="ico hide-contents"
                  onClick={() => setShowContents(false)}
                  title="Show caption and description">
                  <GrClose />
                </button>
              </div>
              <GraphTitle filters={filtersState} />
              <div className="panels">
                <SearchField filters={filtersState} />
                <DescriptionPanel />
                <ClustersPanel
                  clusters={dataset.clusters}
                  filters={filtersState}
                  setClusters={(clusters) =>
                    setFiltersState((filters) => ({
                      ...filters,
                      clusters,
                    }))
                  }
                  toggleCluster={(cluster) => {
                    setFiltersState((filters) => ({
                      ...filters,
                      clusters: filters.clusters[cluster]
                        ? omit(filters.clusters, cluster)
                        : { ...filters.clusters, [cluster]: true },
                    }));
                  }}
                />
                <TagsPanel
                  tags={dataset.tags}
                  filters={filtersState}
                  setTags={(tags) =>
                    setFiltersState((filters) => ({
                      ...filters,
                      tags,
                    }))
                  }
                  toggleTag={(tag) => {
                    setFiltersState((filters) => ({
                      ...filters,
                      tags: filters.tags[tag]
                        ? omit(filters.tags, tag)
                        : { ...filters.tags, [tag]: true },
                    }));
                  }}
                />
                <DetailPanel filters={filtersState} />
              </div>
            </div>
          </>
        )}
      </SigmaContainer>
    </div>
  );
};

export default Root;
