import { create } from 'zustand';
interface WorkStore {
  workTitle: string;
  setWorkTitle: (title: string) => void;
  workId: string;
  setWorkId: (workId: string) => void;
  editor: any;
  setEditor: (editor: any) => void;
}
export const useWorkStore = create<WorkStore>(set => ({
  workTitle: '',
  setWorkTitle: (workTitle: string) => set({ workTitle: workTitle }),
  workId: '',
  setWorkId: (workId: string) => set({ workId: workId }),
  editor: null,
  setEditor: (editor: any) => set({ editor: editor }),
}));