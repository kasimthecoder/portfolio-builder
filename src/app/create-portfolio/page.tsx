// app/.../page.tsx — clean, no inline function
import CreatePortfolioForm from "@/components/builder/createPortfolioForm";

const page = async () => {
  return (
    <div>
      <CreatePortfolioForm />
    </div>
  );
};

export default page;
