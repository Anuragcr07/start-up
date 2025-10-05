import { auth } from "@/auth";
import { redirect } from "next/navigation";

import StartupForm from "@/components/StartupForm";

async function Page() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px] animated-section">
        <h1 className="heading animated-heading">Submit Your Startup Pitch</h1>
      </section>

      {/* The form itself will be wrapped in a container for animation */}
      <section className="section_container form-section animated-section">
        <StartupForm />
      </section>
    </>
  );
}

export default Page;