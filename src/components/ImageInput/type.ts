import React from "react";

interface ProfileImageInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "type"
> {
  id?: string;
  name: string;
  label: string;
}

export default ProfileImageInputProps;
