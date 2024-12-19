import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail } from 'lucide-react'

interface ApplicationCardProps {
  name: string;
  email: string;
  jobTitle: string;
  jobType: string;
  salary: number;
  photo: string | null;
  cv: string;
}

export default function ApplicationCard({ 
  name,
  email,
  jobTitle,
  jobType,
  salary,
  cv,
}: ApplicationCardProps) {
  return (
    <Card className="max-w-2xl">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{name}</h2>
          <Badge variant="secondary">{jobType}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{email}</span>
        </div>
        <p className="text-sm text-muted-foreground">Applied: {new Date().toLocaleDateString()}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h3 className="font-semibold">Position Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Applied Position</div>
              <div>{jobTitle}</div>
              <div className="text-muted-foreground">Salary Expectation</div>
              <div>{salary}/year</div>
            </div>
          </div>
          <Separator />
          <div className="grid gap-2">
            <h3 className="font-semibold">Experience</h3>
            <p className="text-sm text-muted-foreground">
              {cv}
            </p>
          </div>
          <Separator />
          <div className="grid gap-2">
            <h3 className="font-semibold">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Spring Boot</Badge>
              <Badge variant="outline">AWS</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

