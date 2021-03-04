type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
}

type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';  //  'success' 成功 ’duplicated‘ 重复
  update: (id: string, name: string) => 'success' | 'notFound' | 'duplicated';
  remove: (id: string) => boolean;
  save: () => void;
}

interface Window {
  tagList: Tag[];
}