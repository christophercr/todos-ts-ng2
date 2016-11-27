"use strict";

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {Todo} from "./todo.intf";
import {Observable} from "rxjs/Observable";
import {empty} from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class StoreService {
    public http: Http;

    public todos: Todo[];

    public constructor(http: Http) {
        this.http = http;

        this.todos = [];
    }

    public clearCompleted(): Observable<any> {
        let incompleteTodos: Todo[] = this.todos.filter((todo: Todo) => {
            return !todo.completed;
        });

        return this.http.delete("api/todos")
            .map((resp: Response) => {
                this.todos = [...incompleteTodos];
            })
            .catch((error: any) => {
                console.error("store: delete failed", error);
                return empty(); // catch() should always return an observable
            });
    };

    public delete(todo: Todo): Observable<any> {
        return this.http.delete("api/todos/" + todo.id)
            .map((resp: Response) => {
                let newTodos: Todo[] = [...this.todos];
                newTodos.splice(newTodos.indexOf(todo), 1);
                this.todos = newTodos;
            })
            .catch((error: any) => {
                console.error("store: delete failed", error);
                return empty(); // catch() should always return an observable
            });
    };

    public get(): Observable<any> {
        return this.http.get("api/todos")
            .map((resp: Response) => {
                this.todos = [...resp.json()];
            })
            .catch((error: any) => {
                console.error("store: get failed", error);
                return empty(); // catch() should always return an observable
            });
    };

    public insert(todo: Todo): Observable<any> {
        let originalTodos: Todo[] = this.todos.slice(0);

        return this.http.post("api/todos", todo)
            .map((resp: Response) => {
                todo.id = resp.json()["id"];
                this.todos = [...this.todos, todo];
            })
            .catch((error: any) => {
                console.error("store: insert failed", error);
                this.todos = [...originalTodos];
                return empty(); // catch() should always return an observable
            });
    };

    public put(todo: Todo): Observable<any> {
        return this.http.put("api/todos/" + todo.id, todo)
            .map((resp: Response) => {
                this.todos = [...this.todos];
            })
            .catch((error: any) => {
                console.error("store: put failed", error);
                return empty(); // catch() should always return an observable
            });
    };
}
