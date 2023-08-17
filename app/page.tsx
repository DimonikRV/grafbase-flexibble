import { FC } from "react";
import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories/Categories";
import LoadMore from "@/components/LoadMore/LoadMore";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

interface ISearchParams {
  category?: string | null;
  endcursor?: string | null;
}

interface IHomeProps {
  searchParams: ISearchParams;
}

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home: FC<IHomeProps> = async ({
  searchParams: { category, endcursor },
}) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch;
  // console.log(data);
  console.log(data.projectSearch.edges);
  console.log(category);
  console.log(endcursor);

  const projectsToDisplay = data?.projectSearch?.edges || [];
  const pagination = data?.projectSearch?.pageInfo;

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />

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
      </section>

      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
  );
};

export default Home;
