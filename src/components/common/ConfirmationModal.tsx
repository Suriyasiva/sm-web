import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import PrimaryButton from './PrimaryButton';
import { useState } from 'react';

interface ConfirmationModalProps {
  isConfirmationModalOpen: boolean;
  onConfirmationModalClose: () => void;
  modalTitle: string;
  modalConfirmText: string;
  confirmButtonText: string;
  handleConfirmButtonClick: () => void;
  enableSecondaryButton?: boolean;
  isButtonLoading?: boolean;
}

export const ConfirmationModal = ({
  isConfirmationModalOpen,
  modalConfirmText,
  modalTitle,
  onConfirmationModalClose,
  confirmButtonText,
  handleConfirmButtonClick,
  enableSecondaryButton = false,
  isButtonLoading = false,
}: ConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const onConfirmButtonClick = () => {
    try {
      setIsLoading(true);
      handleConfirmButtonClick();
    } catch (error) {
      console.error('Error', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      isOpen={isConfirmationModalOpen}
      onClose={onConfirmationModalClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton
          py={4}
          size='lg'
          boxShadow='none'
          color='gray.400'
          _hover={{
            outline: 'none',
            boxShadow: 'none',
          }}
        />
        <ModalBody>
          <Text>{modalConfirmText}</Text>
        </ModalBody>
        <ModalFooter>
          {enableSecondaryButton && (
            <Button onClick={onConfirmationModalClose}>Cancel</Button>
          )}
          <PrimaryButton ml={2} isLoading={isButtonLoading || isLoading} onClick={onConfirmButtonClick}>
            {confirmButtonText}
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
