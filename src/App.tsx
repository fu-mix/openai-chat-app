import React, { useState } from 'react';
import type { FC } from 'react';
import { Chat } from './component/chat';
import { CustomSlider } from './component/CustomSlider';
import {
  Button,
  Textarea,
  VStack,
  Box,
  Container,
  Badge,
  Stack,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { Navigation } from './component/Navigation';

export interface ConversationAI {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
}

const ChatGPT: FC = () => {
  const [message, setMessage] = useState('');
  const [prevMessage, setPrevMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [frequency_penalty, setFrequency_penalty] = useState(0.5);
  const [top_p, setTop_p] = useState(0.5);
  const [temperature, setTemperature] = useState(0.5);
  const [conversation, setConversation] = useState<ConversationAI[]>([
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: '',
    },
  ]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setPrevMessage(message);
    Chat(
      message,
      apiKey,
      frequency_penalty,
      top_p,
      temperature,
      conversation,
      setAnswer,
      setLoading
    );
    const newConversation = [
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: answer,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: message,
      },
    ];
    setConversation([...conversation, ...newConversation]);
    setMessage('');
  };

  return (
    <>
      <Navigation setApiKey={setApiKey} setMessage={setMessage} />
      <Container maxW={'5xl'}>
        <Stack spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <HStack spacing={20}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <label>
                  <Textarea
                    rows={5}
                    cols={100}
                    value={message}
                    onChange={handleMessageChange}
                  />
                </label>

                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={loading}
                  disabled={apiKey === ''}
                >
                  質問する
                </Button>
              </VStack>
            </form>

            <VStack spacing={6}>
              <CustomSlider
                title="Frequency_penalty"
                setParamter={setFrequency_penalty}
                min={0}
                max={2}
              />
              <CustomSlider title="Top P" setParamter={setTop_p} />
              <CustomSlider title="Temperature" setParamter={setTemperature} />
            </VStack>
          </HStack>
          {answer && (
            <Stack>
              <Box>
                <Badge fontSize="1.4rem" fontWeight="bold" colorScheme="blue">
                  質問
                </Badge>
                <Box p={4} borderWidth="1px" borderRadius="lg">
                  {prevMessage}
                </Box>
              </Box>
              <Spacer />
              <Box>
                <Badge fontSize="1.4rem" fontWeight="bold" colorScheme="green">
                  回答
                </Badge>
                <Box p={4} borderWidth="1px" borderRadius="lg">
                  {answer?.split(/\n\n/).map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        {item}
                        <br />
                      </React.Fragment>
                    );
                  })}
                </Box>
              </Box>
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default ChatGPT;
