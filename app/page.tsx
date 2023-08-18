import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback/ErrorFallback";
import { ProjectCardList } from "../components/ProjectCardList/ProjectCardList";
import Categories from "@/components/Categories/Categories";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

interface ISearchParams {
  category?: string | null;
}

interface IHomeProps {
  searchParams: ISearchParams;
}

const Home: FC<IHomeProps> = async ({ searchParams: { category } }) => {
  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProjectCardList category={category} />
      </ErrorBoundary>
    </section>
  );
};

export default Home;
