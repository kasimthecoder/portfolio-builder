import { getPortfolio } from "@/app/actions/portfolio";
import PortfolioSettingsPage from "@/components/settings/PortfolioSettingsPage";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const data = await getPortfolio();

  if (!data || data.error || !data.success) {
    redirect("/create-portfolio");
  }
  return (
    <div>
      <PortfolioSettingsPage portfolio={data.data} />
    </div>
  );
};

export default page;
