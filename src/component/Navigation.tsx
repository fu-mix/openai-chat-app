import type { FC } from 'react';
import {
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { SettingModal } from './SettingModal';
import { SelectTemplate } from './SelectTemplate';
export interface NavigationProps {
  setApiKey: (apiKey: string) => void;
  setMessage: (message: string) => void;
}

export const Navigation: FC<NavigationProps> = ({ setApiKey, setMessage }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box w="auto">
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
          justifyContent={'space-between'}
        >
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Heading fontWeight={600} lineHeight={'130%'}>
              <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={'green.500'}
                as={'cite'}
              >
                OpenAI Chat App
              </Text>
            </Heading>
          </Flex>
          <HStack>
            <SelectTemplate setMessage={setMessage} />
            <SettingModal
              setApiKey={setApiKey}
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
            />
          </HStack>
        </Flex>
      </Box>
    </>
  );
};
