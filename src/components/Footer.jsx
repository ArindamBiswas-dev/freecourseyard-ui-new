import { Box, Flex, Heading, Text } from '@chakra-ui/react';

function Footer() {
  return (
    <Flex bg="#15294F" p="6" pb="1" direction="column" color="white">
      <Box textAlign="left">
        <Heading color="blue.400">FREECOURSEYARD</Heading>
        <Text fontSize="sm" color="cyan.600" mt="1" mb="6">
          Education beyond University | Free Learning
        </Text>
      </Box>
      <hr />
      <Flex justify="space-between" mb="6" wrap="wrap">
        <Box textAlign="left" w="250px" mt="6">
          <Heading size="md" color="blue.500">
            About Us
          </Heading>
          <Text fontSize="sm" mt="3" textAlign="justify">
            FREECOURSEYARD help you to find the best online free courses from
            all across the internet. Find your desire course and Level up your
            skill.
          </Text>
        </Box>
        <Box textAlign="left" mt="6">
          <Heading size="md" color="blue.500">
            Contact Us
          </Heading>
          <Text fontSize="sm" mt="3">
            <a href="mailto:freecourseyard@gmail.com">
              freecourseyard@gmail.com
            </a>
          </Text>
        </Box>
      </Flex>
      <Text size="sm" mt="5" textAlign="center">
        Made with{' '}
        <span role="img" aria-label="heart">
          ❤️
        </span>{' '}
        in INDIA 🇮🇳
      </Text>
    </Flex>
  );
}

export default Footer;
