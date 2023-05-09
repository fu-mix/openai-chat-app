import { Configuration, OpenAIApi } from 'openai';
import type { ConversationAI } from '../App';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
export const Chat = async (
  message: string,
  apiKey: string,
  frequency_penalty: number,
  top_p: number,
  temperature: number,
  conversation: ConversationAI[],
  setAnswer: (data: string) => void,
  setLoading: (loading: boolean) => void,
  setValue: (daa: string) => void
): Promise<void> => {
  const configuration = new Configuration({
    // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);
  try {
    await openai.createChatCompletion(
      {
        model: 'gpt-3.5-turbo',
        top_p: top_p,
        frequency_penalty: frequency_penalty,
        temperature: temperature,
        messages: [
          ...conversation,
          { role: ChatCompletionRequestMessageRoleEnum.User, content: message },
        ],
        stream: true,
      },
      {
        responseType: 'stream',
        onDownloadProgress: (event: any) => {
          const target = event?.target as XMLHttpRequest;
          const array = target.responseText
            .replace('data: [DONE]', '')
            .trim()
            .split('data: ')
            .filter(Boolean);
          const arrayParsed = array.map((a) => {
            const parsed = JSON.parse(a);
            console.log('parsed', parsed.choices[0].delta?.content);
            return parsed.choices[0].delta?.content || '';
          });
          const arrayJoined = arrayParsed.join('');
          setAnswer(arrayJoined);
          setValue(arrayJoined);
        },
      }
    );
    setLoading(false);
  } catch (error) {
    setAnswer(error as string);
  }
};
