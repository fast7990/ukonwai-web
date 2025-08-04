// 以下为连接 DeepSeek 的示例代码，可根据实际需求调整
import { AIChatParams } from '@/type/aichat'

const DEEPSEEK_API_URL = 'https://code.jizhi.360.cn/v1/chat/completions';
const API_KEY = 'sk-VgoitrdGxTRLs9czA0Af4641826040C9A99892EdF5F6774c';

/**
 * 连接 DeepSeek API 并返回流式响应
 * @param {string} params - 输入的提示词
 * @returns {Promise<ReadableStreamDefaultReader>} - 返回可读流读取器
 */
export async function connectDeepSeekStream(params: AIChatParams) {
    const { model, max_tokens, stream, systemPrompt, messages } = params
    try {
        const response = await fetch(DEEPSEEK_API_URL,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    max_tokens: max_tokens,
                    messages: messages,
                    stream: stream,
                    systemPrompt: systemPrompt
                })
            }
        );

        if (!response.body) {
            throw new Error('响应不支持流式输出');
        }

        return response.body.getReader();
    } catch (error) {
        console.error('连接 DeepSeek 出错:', error);
        throw error;
    }
}

/**
 * 解析流式响应数据
 * @param {ReadableStreamDefaultReader} reader - 可读流读取器
 * @param {Function} onChunk - 处理每个数据块的回调函数
 * @returns {Promise<void>}
 */
export async function parseDeepSeekStream(reader: ReadableStreamDefaultReader, onChunk: (chunk: string) => void) {
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        // 处理缓冲区数据，根据实际返回格式调整
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;
                try {
                    const json = JSON.parse(data);
                    if (json.choices && json.choices[0] && json.choices[0].delta?.content) {
                        onChunk(json.choices[0].delta.content);
                    }
                } catch (e) {
                    console.error('解析数据出错:', e);
                }
            }
        }
    }
}
