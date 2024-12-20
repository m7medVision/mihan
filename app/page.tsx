import JobCard from "@/components/job-card";
import { GetJobs } from "@/lib/actions";
import Image from "next/image";

export default async function Home() {
  const jobs = await GetJobs();
  return (
    // add grid of job-cards using the JobCard component
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[80%] mx-auto py-8">
      {
      jobs.map((job) => (
        <JobCard 
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
