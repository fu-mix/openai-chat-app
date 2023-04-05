import { Configuration, OpenAIApi } from 'openai';

export const Chat = async (message: string, apiKey: string) => {
  const configuration = new Configuration({
    // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    apiKey: apiKey,
  });
  console.log('configuration', configuration);
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
  console.log('api', import.meta.env.VITE_OPENAI_API_KEY);
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      top_p: 0.5,
      frequency_penalty: 0.5,
      messages: [{ role: 'user', content: message }],
    });

    return response.data.choices[0].message?.content;
  } catch (error) {
    console.log(`GPT error!: + ${error}`);
    return `API error!'+ ${error}`;
  }
};
