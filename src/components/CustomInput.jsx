import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import React from 'react';

function CustomInput({ name, placeholder, errors, register, leftElement }) {
  return (
    <div style={{ width: '100%' }}>
      <InputGroup>
        <InputLeftElement
          children={leftElement}
          color="black"
          fontSize="1.2em"
        />
        <Input
          size="md"
          variant="outline"
          type="text"
          bg="white"
          color="black"
          fontSize="lg"
          _placeholder={{ color: 'gray.500' }}
          {...register(name)}
          placeholder={placeholder}
        />
      </InputGroup>
      {errors && errors[name] && (
        <Text color="red" fontSize="13px" pl="1" mt="3px" w="100%">
          {errors[name].message}
        </Text>
      )}
    </div>
  );
}

export default CustomInput;
