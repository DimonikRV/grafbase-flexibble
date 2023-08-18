import { FC } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";

import { ProjectInterface } from "@/common.types";

interface IProjectCardList {
  projectsToDisplay: {
    node: ProjectInterface;
  }[];
}

export const ProjectCardList: FC<IProjectCardList> = async ({
  projectsToDisplay,
}) => {
  return (
    <section className="projects-grid">
      {projectsToDisplay &&
        projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
    </section>
  );
};
