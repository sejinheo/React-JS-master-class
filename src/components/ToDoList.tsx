import { useState } from "react";
import { useForm } from "react-hook-form"
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
})

interface IForm {
    toDo: string;
}

interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

function ToDoList() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleVaild = ({ toDo }: IForm) => {
        setToDos(oldToDos => [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos]);
        setValue("toDo", "");
    }
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handleVaild)}>
                <input {...register("toDo", { required: "Please write a To Do", })} placeholder="Write a to do" />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map(toDo => <li key={toDo.id}>{toDo.text}</li>)}
            </ul>
        </div>
    );
}

export default ToDoList;