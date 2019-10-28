import * as React from "react";
import { TodoItem } from "../model/TodoItem";
interface ITodoProps {
    todoItems: TodoItem[];
    actions?: any;
}
interface ITodoState {
    modalVisible: boolean;
    newTaskName: string;
}
declare class TodoPageComponent extends React.Component<ITodoProps, ITodoState> {
    constructor(props: ITodoProps);
    render(): JSX.Element;
    private handleOk;
    private handleCancel;
}
export declare const TodoPage: import("react-redux").ConnectedComponent<typeof TodoPageComponent, Pick<ITodoProps, never>>;
export {};
