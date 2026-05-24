// app/page.tsx

import { headers } from "next/headers";
import Home from "@/components/Home";
import { getPortfolioByDomain } from "./actions/portfolio";
import UserPortfolio from "@/components/UserPortfolio";
import { notFound } from "next/navigation";

const reservedSubdomains = ["www", "builder", "api", "admin"];

export default async function Page() {
  const subdomain = (await headers()).get("x-subdomain") || "";

  if (!subdomain) {
    return <Home />;
  }

  if (reservedSubdomains.includes(subdomain)) {
    return <Home />;
  }

  const data = await getPortfolioByDomain({
    domain: subdomain,
  });

  if (!data || data.error || !data.success) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen">
      <UserPortfolio portfolio={data.data} />
    </main>
  );
}
