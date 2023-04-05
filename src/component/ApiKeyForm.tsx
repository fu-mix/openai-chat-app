import { FormLabel, Input, Button, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { useState } from 'react';

interface ApiKeyFormProps {
  setApiKey: (apiKey: string) => void;
}

export const ApiKeyForm: FC<ApiKeyFormProps> = ({ setApiKey }) => {
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <VStack>
      <VStack>
        <FormLabel htmlFor="apikey">API key</FormLabel>
        <Input id="apikey" placeholder="apikey" onChange={handleApiKeyChange} />
      </VStack>
    </VStack>
  );
};
