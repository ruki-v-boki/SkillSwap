export type SearchSuggestionsProps = {
  query: string;
  results: Array<{ id: string; name: string; categoryId: string }>;
  onSelect: (skillId: string, skillName: string) => void;
  selectedSkills: string[];
  selectedIndex: number;
  onClose: () => void;
}