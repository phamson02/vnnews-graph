export interface NodeData {
  key: string;
  label: string;
  tag: string;
  x: number;
  y: number;
  cluster: string;
  score: number;
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
  nodes: NodeData[];
  edges: EdgeData[];
  clusters: Cluster[];
  tags: Tag[];
}

export interface FiltersState {
  clusters: Record<string, boolean>;
  tags: Record<string, boolean>;
}
