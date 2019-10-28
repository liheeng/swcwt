import { Dispatch, Action } from "redux";
import { TodoItem } from "../model/TodoItem";
export interface IState {
    todos: TodoItem[];
}
export declare const initStore: () => (dispatch: Dispatch<Action<any>>) => import("../actions/actionTypes").IInitStoreAction;
export declare const configureStore: () => import("redux").Store<{
    todos: TodoItem[];
}, import("redux").AnyAction> & {
    dispatch: unknown;
};
