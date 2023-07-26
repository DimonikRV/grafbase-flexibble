import { redirect } from "next/navigation";
import { ProjectModal } from "@/components/Modal/ProjectModal";
import { ProjectForm } from "@/components/ProjectForm/ProjectForm";
import { getCurrentUser } from "@/lib/session";

const CreateProject = async () => {
  const session = await getCurrentUser();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <ProjectModal>
      <h3 className="modal-head-text">Create a New Project</h3>
      <ProjectForm type="create" session={session} />
    </ProjectModal>
  );
};
export default CreateProject;
