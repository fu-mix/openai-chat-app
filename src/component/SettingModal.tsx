import type { FC } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalCloseButton,
  ModalOverlay,
  IconButton,
  ModalFooter,
} from '@chakra-ui/react';
import { ApiKeyForm } from './ApiKeyForm';
import { SettingsIcon } from '@chakra-ui/icons';

interface SettingModalProps {
  setApiKey: (apiKey: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const SettingModal: FC<SettingModalProps> = ({
  setApiKey,
  isOpen,
  onClose,
  onOpen,
}) => {
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <IconButton
        aria-label="Setting"
        icon={<SettingsIcon />}
        onClick={onOpen}
        size={'lg'}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ApiKeyForm setApiKey={setApiKey} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              OK
            </Button>
            {/* <Button variant="ghost">OK</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
