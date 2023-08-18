import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadMore from "@/components/LoadMore/LoadMore";
import { fetchAllProjects } from "@/lib/actions";
import { ErrorFallback } from "@/components/ErrorFallback/ErrorFallback";
import { ProjectCardList } from "../components/ProjectCardList/ProjectCardList";
import Categories from "@/components/Categories/Categories";
import { ProjectInterface } from "@/common.types";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

interface ISearchParams {
  category?: string | null;
  endcursor?: string | null;
}

interface IHomeProps {
  searchParams: ISearchParams;
}

interface ISearchParams {
  category?: string | null;
  endcursor?: string | null;
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

const Home: FC<IHomeProps> = async ({
  searchParams: { category, endcursor },
}) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];
  const pagination = data?.projectSearch?.pageInfo;

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProjectCardList projectsToDisplay={projectsToDisplay} />
      </ErrorBoundary>
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
