import { useState, useCallback } from 'react'
interface WorkStore {
  workTitle: string;
  setWorkTitle: (title: string) => void;
  workId: string;
  setWorkId: (workId: string) => void;
  editor: any;
  setEditor: (editor: any) => void;
}
export const useWorkStore = () => {
  const [workTitle, setWorkTitle] = useState('');
  const [workId, setWorkId] = useState('');
  const [editor, setEditor] = useState<any>(null);
  const updateState = useCallback((newState: Partial<WorkStore>) => {
    // 判断是否含有workId
    if (newState.workId) {
      setWorkId(newState.workId)
    }
    if (newState.workTitle) {
      setWorkTitle(newState.workTitle)
    }
    if (newState.editor) {
      setEditor(newState.editor)
    }
  }, [setWorkId, setWorkTitle, setEditor])
  return {
    workTitle,
    setWorkTitle: updateState,
    workId,
    setWorkId: updateState,
    editor,
    setEditor: updateState,
  };
};
