'use client'
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { todoformSchema } from "@/schema";
import { createTodoListAction } from "@/actions/todo.actions";
import { Checkbox } from "./ui/checkbox";
import Spinner from "./Spinner";
import { useState } from "react";



const AddTodoForm = ({userId}:{userId:string |null}) => {
    const [loading,setLoading]=useState(false)
    const [open,setOpen]=useState(false)
    type TodoFormData = z.infer<typeof todoformSchema>;

    const form = useForm<TodoFormData>({
    resolver: zodResolver(todoformSchema),
    defaultValues: {
      title: "",
      body: "",
      completed: false,
    },
  })

  const onSubmit= async(data:z.infer <typeof todoformSchema>)=>{
      setLoading(true)
      await createTodoListAction({title:data.title,body:data.body,completed:data.completed,userId})
      setLoading(false)
      setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
    <Button>
      <Plus size={14} />
      New TODO
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you&apos;re done.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                    <Textarea
                    className="resize-none"
                    placeholder="tell us about your todo"
                    {...field}
                />
                </FormControl>
                <FormDescription>
                    You can write more details here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="completed"
            render={({ field }) => (
              <FormItem className="flex  items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox  checked={field.value} onCheckedChange={field.onChange}/>
                </FormControl>
                <FormLabel>Completed</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
            <Button type="submit" disabled={loading}>
              {
                loading?
                <>
                <Spinner/>
                Saving
                </>
                :"Save"
              }
            </Button>
        </form>
      </Form>
    </div>
  </DialogContent>
</Dialog>
  )
}

export default AddTodoForm