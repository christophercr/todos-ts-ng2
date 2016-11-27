"use strict";

import {Component, OnInit} from "@angular/core";
import {Todo} from "../services/todo.intf";
import {StoreService} from "../services/store";

@Component({
    selector: "todos-page",
    templateUrl: "./todosPage.html",
    providers: [
        StoreService
    ]
})
export class TodosPageComponent implements OnInit {

    public store: StoreService;
    public todos: Todo[];
    public newTodo: Todo;

    public constructor(store: StoreService) {
        this.store = store;
    }

    public ngOnInit(): void {
        this.todos = [];
        this.newTodo = {
            title: "",
            completed: false
        };

        this.fetchTodos();
    }

    private fetchTodos(): void {
        this.store.get().subscribe(
            () => { // next()
                this.todos = this.store.todos;
            }
        );
    }

    public insertTodo(event: any): void {
        let todo: Todo = event.todo;

        this.store.insert(todo).subscribe(
            () => { // next()
                this.fetchTodos();
                // re-initialize newTodo
                this.newTodo = {
                    title: "",
                    completed: false
                };
            }
        );
    }

    public saveTodo(event: any): void {
        let todo: Todo = event.todo;
        let originalTodo: Todo = event.originalTodo;

        this.store[todo.title ? "put" : "delete"](todo).subscribe(
            () => { // next()
                this.fetchTodos();
            },
            () => { // error()
                todo.title = originalTodo.title;
            }
        );
    }

    public deleteTodo(event: any): void {
        let todo: Todo = event.todo;

        this.store.delete(todo).subscribe(
            () => { // next()
                this.fetchTodos();
            }
        );
    }

    public toggleTodo(event: any): void {
        let todo: Todo = event.todo;

            this.store.put(todo).subscribe(
            () => { // next()
                this.fetchTodos();
                // nothing to do on success
            },
            () => { // error()
                todo.completed = !todo.completed;
            }
        );
    }
}
