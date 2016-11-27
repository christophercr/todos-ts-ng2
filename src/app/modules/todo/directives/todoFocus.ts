"use strict";

import {Directive, Input, ElementRef, OnInit, OnChanges, SimpleChanges} from "@angular/core";

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true
 */
@Directive({
    selector: "[todoFocus]"
})
export class TodoFocusDirective implements OnInit, OnChanges {

    @Input("todoFocus")
    public isCurrentTodo: Boolean;

    public elem: HTMLInputElement;

    public constructor(elem: ElementRef) {
        this.elem = elem.nativeElement;
    }

    public ngOnInit() {
        console.log("todoFocus directive loaded");
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes["isCurrentTodo"] && changes["isCurrentTodo"].currentValue === true) {
            this.elem.focus();
        }
    }
}
