import { Routes } from '@angular/router';
import { ItemMasterComponent } from './Component/item-master/item-master.component';
import { TemplateformComponent } from './Component/templateform/templateform.component';
import { GetListComponent } from './Component/get-list/get-list.component';
import { PostAPIComponent } from './Component/post-api/post-api.component';

export const routes: Routes = [
    { path: "", component: ItemMasterComponent },
    {
        path: "templateForm", component: TemplateformComponent
    },
    {
        path: "reactiveForm", component: TemplateformComponent
    },
    {
        path: "GetList", component: GetListComponent
    },
    {
        path:"PostAPI", component: PostAPIComponent
    }
];
