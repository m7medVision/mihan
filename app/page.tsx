import { GetJobs } from "@/lib/actions";
import JobsSection from "@/components/JobsSection";

export default async function Home() {
  const jobs = await GetJobs();
  const randomIndex = Math.floor(Math.random() * jobs.length);
  const featuredJob = jobs[randomIndex];
  return (
    <JobsSection
      jobs={jobs}
      featuredJobId={featuredJob.id}
    />
  );
}
