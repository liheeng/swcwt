import { Action } from "redux";
import { TodoItem } from "../model/TodoItem";
export declare const ActionTypes: {
    INIT_STORE: string;
    ADD_TODO_ITEM: string;
    COMPLETE_TODO_ITEM: string;
};
export interface IInitStoreAction extends Action {
    todos: TodoItem[];
}
export interface IAddTodoAction extends Action {
    todo: TodoItem;
}
export interface ICompleteTodoAction extends Action {
    todo: TodoItem;
}
