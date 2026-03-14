import { useSelector } from "@/services/store";
import {
  getUser,
  selectUser
} from "@/services/slices/auth/authSlice";
import { ProfileSectionUI } from "../ui/ProfileSection";
import { useDispatch } from "@/services/store";
import { useEffect } from "react";

export function ProfileSection() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, user]);

  if (!user) {
    return <ProfileSectionUI user={null} />;
  }

  return <ProfileSectionUI user={user}  />;
}