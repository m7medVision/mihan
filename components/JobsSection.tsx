"use client";
import { useEffect, useState } from "react";
import JobCard from "@/components/job-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { jobs } from "@/db/schema";

type Job = typeof jobs.$inferSelect

export default function JobsSection({ jobs, featuredJobId }: { jobs: Job[]; featuredJobId: number; }) {
  const [selectedType, setSelectedType] = useState("all-types");
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  useEffect(() => {
    if (selectedType === "all-types") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.type === selectedType));
    }
  }, [selectedType, jobs]);

  const uniqueTypes = [...new Set(jobs.map(job => job.type))];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[80%] mx-auto py-8">
      <div className="w-40 col-span-full">
        <Select onValueChange={(value) => setSelectedType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Types"  defaultValue="all-types"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All Types</SelectItem>
            {uniqueTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {filteredJobs.map((job) => (
        <JobCard
          isFeatured={job.id === featuredJobId}
          key={job.id}
          id={job.id}
          date={job.date}
          title={job.title}
          type={job.type}
          salary={job.salary}
          description={job.description}
          skills={job.skills}
        />
      ))}
    </div>
  );
}