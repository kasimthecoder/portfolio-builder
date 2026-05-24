import CreatePortfolioForm from "@/components/builder/createPortfolioForm";
import { redirect } from "next/navigation";
import { getPortfolio } from "../actions/portfolio";

const page = async () => {
  const data = await getPortfolio();

  if (data || data.success) {
    redirect("/builder");
  }
  return (
    <div>
      <CreatePortfolioForm />
    </div>
  );
};

export default page;
