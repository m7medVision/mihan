import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplyJobDialog } from "./apply-job-dialog";

interface JobCardProps {
  id: number;
  title: string;
  type: string;
  salary: number;
  skills: string;
  date: string;
  description: string;
  isFeatured?: boolean;
}

export default function JobCard({
  isFeatured,
  title,
  type,
  salary,
  skills,
  date,
  description,
  id,
}: JobCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Badge variant="secondary">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Salary:{" "}
            <span className="font-medium text-foreground">{salary}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Required Skills:{" "}
            <span className="font-medium text-foreground">{skills}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Posted: <span className="font-medium text-foreground">{date}</span>
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <ApplyJobDialog isFeatured={isFeatured} jobId={id} />
      </CardFooter>
    </Card>
  );
}
