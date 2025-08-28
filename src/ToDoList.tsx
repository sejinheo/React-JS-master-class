import { useState } from "react";
import { useForm } from "react-hook-form"

interface IForm {
    toDo: string;
}

function ToDoList() {
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleVaild = (data:IForm) => {
        setValue("toDo", "")
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleVaild)}>
                <input {...register("toDo", {required: "Please write a To Do",})} placeholder="Write a to do" />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;