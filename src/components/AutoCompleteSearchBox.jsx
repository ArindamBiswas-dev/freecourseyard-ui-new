import {
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { RiSearch2Line } from 'react-icons/ri';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AutoCompleteSearchBox(props) {
  const { isOpen, onClose, input, setInput } = props;
  const [temp, setTemp] = useState([]);

  const onChangeHandeler = async (e) => {
    let value = e.target.value;
    setInput(value);
  };

  const onModalClose = (e) => {
    onClose(e);
    setInput('');
    setTemp([]);
  };

  useEffect(() => {
    if (input && input.length >= 2) {
      axios
        .get(
          `https://freecourseyard-backend.glitch.me/autocompletesearch?term=${input}`
        )
        .then((res) => {
          setTemp(res.data.result);
        })
        .catch((err) => console.log(err));
    }
  }, [input]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      motionPreset="slideInBottom"
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <InputGroup>
          <InputLeftElement children={<RiSearch2Line />} color="black" />
          <Input
            size="md"
            variant="filled"
            placeholder="search here..."
            w="100%"
            value={input}
            onChange={onChangeHandeler}
            bg="white"
            transition="0.35 all"
            _focus={{ bg: 'white' }}
            _hover={{ bg: 'white' }}
            _active={{ bg: 'white' }}
            color="black"
            _placeholder={{ color: 'gray.500' }}
          />
        </InputGroup>
        {temp.length > 0 && <Divider />}

        <List spacing="3" maxH="200px" overflowY="scroll">
          {input && (
            <>
              <Link to={`/search/${input}`}>
                <ListItem
                  _hover={{ bg: 'teal.500', color: 'white' }}
                  p="3"
                  fontWeight="550"
                  h="50px"
                >
                  <ListIcon as={FiEdit} />
                  {input}
                </ListItem>
              </Link>
            </>
          )}
          {temp &&
            temp.map((t, index) => (
              <Link to={`/course/${t._id}`} key={t._id}>
                <ListItem
                  _hover={{ bg: 'gray.500', color: 'white' }}
                  p="3"
                  fontWeight="550"
                >
                  <ListIcon as={HiOutlineDocumentSearch} />
                  {t.title}
                </ListItem>
              </Link>
            ))}
        </List>
      </ModalContent>
    </Modal>
  );
}

export default AutoCompleteSearchBox;
