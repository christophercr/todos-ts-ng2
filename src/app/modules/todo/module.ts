"use strict";

import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {TodosPageComponent} from "./pages/todosPage";
import {AddTodoComponent} from "./components/addTodo";
import {TodoListComponent} from "./components/todoList";
import {TodoEscapeDirective} from "./directives/todoEscape";
import {TodoFocusDirective} from "./directives/todoFocus";
import {StoreService} from "./services/store";

// async components must be named routes for WebpackAsyncRoute
export const routes = [
    {path: "", component: TodosPageComponent, pathMatch: "full"}
];

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        TodosPageComponent,
        AddTodoComponent,
        TodoListComponent,
        TodoEscapeDirective,
        TodoFocusDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        StoreService
    ]
})
export default class TodoModule {
    static routes = routes;
}
