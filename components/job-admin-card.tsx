'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trash2 } from 'lucide-react'
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface JobAdminProps {
  id: number
  title: string
  salary: number
  requiredSkills?: string
  postedDate?: string
  description: string
}

export default function JobAdmin({
  id,
  title = "Software Developer",
  salary = 55000,
  requiredSkills = "React, Spring Boot, AWS",
  postedDate = "11/12/2024",
  description = "Backend development in Java, Spring Boot - Fron..",
}: JobAdminProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const deleteJobMutation = useMutation({
    mutationFn: async (jobId: number) => {
      const response = await fetch("/api/jobs/my-jobs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_id: jobId }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete job")
      }

      return response.json()
    },
    onSuccess: () => {
      setIsDialogOpen(false)
      router.refresh()
      toast({
        title: "Job deleted",
        description: "The job has been successfully deleted.",
        variant: "default",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete job",
        variant: "destructive",
      })
    },
  })

  const handleDelete = () => {
    deleteJobMutation.mutate(id)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground">
              {title}
            </CardTitle>
            <Badge variant="secondary" className="mt-1.5 bg-primary/10 text-primary hover:bg-primary/20">
              Full-time
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2.5">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Salary:</span> {salary}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Required Skills:</span>{" "}
            {requiredSkills}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Posted:</span>{" "}
            {postedDate}
          </p>
          <p className="text-sm text-muted-foreground">- {description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Job
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the job posting.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteJobMutation.isLoading}
              >
                {deleteJobMutation.isLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

