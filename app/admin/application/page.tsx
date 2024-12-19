import ApplicationCard from "@/components/application-card";
import { getApplications } from "@/lib/actions";

export default async function Home() {
  const applications = await getApplications();
  console.log(applications);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[80%] mx-auto py-8">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          name={application.name}
          email={application.email}
          jobTitle={application.job.title}
          jobType={application.job.type}
          salary={application.job.salary}
          photo={application.photo}
          cv={application.cv}
        />
      ))}
    </div>
  );
}
