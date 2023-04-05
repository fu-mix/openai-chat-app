import React, { useState, FC } from 'react';
import { Chat } from './component/chat';
import { SettingModal } from './component/SettingModal';
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
} from '@chakra-ui/react';

const ChatGPT: FC = () => {
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    const responseText = await Chat(message, apiKey);

    if (responseText) {
      setAnswer(responseText);
      setLoading(false);
    }
  };

  return (
    <Container maxW={'5xl'}>
      <SettingModal
        setApiKey={setApiKey}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
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

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <label>
              <Textarea
                rows={10}
                cols={100}
                value={message}
                onChange={handleMessageChange}
              />
            </label>

            <Button colorScheme="blue" type="submit" isLoading={loading}>
              質問する
            </Button>
          </VStack>
        </form>

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
