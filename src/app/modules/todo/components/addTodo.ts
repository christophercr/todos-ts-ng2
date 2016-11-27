"use strict";

import {Component, Input, Output, OnChanges, SimpleChanges, EventEmitter} from "@angular/core";
import {Todo} from "../services/todo.intf";

@Component({
    selector: "add-todo",
    templateUrl: "./addTodo.html"
})
export class AddTodoComponent implements OnChanges {

    @Input()
    public newTodo: Todo;
    @Output()
    public onInsert: EventEmitter<any> = new EventEmitter();

    public saving: boolean;

    public constructor() {
        // ...
    }

    public ngOnChanges(changes: SimpleChanges): void {
        console.log("--------AddTodoComponent", changes);
        if (changes["newTodo"]) {
            this.newTodo = changes["newTodo"].currentValue;
        }
    }

    public addTodo(): void {
        this.newTodo.title.trim();

        if (!this.newTodo.title) {
            return;
        }

        this.saving = true;

        this.onInsert.emit({
            todo: this.newTodo
        });

        this.saving = false;
    }
}
