import { Attributes } from "graphology-types";
import React, { FC, useState } from "react";
import { BsArrow90DegDown, BsInfoCircle } from "react-icons/bs";
import { useSigma } from "react-sigma-v2";
import { ArticleData } from "../types";


const EdgeDetail: FC<{
  source: string;
  target: string;
  label: string[];
}> = ({ source, target, label }) => {
  const [showArticles, setShowArticles] = useState(false);
  const sigma = useSigma();
  const graph = sigma.getGraph();

  const articles: ArticleData[] = [];
  graph.forEachEdge(
    source,
    target,
    (key: string, attributes: Attributes): void => {
      articles.push(...attributes.articles);
    }
  );

  return (
    <div>
      <button onClick={() => setShowArticles(!showArticles)}>
        <BsArrow90DegDown /> {showArticles ? "Hide" : "Show"} Articles
      </button>
      {showArticles && articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <h4>{article.title}</h4>
              <p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.url}
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : <></>}
    </div>
  );
};

export default EdgeDetail;