import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Routes } from "../../constants/Routes";

const ForbiddenPage = () => {
  return <Center w={'100%'}>
    <VStack>
      <Text>The requested page is forbidden</Text>
      <Button><Link to={Routes.auth.login}>Go to Home</Link></Button>
    </VStack>
  </Center>;
};

export default ForbiddenPage;
