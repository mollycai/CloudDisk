interface TagItem {
  id: string;
  name: string;
}

interface CategoryControllerProps {
	tagsList: TagItem[];
	selectedTags: string[];
	handleChange: (tag: string, check: boolean) => void;
}

interface FileCategoryListProps {
  files: any[];	
}

export type { 
	TagItem,
	CategoryControllerProps,
	FileCategoryListProps
}