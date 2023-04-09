import { Configuration, OpenAIApi } from 'openai';
import type { ConversationAI } from '../App';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
export const Chat = async (
  message: string,
  apiKey: string,
  frequency_penalty: number,
  top_p: number,
  temperature: number,
  conversation: ConversationAI[]
) => {
  const configuration = new Configuration({
    // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);

  // const options = {
  //   model: 'gpt-3.5-turbo',
  //   temperature: 0,
  //   max_tokens: 10,
  //   top_p: 1,
  //   frequency_penalty: 0.0,
  //   presence_penalty: 0.0,
  //   stop: ['/'],
  // };

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      top_p: top_p,
      frequency_penalty: frequency_penalty,
      temperature: temperature,
      // messages: [{ role: 'user', content: message }],
      messages: [
        ...conversation,
        { role: ChatCompletionRequestMessageRoleEnum.User, content: message },
      ],
    });

    return response.data.choices[0].message?.content;
  } catch (error) {
    return `API error!'+ ${error}`;
  }
};
