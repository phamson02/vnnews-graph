export interface NodeData {
  key: string;
  label: string;
  tag: string;
  cluster: string;
  score: number;

  // Optional attributes:
  x?: number;
  y?: number;
}

export interface EdgeData {
  key: string;
  source: string;
  target: string;
  size: number;
  articles: ArticleData[];
}

export interface ArticleData {
  key: string;
  title: string;
  url: string;
  date: string;
}

export interface Cluster {
  key: string;
  color: string;
  clusterLabel: string;
}

export interface Tag {
  key: string;
  image: string;
}

export interface Dataset {
  date: string;
  nodes: NodeData[];
  edges: EdgeData[];
  clusters: Cluster[];
  tags: Tag[];
}

export interface FiltersState {
  clusters: Record<string, boolean>;
  tags: Record<string, boolean>;
}
