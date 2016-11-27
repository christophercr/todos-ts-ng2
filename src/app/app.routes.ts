import {Routes, RouterModule} from "@angular/router";

// import {DataResolver} from "./app.resolver";
import {TodosPageComponent} from "./modules/todo/pages/todosPage";


export const ROUTES: Routes = [
    {path: "", component: TodosPageComponent}
];
