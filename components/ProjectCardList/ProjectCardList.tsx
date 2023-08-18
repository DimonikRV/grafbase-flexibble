import { FC } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
// import LoadMore from "@/components/LoadMore/LoadMore";
import { fetchAllProjects } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";

interface ISearchParams {
  category?: string | null;
}

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
  };
};

export const ProjectCardList: FC<ISearchParams> = async ({ category }) => {
  const data = (await fetchAllProjects(category)) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];
  //   const pagination = data?.projectSearch?.pageInfo;
  return (
    <section className="projects-grid">
      {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
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
      {/* <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      /> */}
    </section>
  );
};
