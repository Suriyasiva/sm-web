import { VStack, HStack, Icon, Badge, Text, Box } from '@chakra-ui/react';
import { ISubscriptionPlan, IBillingCycle } from '../../types';
import { FaCrown, FaLeaf, FaRocket } from 'react-icons/fa';

interface IProps {
  isCustomerSubscriptedPlan: boolean;
  onCLick: (id: string) => void;
}

const PlanCard: React.FC<ISubscriptionPlan & IProps> = (
  plan: ISubscriptionPlan & IProps,
) => {
  return (
    <Box
      borderWidth='1px'
      borderRadius='2xl'
      _hover={{
        cursor: 'pointer',
        transform: 'scale(1.010)',
      }}
      p={6}
      border={`1px solid ${
        plan.isCustomerSubscriptedPlan ? 'green' : 'inherit'
      }`}
      shadow='md'
      bg='white'
      _dark={{ bg: 'gray.800' }}
      onClick={() => plan.onCLick(plan.id)}
    >
      <VStack align='start' spacing={3}>
        <HStack>
          <Icon
            as={
              plan.billingCycle === IBillingCycle.FREEMIUM
                ? FaLeaf
                : plan.billingCycle === IBillingCycle.MONTHLY
                ? FaRocket
                : FaCrown
            }
            boxSize={6}
            color='teal.500'
          />
          <Text fontSize='xl' fontWeight='bold'>
            {plan.name}
          </Text>
          {plan.metadata.tags.includes('isPromoted') && (
            <Badge colorScheme='green'>Promoted</Badge>
          )}
        </HStack>

        <Text color='gray.600' _dark={{ color: 'gray.300' }}>
          {plan.description}
        </Text>
        <Text fontWeight='semibold'>Price: ${plan.price}</Text>
        <Text fontSize='sm' color='gray.500'>
          Billing: {plan.billingCycle}
        </Text>
        <Text fontSize='sm' color='gray.500'>
          Trial: {plan.trialPeriodDays} days | Grace: {plan.gracePeriodDays}{' '}
          days
        </Text>
      </VStack>
    </Box>
  );
};

export default PlanCard;
