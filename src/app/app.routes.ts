import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { JsonComponent } from './json/json.component';
import { ConvertComponent } from './convert/convert.component';
import { TextComponent } from './text/text.component';
import { TimeAndCurrencyComponent } from './time-and-currency/time-and-currency.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';

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
    },
    {
        path:"text",
        component: TextComponent
    },
    {
        path:"time-and-currency",
        component: TimeAndCurrencyComponent
    },
    {
        path: "stopwatch",
        component : StopwatchComponent
        
    }
];
