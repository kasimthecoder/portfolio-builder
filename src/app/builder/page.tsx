import { getPortfolio } from "../actions/portfolio";
import { redirect } from "next/navigation";
import BuilderClient from "@/components/builder/BuilderClient";

const BuilderPage = async () => {
  const data = await getPortfolio();

  if (!data || data.error || !data.success) {
    redirect("/create-portfolio");
  }

  return <BuilderClient portfolio={data.data} />;
};

export default BuilderPage;
