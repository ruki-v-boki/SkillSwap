import { useSelector } from "@/services/store";
import {
  getUser,
  selectUser
} from "@/services/slices/auth/authSlice";
import { ProfileSectionUI } from "../ui/ProfileSection";
import { useDispatch } from "@/services/store";
import { useEffect } from "react";
import { MOCK_USERS } from "@/mock/users";


export function ProfileSection() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const MOCK_USER = MOCK_USERS[1]

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, user]);

  // if (!user) {
  //   return <ProfileSectionUI user={null} />;  <----- для настоящего api юзера
  // }

  // return <ProfileSectionUI user={user}  />; <----- для настоящего api юзера

  if (!MOCK_USER) {
    return <ProfileSectionUI user={null} />;
  }

  return <ProfileSectionUI user={MOCK_USER}  />;
  // return <ProfileSectionUI user={user}  />;


}