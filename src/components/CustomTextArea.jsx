import { Textarea } from '@chakra-ui/textarea';
import React from 'react';

function CustomTextArea({ placeholder, errors, name, register }) {
  return (
    <>
      <Textarea
        placeholder={placeholder}
        bg="white"
        color="black"
        _placeholder={{ color: 'gray.500' }}
        name={name}
        {...register(name)}
      />
      {errors && errors[name] && (
        <p
          style={{
            color: 'red',
            fontSize: '13px',
            paddingLeft: '1px',
            marginTop: '3px',
            width: '100%',
          }}
        >
          {errors[name].message}
        </p>
      )}
    </>
  );
}

export default CustomTextArea;
