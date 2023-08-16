import { FC } from "react";
import { redirect } from "next/navigation";
import { ProjectModal } from "@/components/Modal/ProjectModal";
import { ProjectForm } from "@/components/ProjectForm/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { users } from "@/users";
import { getProjectDetails } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";

interface IEditProject {
  params: { id: string };
}

const EditProject: FC<IEditProject> = async ({ params: { id } }) => {
  const session = (await getCurrentUser()) || users[0];

  if (!session?.user) {
    redirect("/");
  }

  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };
  return (
    <ProjectModal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type="EDIT" session={session} project={result?.project} />
    </ProjectModal>
  );
};
export default EditProject;
