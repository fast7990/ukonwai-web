'use client';
import { useWorkStore } from '@/store/work';
import { useEffect, useState } from 'react';

const WordCounter = () => {
  const { editor } = useWorkStore();
  const [wordCount, setWordCount] = useState(0);

  // 计算字数的函数
  const calculateWordCount = (text: string) => {
    // 去除所有空白字符，然后计算长度
    return text.replace(/\s+/g, '').length;
  };

  // 监听编辑器内容变化，更新字数
  useEffect(() => {
    if (!editor) {
      setWordCount(0);
      return;
    }

    // 初始计算
    const initialText = editor.getText();
    setWordCount(calculateWordCount(initialText));

    // 内容变化时重新计算
    const updateWordCount = () => {
      const text = editor.getText();
      setWordCount(calculateWordCount(text));
    };

    // 订阅编辑器更新事件
    editor.on('update', updateWordCount);

    // 清理订阅
    return () => {
      editor.off('update', updateWordCount);
    };
  }, [editor]);

  return (
    <span>
      共 {wordCount} 字
    </span>
  );
};

export default WordCounter;
