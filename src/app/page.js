"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import ExploreByCategory from "@/components/home/ExploreByCategory";
import HeroBanner from "@/components/home/HeroBanner";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import TopFundedCampaigns from "@/components/home/TopFundedCampaigns";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  function handleExploreClick() {
    router.push("/explore");
  }

  function handleStartCampaignClick() {
    if (isPending) return;

    if (!session) {
      toast.info("Please sign up or log in as a creator to start a campaign.");
      router.push("/register");
      return;
    }

    if (session.user.role !== "creator") {
      toast.error("Only creator accounts can start a campaign.");
      return;
    }

    router.push("/dashboard/creator/add-campaign");
  }

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 py-16 lg:flex-row lg:py-24">
        {/* Left: text content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <span className="badge badge-primary badge-outline mb-4">
            Crowdfunding Platform
          </span>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Fund the future,{" "}
            <span className="text-primary">together</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-neutral-content">
            Support campaigns, track contributions, and help ideas grow —
            powered by a community that believes in you.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={handleExploreClick}
              className="btn btn-primary rounded-full"
            >
              Explore Campaigns
            </button>
            <button
              onClick={handleStartCampaignClick}
              className="btn btn-outline btn-secondary rounded-full"
            >
              Start a Campaign
            </button>
          </div>
        </div>

        {/* Right: illustration */}
        <div className="w-full flex-1">
          <HeroBanner />
        </div>
      </section>

      <TopFundedCampaigns />
      <ExploreByCategory />
      <HowItWorks />
      <Testimonials />
    </main>
  );
}