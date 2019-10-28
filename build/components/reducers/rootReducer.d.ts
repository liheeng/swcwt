import { IState } from "../store/configStore";
export declare const initState: IState;
export declare const rootReducer: import("redux").Reducer<{
    todos: import("../model/TodoItem").TodoItem[];
}, import("redux").AnyAction>;
