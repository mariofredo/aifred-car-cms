import {WithContext as ReactTag, ReactTagsWrapperProps} from 'react-tag-input';
import '@/styles/tagInput.scss';
export default function TagInput({
  tags,
  suggestions,
  handleAddition,
  delimiters,
  handleDelete,
}: ReactTagsWrapperProps) {
  return (
    <ReactTag
      autofocus={false}
      tags={tags}
      suggestions={suggestions}
      delimiters={delimiters}
      handleAddition={handleAddition}
      handleDelete={handleDelete}
      allowDragDrop={false}
      autocomplete={false}
      classNames={{
        root: '',
        rootFocused: '',
        search: '',
        searchInput: '',
        selectedTag:
          'py-[5px] px-[5px] rounded-[5px] bg-[#DFDFDF] mr-2 text-[#3e3e3e]',
        selectedTagName: '',
        suggestionActive: '',
        suggestionDisabled: '',
        // tag: 'py-[5px] px-[5px] rounded-[5px] bg-[#DFDFDF] mr-2 text-[#3e3e3e]',
        // tagInput: 'tag_input_ctr',
        // tagInputField: 'tag_input_style',
        suggestions: 'tag_suggestions_style',
        selected: 'tag_selected_style',
        // activeSuggestion: 'tag_activeSuggestion_style',
      }}
      key={'tags'}
    />
  );
}
