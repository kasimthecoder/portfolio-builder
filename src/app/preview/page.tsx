import RenderComponents from "@/components/RenderComponents";
import React from "react";
import { getPortfolio } from "../actions/portfolio";
import { redirect } from "next/navigation";

const page = async () => {
  const data = await getPortfolio();

  if (!data || data.error || !data.success) {
    redirect("/create-portfolio");
  }
  if (data.data.sections === 0) {
    redirect("/builder");
  }
  return (
    <div>
      <RenderComponents portfolio={data.data} />
    </div>
  );
};

export default page;
