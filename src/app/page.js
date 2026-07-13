import HeroBanner from "@/components/home/HeroBanner";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
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
            <button className="btn btn-primary rounded-full">
              Explore Campaigns
            </button>
            <button className="btn btn-outline btn-secondary rounded-full">
              Start a Campaign
            </button>
          </div>
        </div>

        {/* Right: illustration */}
        <div className="w-full flex-1">
          <HeroBanner />
        </div>
      </section>
      <HowItWorks />
      <Testimonials />
    </main>
  );
}