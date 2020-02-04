import { NgModule } from '@angular/core';
import { IntroComponent } from './components/intro/intro.component';
import { PublicRoutingModule } from './public.routing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        PublicRoutingModule,
        MatCardModule,
        MatButtonModule
    ],
    declarations: [
        IntroComponent
    ]
})
export class PublicModule { }
