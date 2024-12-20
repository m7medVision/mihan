import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
      <CardFooter className="mt-auto">
        <Button className="w-full">Apply Now</Button>
      </CardFooter>
    </Card>
  )
}
