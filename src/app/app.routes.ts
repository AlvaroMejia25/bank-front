import { Routes } from '@angular/router';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomerSaveComponent } from './component/customersave/customersave.component'; // Importar CustomerSaveComponent

export const routes: Routes = [
    { path: 'customer-list', component: CustomerListComponent }, 
    { path: 'customersave', component: CustomerSaveComponent }, // Nueva ruta
    { path: '', redirectTo: '/customer-list', pathMatch: 'full' },
    { path: '', redirectTo: '/customersave', pathMatch: 'full' },
];
