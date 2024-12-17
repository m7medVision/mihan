"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  type: z.string().nonempty("Type is required"),
  salary: z.coerce.number().min(0, "Salary must be at least 0"),
  description: z.string().nonempty("Description is required"),
  skills: z.string().nonempty("Skills are required"),
  picture: z.string().optional(),
  date: z.string().nonempty("Date is required"),
})

export function NewJobDialog() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      salary: 0,
      description: "",
      skills: "",
      picture: "",
      date: new Date().toISOString().slice(0, 10),
    },
  })

  const createJobMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create job")
      }

      return response.json()
    },
    onSuccess: () => {
      toast({
        title: "Job created",
        description: "The job has been successfully created.",
        variant: "default",
      })
      form.reset()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:"An error occurred while creating the job.",
        variant: "destructive",
      })
    },
  })

interface FormData {
    title: string;
    type: string;
    salary: number;
    description: string;
    skills: string;
    picture?: string;
    date: string;
}

function onSubmit(data: FormData) {
    createJobMutation.mutate(data)
}

  return (
    <Dialog>
      <DialogTrigger>
          New Job
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter salary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills Required</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter required skills" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="picture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Picture URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter picture URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={createJobMutation.isLoading}>
              {createJobMutation.isLoading ? "Creating..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}