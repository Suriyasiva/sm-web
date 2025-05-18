import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Routes } from "../../constants/Routes";

const NotFoundPage = () => {
  return <Center w={'100%'}>
    <VStack>
      <Text>The requested page is not found</Text>
      <Button><Link to={Routes.user.dashboard}>Go to Home</Link></Button>
    </VStack>
  </Center>;
};

export default NotFoundPage;
