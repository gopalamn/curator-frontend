import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Button,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  FormControl,
  ModalContent,
  ModalFooter,
  Heading,
  Input,
  createStandaloneToast,
} from "@chakra-ui/react";
import { useState } from "react";
import API from "../api";

export default function ProfileMenu() {
  const history = useHistory();
  let isAuthenticated = !!Cookies.get("accessToken");
  let username = localStorage.getItem("username");
  let fullname = localStorage.getItem("fullname")!;
  let profile_pic = localStorage.getItem("profile_pic")!;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangePwdLoading, setIsChangePwdLoading] = useState(false);

  const api = API();
  // Logout
  const handleLogout = async () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("fullname");
    // localStorage.clear();
  };

  const logoutRedirect = async () => {
    await handleLogout();
    history.push("/login");
  };

  const handleChangePassword = async (event: any) => {
    event.preventDefault();
    setIsChangePwdLoading(true);
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      const toast = createStandaloneToast();
      toast({
        title: "An error occured.",
        description: "Please complete all fields and confirm new password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    await api
      .setPassword(oldPassword, newPassword)
      .then((response: any) => {
        const toast = createStandaloneToast();
        toast({
          title: "Success!",
          description: "Your password was changed!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error: any) => {
        const toast = createStandaloneToast();
        toast({
          title: "An error occured.",
          description: "Your password was not changed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });

    setIsChangePwdLoading(false);
  };

  return (
    <Box py={3}>
      {isAuthenticated && (
        <Box>
          <Menu>
            <MenuButton>
              <Avatar mr={4} size="sm" name={fullname} src={profile_pic} />
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
                <Link to={`/p/${username}`}>
                  <MenuItem>My Account</MenuItem>
                </Link>
                <MenuItem onClick={logoutRedirect}>Logout</MenuItem>
                <MenuItem onClick={onOpen}>Change Password</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center">
                <Heading>Change Your Password</Heading>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody my={2} textAlign="left">
                <FormControl>
                  <FormLabel>Old Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    isInvalid={!!(newPassword !== confirmPassword)}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input
                    type="password"
                    isInvalid={!!(newPassword !== confirmPassword)}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  isLoading={isChangePwdLoading}
                  onClick={handleChangePassword}
                  colorScheme="teal"
                  mr={3}
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    onClose();
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  );
}
