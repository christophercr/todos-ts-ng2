"use strict";

import {Directive, Input, Output, ElementRef, OnInit, OnDestroy, EventEmitter} from "@angular/core";
import {Todo} from "../services/todo.intf";

/**
 * Directive that executes an expression when the element it is applied to gets an `escape` keydown event.
 */
@Directive({
    selector: "[todoEscape]"
})
export class TodoEscapeDirective implements OnInit, OnDestroy {

    @Input("todoEscape")
    public todo: Todo;

    @Output()
    public onEscape: EventEmitter<any> = new EventEmitter();

    public elem: HTMLInputElement;
    public eventListener: any;

    public constructor(elem: ElementRef) {
        this.elem = elem.nativeElement;
    }

    public ngOnInit() {
        console.log("todoEscape directive loaded");
        const ESCAPE_KEY: number = 27;

        this.eventListener = (event: KeyboardEvent) => {
            if (event.keyCode === ESCAPE_KEY) {
                this.onEscape.emit({
                    todo: this.todo
                });
            }
        };

        this.elem.addEventListener("keydown", this.eventListener);
    }

    public ngOnDestroy() {
        this.elem.removeEventListener("keydown", this.eventListener);
    }
}
