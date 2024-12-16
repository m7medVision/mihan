import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
interface JobCardProps {
  title: string;
  type: string;
  salary: number;
  skills: string;
  date: string;
  description: string;
}

export default function JobCard({ title, type, salary, skills, date, description }: JobCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Badge variant="secondary">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Salary: <span className="font-medium text-foreground">{salary}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Required Skills: <span className="font-medium text-foreground">{skills}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Posted: <span className="font-medium text-foreground">{date}</span>
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="">
        <Button className="w-full">Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
