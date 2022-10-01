import { useMutation, useQuery } from "@apollo/client";
import { IoIosSchool } from "react-icons/io";
import {  BsSignpost2Fill,BsPhone } from "react-icons/bs";

import { AiFillGithub, AiOutlineLink, AiFillLinkedin } from "react-icons/ai";
import { debounce } from "lodash";
import {
  Avatar,
  Container,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ME } from "../gql/queries";
import { UPDATE_PROFILE_MUTATION } from "../gql/mutations";
import { UserType } from "../types/user-type";
import { PrivateRoute } from "./PrivateRoute";
import SalaryRange from "../components/SalaryOptions";
import { UploadFileInput } from "../components/UploadFileInput";

function Profile() {
  const { loading: loadingProfile, data: profileData } = useQuery<{
    me: UserType;
  }>(ME);
  const [updateProfileMutation] = useMutation<
    { updateProfile: boolean },
    {
      field: string;
      value: string;
    }
  >(UPDATE_PROFILE_MUTATION);
  let debouncedFuncs: any = {};

  // YUCK
  // TODO: fix this shit
  if (profileData) {
    Object.keys(profileData.me.profile).forEach((key) => {
      debouncedFuncs[key] = debounce(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
          const res = await updateProfileMutation({
            variables: { field: e.target.name, value: e.target.value },
          });
          if (res.data?.updateProfile) {
            toast({
              duration: 1000,
              position: "top-right",
              status: "success",
              title: "Profile Updated!",
              variant: "subtle",
            });
            setTimeout(() => {
              toast.close("saving");
            }, 100);
          }
        },
        2500
      );
    });
  }

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!toast.isActive("saving")) {
      toast({
        position: "top-right",
        status: "loading",
        title: "saving...",
        variant: "subtle",
        id: "saving",
      });
    }
    await debouncedFuncs[e.target.name](e);
  };
  

  const toast = useToast();
  return (
    <>
      <PrivateRoute>
        <Heading>Profile</Heading>
        {loadingProfile ? "Loading..." : null}

        <Container>
          <UploadFileInput url={profileData?.me.imgUrl} />
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="John"
            defaultValue={profileData?.me.profile.firstName}
            name="firstName"
            onChange={handleChange}
          />

          <FormLabel>Last Name</FormLabel>

          <Input
            placeholder="Doe"
            defaultValue={profileData?.me.profile.lastName}
            name="lastName"
            onChange={handleChange}
          />

          <FormLabel>Biography</FormLabel>

          <Textarea
            placeholder="Tell us about yourself..."
            defaultValue={profileData?.me.profile.biography}
            name="biography"
            onChange={handleChange}
          />
          <FormLabel>Phone</FormLabel>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BsPhone color="gray.300" />}
            />
            <Input
              type="tel"
              placeholder="Phone number"
              defaultValue={profileData?.me.profile.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
            />
          </InputGroup>
          <FormLabel>Level of study</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<IoIosSchool />}
            />
            <Input
              placeholder="Bachelor..."
              defaultValue={profileData?.me.profile.levelOfStudy}
              name="levelOfStudy"
              onChange={handleChange}
            />
          </InputGroup>
          <FormLabel>Salary</FormLabel>
          <SalaryRange
            onChange={handleChange}
            defaultValue={profileData?.me.profile.expectedSalary}
          />

          <FormLabel>Wilaya</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<BsSignpost2Fill />}
            />
            <Input
              placeholder="Alger"
              defaultValue={profileData?.me.profile.wilaya}
              name="wilaya"
              onChange={handleChange}
            />
          </InputGroup>
          <FormLabel>Repository</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<AiFillGithub />}
            />
            <Input
              placeholder="Github / Gitlab"
              defaultValue={profileData?.me.profile.repoUrl}
              name="repoUrl"
              onChange={handleChange}
            />
          </InputGroup>

          <FormLabel>Portfilio</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<AiOutlineLink />}
            />
            <Input
              placeholder="www.example.com"
              defaultValue={profileData?.me.profile.portfolio}
              name="portfolio"
              onChange={handleChange}
            />
          </InputGroup>
          <FormLabel>LinkedIn</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<AiFillLinkedin />}
            />
            <Input
              placeholder="www.linkedin.com/user"
              defaultValue={profileData?.me.profile.linkedInUrl}
              name="linkedInUrl"
              onChange={handleChange}
            />
          </InputGroup>
        </Container>
      </PrivateRoute>
    </>
  );
}

export default Profile;
