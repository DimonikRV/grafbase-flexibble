"use client";

import { deleteProject, fetchToken } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import trash from "../../public/trash.svg";
import { FC, useState } from "react";

interface IProjectActions {
  projectId: string;
}

export const ProjectActions: FC<IProjectActions> = ({ projectId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();
    router.push("/");
    try {
      await deleteProject(projectId, token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>
      <button
        type="button"
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        onClick={handleDeleteProject}
      >
        <Image src={trash} width={15} height={15} alt="delete" />
      </button>
    </>
  );
};
