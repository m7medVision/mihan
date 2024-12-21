import JobCard from "@/components/job-card";
import { GetJobs } from "@/lib/actions";

export default async function Home() {
  const jobs = await GetJobs();
  const randomIndex = Math.floor(Math.random() * jobs.length);
  const featuredJob = jobs[randomIndex];
  return (
    // add grid of job-cards using the JobCard component
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[80%] mx-auto py-8">
      {
        // i want one of the carda to be a featured card using the isFeatured prop and with math.random() to randomly select a job'
        jobs.map((job) => (
          <JobCard
            isFeatured={job.id === featuredJob.id}
            key={job.id}
            id={job.id}
            date={job.date}
            title={job.title}
            type={job.type}
            salary={job.salary}
            description={job.description}
            skills={job.skills}
          />
        ))
      }
    </div>
  );
}
