import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg';
import { MdPersonAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../App';
import { RiLoginCircleLine, RiLogoutCircleLine } from 'react-icons/ri';
import { BsHeartFill } from 'react-icons/bs';

function ProfileAvater() {
  const { colorMode } = useColorMode();

  const user = useContext(userContext);

  const onHoverColor = colorMode === 'light' ? 'white' : 'gray.600';
  return (
    <Menu closeOnBlur closeOnSelect>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<CgProfile />}
        size="md"
        bg="blue.400"
        color="white"
        borderRadius="50%"
        variant="filled"
      />
      <MenuList
        fontSize="md"
        bg="gray.400"
        border="none"
        px="2"
        rounded="md"
        color="black"
      >
        {!user.token ? (
          <>
            <Link to="/login">
              <MenuItem
                p="2"
                icon={<RiLoginCircleLine size="18px" />}
                rounded="md"
                _hover={{ bg: onHoverColor }}
              >
                Log In
              </MenuItem>
            </Link>
            <Link to="/signup">
              <MenuItem
                p="2"
                icon={<MdPersonAdd size="18px" />}
                rounded="md"
                _hover={{ bg: onHoverColor }}
              >
                Create Account
              </MenuItem>
            </Link>
          </>
        ) : (
          <>
            <Link to="/favorites">
              <MenuItem
                p="2"
                icon={<BsHeartFill size="18px" />}
                rounded="md"
                _hover={{ bg: onHoverColor }}
              >
                Favorites
              </MenuItem>
            </Link>
            <Link to="/logout">
              <MenuItem
                p="2"
                icon={<RiLogoutCircleLine size="18px" />}
                rounded="md"
                _hover={{ bg: onHoverColor }}
              >
                Logout
              </MenuItem>
            </Link>
          </>
        )}
      </MenuList>
    </Menu>
  );
}

export default ProfileAvater;
