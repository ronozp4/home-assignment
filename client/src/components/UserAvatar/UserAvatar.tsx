import { Avatar, AvatarProps } from "@mui/material";
import { UserData } from "../../types";
import { forwardRef } from "react";
import { getInitials } from "../../utils/tools";

type UserAvatarProps = AvatarProps & {
  user: UserData;
};

export const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ user, ...props }, ref) => {
    return <Avatar alt={user.name} src={user.avatar} ref={ref} {...props} >{!user.avatar ? getInitials(user.name): ''}</Avatar>;
  }
);
