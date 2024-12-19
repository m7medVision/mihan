import JobAdmin from "@/components/job-admin-card";
import { getMyJobs } from "@/lib/actions";

export default async function Page() {
    const myJobs = await getMyJobs();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[80%] mx-auto py-8">
            {
                myJobs.map((job) => (
                    <JobAdmin
                        id={job.id}
                        key={job.id}
                        title={job.title}
                        salary={job.salary}
                        // requiredSkills={job.requiredSkills}
                        // postedDate={job.postedDate}
                        description={job.description}
                    />
                ))
            }
        </div>
    );
}