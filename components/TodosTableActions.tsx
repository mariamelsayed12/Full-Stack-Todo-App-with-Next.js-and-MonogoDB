'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import Spinner from './Spinner'
import { deleteTodoListAction } from '@/actions/todo.actions'
import EditTodoForm from './EditTodoForm'
import { ITodos } from '@/interfaces'

const TodosTableActions = ({todo}:{todo:ITodos}) => {
    const [loading,setLoading]=useState(false)

  return (
    <>
                <EditTodoForm todo={todo}/>
                <Button size={'icon'} variant={'destructive'}
                    onClick={async()=>{
                        setLoading(true)
                        await  deleteTodoListAction({id:todo.id??""})
                        setLoading(false)
                    }
                    }
                    >
                    {loading?<Spinner/>:<Trash size={16} />}
                </Button>
    </>
  )
}

export default TodosTableActions