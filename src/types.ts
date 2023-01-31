export interface NodeData {
  key: string;
  label: string;
  tag: string;
  cluster: string;
}

export interface EdgeData {
  from: string;
  to: string;
  size: number;
  article_keys: number[];
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
  edges: [string, string][];
  clusters: Cluster[];
  tags: Tag[];
}

export interface FiltersState {
  clusters: Record<string, boolean>;
  tags: Record<string, boolean>;
}
