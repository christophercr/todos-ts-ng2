"use strict";

import {Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter} from "@angular/core";
import {Todo} from "../services/todo.intf";


@Component({
    selector: "todo-list",
    templateUrl: "./todoList.html"
})
export class TodoListComponent implements OnInit, OnChanges {

    @Input()
    public todos: Todo[];
    @Output()
    public onSave: EventEmitter<any> = new EventEmitter();
    @Output()
    public onDelete: EventEmitter<any> = new EventEmitter();
    @Output()
    public onToggle: EventEmitter<any> = new EventEmitter();

    public status: string;
    public filteredTodos: Todo[];

    public saveEvent: string;

    public originalTodo: Todo;
    public editedTodo: Todo;
    public reverted: boolean;

    public remainingCount: number;
    public completedCount: number;
    public allChecked: boolean;

    public constructor() {
        // ...
    }

    public ngOnInit(): void {
        this.status = "";
    }

    public ngOnChanges(changes: SimpleChanges): void {
        console.log("--------TodoListComponent", changes);
        if (changes["todos"]) {
            this.todos = changes["todos"].currentValue;

            this.remainingCount = this.todos.filter((todo: Todo) => todo.completed === false).length;
            this.completedCount = this.todos.length - this.remainingCount;
            this.allChecked = !this.remainingCount;

            this.showAll(this.status);
        }
    }

    public showAll(status: string): void {
        this.status = status || "";

        if (this.status === "active") {
            this.filteredTodos = this.todos.filter((todo: Todo) => todo.completed === false);
        } else if (status === "completed") {
            this.filteredTodos = this.todos.filter((todo: Todo) => todo.completed === true);
        } else {
            this.filteredTodos = [...this.todos];
        }
    }

    public editTodo(todo: Todo): void {
        this.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        this.originalTodo = Object.assign({}, todo);
    };

    public saveEdits(todo: Todo, event: string): void {
        // Blur events are automatically triggered after the form submit event.
        // This does some unfortunate logic handling to prevent saving twice.
        if (event === "blur" && this.saveEvent === "submit") {
            this.saveEvent = undefined;
            return;
        }

        this.saveEvent = event;

        if (this.reverted) {
            // Todo edits were reverted-- don't save.
            this.reverted = false;
            return;
        }

        todo.title = todo.title.trim();

        if (todo.title === this.originalTodo.title) {
            this.editedTodo = undefined;
            return;
        }

        this.onSave.emit({
            todo,
            originalTodo: this.originalTodo
        });

        this.editedTodo = undefined;
    };

    public revertEdits(event: any): void {
        let todo: Todo = event.todo;

        this.todos[this.todos.indexOf(todo)] = this.originalTodo;
        this.showAll(this.status);
        this.editedTodo = undefined;
        this.originalTodo = undefined;
        this.reverted = true;
    };

    public removeTodo(todo: Todo): void {
        this.onDelete.emit({
            todo: todo
        });
    };

    public toggleCompleted(todo: Todo, completed: boolean): void {
        if (typeof completed !== "undefined") {
            todo.completed = completed;
        }

        this.onToggle.emit({
            todo
        });
    };

    public clearCompletedTodos(): void {
        let todos: Todo[] = this.todos.slice(0);

        todos.forEach((todo: Todo) => {
            if (todo.completed) {
                this.removeTodo(todo);
            }
        });
    };

    public markAll(completed: boolean): void {
        this.todos.forEach((todo: Todo) => {
            if (todo.completed !== completed) {
                this.toggleCompleted(todo, completed);
            }
        });
    };
}
