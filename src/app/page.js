export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <span className="badge badge-primary badge-outline mb-4">
        Crowdfunding Platform
      </span>
      <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Fund the future,{" "}
        <span className="text-primary">together</span>
      </h1>
      <p className="mt-6 max-w-md text-base text-neutral-content">
        Support campaigns, track contributions, and help ideas grow — powered
        by a community that believes in you.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <button className="btn btn-primary rounded-full">
          Explore Campaigns
        </button>
        <button className="btn btn-outline btn-secondary rounded-full">
          Start a Campaign
        </button>
      </div>
    </main>
  );
}