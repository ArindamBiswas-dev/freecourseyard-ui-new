import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import { MdLock } from 'react-icons/md';
import { IconButton } from '@chakra-ui/button';

function CustomPasswordInput({ name, placeholder, errors, register }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div style={{ width: '100%' }}>
      <InputGroup>
        <InputLeftElement
          children={<MdLock />}
          color="black"
          fontSize="1.2em"
        />
        <Input
          size="md"
          variant="outline"
          bg="white"
          color="black"
          type={showPassword ? 'text' : 'password'}
          fontSize="lg"
          _placeholder={{ color: 'gray.500' }}
          {...register(name)}
          placeholder={placeholder}
        />
        <InputRightElement width="4.5rem" fontSize="1.2em">
          <IconButton
            aria-label="Search database"
            variant="unstyled"
            _focus={{ outline: 'none' }}
            h="1.75rem"
            size="sm"
            bg="transparent"
            ml="10"
            icon={showPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
            onClick={() => setShowPassword(!showPassword)}
            color="black"
            required
          />
        </InputRightElement>
      </InputGroup>
      {errors && errors[name] && (
        <Text
          color="red"
          fontSize="13px"
          pl="1"
          mt="3px"
          textAlign="justify"
          w="100%"
        >
          {errors[name].message}
        </Text>
      )}
    </div>
  );
}

export default CustomPasswordInput;
