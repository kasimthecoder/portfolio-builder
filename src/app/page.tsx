// app/page.tsx
import { headers } from "next/headers";
import Home from "@/components/Home";
import { getPortfolioByDomain } from "./actions/portfolio";
import { redirect } from "next/navigation";
import UserPortfolio from "@/components/UserPortfolio";

export default async function Page() {
  const subdomain = (await headers()).get("x-subdomain") || "";

  if (subdomain) {
    const data = await getPortfolioByDomain({ domain: subdomain });

    if (!data || data.error || !data.success) {
      const host =
        process.env.NEXT_PUBLIC_HOST ||
        process.env.HOST ||
        "http://localhost:3000";
      redirect(host);
    }

    return (
      <main className="w-full min-h-screen">
        <UserPortfolio portfolio={data.data} />
      </main>
    );
  }

  return <Home />;
}
