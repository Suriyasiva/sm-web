import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

interface NoDataFoundParams {
  content?: string;
  subContent?: string;
  externalIcon?: React.ReactNode;
  primaryButton?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    isDisabled?: boolean;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
  textColor?: string;
}

export const NoDataFound = ({
  content = 'No data found',
  subContent,
  externalIcon,
  primaryButton,
  secondaryButton,
  textColor,
}: NoDataFoundParams) => {
  return (
    <Flex justify='center' py={10}>
      <Box className={externalIcon ? '' : 'no-data-bg'}>
        <Flex
          w='100%'
          minW={{ md: '32rem' }}
          flexDir='column'
          textAlign='center'
          alignItems='center'
          justifyContent='end'
        >
          <VStack w={{ base: '100%', md: '70%' }}>
            {externalIcon && (
              <IconButton
                border='1px'
                boxShadow='none'
                borderColor='#EAECF0'
                colorScheme='#EAECF0'
                aria-label='location'
                _hover={{ boxShadow: 'none' }}
                cursor='default'
                size='lg'
                icon={
                  <>
                    {externalIcon}
                    <div className='spinner-item'></div>
                    <div className='spinner-item spinner-item--2'></div>
                    <div className='spinner-item spinner-item--3'></div>
                    <div className='spinner-item spinner-item--4'></div>
                  </>
                }
              />
            )}
            <Text fontWeight={600} color={textColor ? textColor : 'gray.900'}>
              {content}
            </Text>
            <Text color={textColor ? textColor : 'gray.600'}>{subContent}</Text>
          </VStack>
        </Flex>
        {(primaryButton || secondaryButton) && (
          <Flex justify='center' pt='3' gap={4}>
            {secondaryButton && (
              <SecondaryButton
                children={secondaryButton?.label}
                onClick={secondaryButton.onClick}
              />
            )}
            {primaryButton && (
              <PrimaryButton
                isDisabled={primaryButton.isDisabled}
                children={primaryButton?.label}
                leftIcon={primaryButton?.icon}
                onClick={primaryButton?.onClick}
              />
            )}
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
