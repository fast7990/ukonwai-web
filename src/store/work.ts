// src/store/work.ts
import { create } from 'zustand' // 注意：原代码使用 useState 实现，建议改为 zustand 标准用法
import { Editor } from '@tiptap/react' // 引入 Editor 类型

interface WorkStore {
  workTitle: string
  setWorkTitle: (title: string) => void
  workId: string
  setWorkId: (workId: string) => void
  editor: Editor | null // 明确类型为 Editor 或 null
  setEditor: (editor: Editor | null) => void
  doc: any | null
  setDoc: (doc: any | null) => void
}

// 使用 zustand 创建全局存储（替代原 useState 实现，确保跨组件共享）
export const useWorkStore = create<WorkStore>((set) => ({
  workTitle: '',
  setWorkTitle: (title) => set({ workTitle: title }),
  workId: '',
  setWorkId: (workId) => set({ workId }),
  editor: null,
  setEditor: (editor) => set({ editor }),
  doc: null,
  setDoc: (doc) => set({ doc }),
}))
