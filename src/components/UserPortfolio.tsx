import RenderComponents from "@/components/RenderComponents";

export default function UserPortfolio({ portfolio }: { portfolio: any }) {
  return (
    <main className="w-full min-h-screen">
      <RenderComponents portfolio={portfolio} selectionClick={false} />
    </main>
  );
}
