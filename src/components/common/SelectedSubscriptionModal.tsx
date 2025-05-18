import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Divider,
  Spinner,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import { ICalculateSubscriptionResponse } from '../../store/super_admin/interface';

interface CalculatedAmount {
  usedAmount: number;
  remainingAmount: number;
  payableAmount: number;
}

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plan: ICalculateSubscriptionResponse;
  amount: CalculatedAmount;
  isFetchingPlans: boolean;
  isLoadingConfirm: boolean;
  isSimulatingPaymentFail: boolean;
  onPaymentFailure: () => void;
}

export const SubscriptionConfirmModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  plan,
  amount,
  isFetchingPlans,
  isLoadingConfirm,
  isSimulatingPaymentFail,
  onPaymentFailure,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Your Subscription</ModalHeader>
        <ModalCloseButton />

        {isFetchingPlans ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <ModalBody>
            <Box mb={4}>
              <Text fontSize='lg' fontWeight='semibold'>
                {plan.newSubscriptionPlan?.name}
              </Text>
              <Text color='gray.500'>
                {plan.newSubscriptionPlan?.description}
              </Text>
            </Box>

            <Divider my={3} />

            <Box mb={4}>
              <Text>
                <strong>Billing Cycle:</strong>{' '}
                {plan.newSubscriptionPlan?.billingCycle}
              </Text>
              <Text>
                <strong>Price:</strong> ${plan?.newSubscriptionPlan?.price}
              </Text>
              <Text>
                <strong>Trial Period:</strong>{' '}
                {plan?.newSubscriptionPlan?.trialPeriodDays} days
              </Text>
              <Text>
                <strong>Grace Period:</strong>{' '}
                {plan?.newSubscriptionPlan?.gracePeriodDays} days
              </Text>
            </Box>

            <Divider my={3} />

            <Box>
              <Text fontWeight='semibold' mb={2}>
                Billing Breakdown:
              </Text>
              <Text>
                <strong>Used Amount:</strong> ${amount?.usedAmount?.toFixed(2)}
              </Text>
              <Text>
                <strong>Remaining Amount:</strong> $
                {amount?.remainingAmount?.toFixed(2)}
              </Text>
              <Text>
                <strong>Payable Amount:</strong> $
                {amount?.payableAmount?.toFixed(2)}
              </Text>
            </Box>
          </ModalBody>
        )}

        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            mr={3}
            isLoading={isSimulatingPaymentFail}
            colorScheme='red'
            onClick={onPaymentFailure}
          >
            Simulate Payment Failure
          </Button>
          <Button
            isLoading={isLoadingConfirm}
            colorScheme='blue'
            onClick={onConfirm}
          >
            Confirm & Pay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
