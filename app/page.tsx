
import { getUserTodoListAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import TodoTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";

export default  async function Home() {
  const {userId} = await auth()
  const todos=await getUserTodoListAction({userId})
  
  return (
    <main className="mx-auto space-y-5  max-w-5xl ">
      <div className="flex justify-end w-full">
              <AddTodoForm userId={userId} />
      </div>
      <TodoTable todos={todos}/>
    </main>
  );
}
