import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { JsonComponent } from './json/json.component';
import { ConvertComponent } from './convert/convert.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'calculator',
        pathMatch: 'full'
    },
    {
        path: "calculator",
        component: CalculatorComponent
    },
    {
        path: "json",
        component: JsonComponent
    },
    {
        path:"converter",
        component: ConvertComponent
    }
];
