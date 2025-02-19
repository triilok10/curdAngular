import { Routes } from '@angular/router';
import { ItemMasterComponent } from './Component/item-master/item-master.component';
import { TemplateformComponent } from './Component/templateform/templateform.component';

export const routes: Routes = [
    { path: "", component: ItemMasterComponent },
    {
        path: "templateForm", component: TemplateformComponent
    }
];
