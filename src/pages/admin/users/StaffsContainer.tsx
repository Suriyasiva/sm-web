import {
  Center,
  SimpleGrid,
  Spinner,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import useSubscriptionPlansStore from '../../../store/tenant/subscriptionPlans.store';
import PlanCard from '../../../components/common/SubscriptionPlanCard';
import useCustomerStore from '../../../store/tenant/customer.store';
import { SubscriptionConfirmModal } from '../../../components/common/SelectedSubscriptionModal';
import {
  EnumPaymentPaymentProvider,
  EnumPaymentStatus,
} from '../../../store/super_admin/interface';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../constants/Routes';

const StaffsContainer = () => {
  const subscriptionPlansStore = useSubscriptionPlansStore();
  const customerStore = useCustomerStore();
  const [isPlanSelected, ipsState] = useBoolean();
  const navigate = useNavigate();

  useEffect(() => {
    subscriptionPlansStore.getSubscriptionPlans();
    customerStore.getCustomerSubscription();
  }, []);

  function renderMainContent() {
    if (subscriptionPlansStore.isFetchingSubscriptionPlans) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }

    if (!subscriptionPlansStore.subscriptionPlans.length) {
      return <Text>No plans</Text>;
    }

    return (
      <>
        <SimpleGrid
          p={6}
          bg='gray.50'
          _dark={{ bg: 'gray.900' }}
          columns={{ base: 1, md: 3 }}
          spacing={6}
        >
          {subscriptionPlansStore.subscriptionPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              onCLick={async (id) => {
                ipsState.on();
                await subscriptionPlansStore.calculateAmountForSelectedSubscription(
                  id,
                );
              }}
              isCustomerSubscriptedPlan={
                customerStore.customerSubscription.subscriptionPlanId ===
                plan.id
              }
              {...plan}
            />
          ))}
        </SimpleGrid>

        <SubscriptionConfirmModal
          isFetchingPlans={
            subscriptionPlansStore.isFetchingSelectedSubscriptionPlan
          }
          isOpen={isPlanSelected}
          onClose={ipsState.off}
          isLoadingConfirm={customerStore.isCreatingPayment}
          isSimulatingPaymentFail={customerStore.isSimulatingPaymentFail}
          onConfirm={async () => {
            await customerStore.createPayment({
              paymentProvider: EnumPaymentPaymentProvider.RAZORPAY,
              status: EnumPaymentStatus.SUCCESS,
              type: 'CREDIT',
              amount:
                subscriptionPlansStore.selectedSubscription.calculatedAmount
                  .payableAmount,
              customerSubscriptionId:
                subscriptionPlansStore.selectedSubscription.currentSubscription
                  .id,
              subscriptionPlanId:
                subscriptionPlansStore.selectedSubscription.newSubscriptionPlan
                  .id,
              metaData: {
                usedAmount:
                  subscriptionPlansStore.selectedSubscription.calculatedAmount
                    .usedAmount,
                remainingAmount:
                  subscriptionPlansStore.selectedSubscription.calculatedAmount
                    .remainingAmount,
                payableAmount:
                  subscriptionPlansStore.selectedSubscription.calculatedAmount
                    .payableAmount,
              },
            });
            navigate(Routes.admin.dashboard);
          }}
          onPaymentFailure={async () => {
            await customerStore.simulatePaymentFail({
              paymentProvider: EnumPaymentPaymentProvider.RAZORPAY,
              status: EnumPaymentStatus.FAILED,
              type: 'CREDIT',
              amount:
                subscriptionPlansStore.selectedSubscription.calculatedAmount
                  .payableAmount,
              customerSubscriptionId:
                subscriptionPlansStore.selectedSubscription.currentSubscription
                  .id,
              subscriptionPlanId:
                subscriptionPlansStore.selectedSubscription.newSubscriptionPlan
                  .id,
              metaData: {
                usedAmount:
                  subscriptionPlansStore.selectedSubscription.calculatedAmount
                    .usedAmount,
                remainingAmount:
                  subscriptionPlansStore.selectedSubscription.calculatedAmount
                    .remainingAmount,
                payableAmount:
                  subscriptionPlansStore.selectedSubscription.calculatedAmount
                    .payableAmount,
              },
            });
            navigate(Routes.admin.dashboard);
          }}
          plan={subscriptionPlansStore.selectedSubscription}
          amount={{
            payableAmount:
              subscriptionPlansStore.selectedSubscription?.calculatedAmount
                ?.payableAmount,
            remainingAmount:
              subscriptionPlansStore.selectedSubscription?.calculatedAmount
                ?.remainingAmount,
            usedAmount:
              subscriptionPlansStore.selectedSubscription?.calculatedAmount
                ?.usedAmount,
          }}
        />
      </>
    );
  }

  return renderMainContent();
};

export default StaffsContainer;
