import React, { useState, FC } from 'react';
import { Chat } from './component/chat';
import { TemplateForm } from './component/TemplateForm';
import { SettingModal } from './component/SettingModal';
import { CustomSlider } from './component/CustomSlider';
import {
  Button,
  Textarea,
  VStack,
  Box,
  Text,
  Container,
  Badge,
  Heading,
  Stack,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';

const ChatGPT: FC = () => {
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [frequency_penalty, setFrequency_penalty] = useState(0.5);
  const [top_p, setTop_p] = useState(0.5);
  const [temperature, setTemperature] = useState(0.5);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    const responseText = await Chat(message, apiKey, frequency_penalty, top_p);

    if (responseText) {
      setAnswer(responseText);
      setLoading(false);
    }
  };

  return (
    <Container maxW={'5xl'}>
      <Stack spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          <Text as={'span'} color={'green.400'}>
            OpenAI Chat App
          </Text>
        </Heading>
        <HStack spacing={20}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <label>
                <Textarea
                  rows={15}
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
            <HStack spacing={2}>
              <TemplateForm setMessage={setMessage} />
              <SettingModal
                setApiKey={setApiKey}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
              />
            </HStack>

            <CustomSlider
              title="Frequency_penalty"
              setParamter={setFrequency_penalty}
            />
            <CustomSlider title="Top P" setParamter={setTop_p} />
            <CustomSlider title="Temperature" setParamter={setTemperature} />
          </VStack>
        </HStack>
        {answer && (
          <div>
            <Badge fontSize="1.4rem" fontWeight="bold" colorScheme="green">
              回答
            </Badge>
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              opacity={loading ? 0.5 : 1}
            >
              {answer.split(/\n/).map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item}
                    <br />
                  </React.Fragment>
                );
              })}
            </Box>
          </div>
        )}
      </Stack>
    </Container>
  );
};

export default ChatGPT;
