import { FC } from "react";
import { UserProfile } from "@/common.types";
import { UserProfilePage } from "@/components/UserProfilePage/UserProfilePage";
import { getUserProjects } from "@/lib/actions";

interface IProfilePage {
  params: {
    id: string;
  };
}

const ProfilePage: FC<IProfilePage> = async ({ params: { id } }) => {
  const result = (await getUserProjects(id, 100)) as { user: UserProfile };
  return <UserProfilePage user={result?.user} />;
};

export default ProfilePage;
