import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(
            [
                {path: 'register', component: RegisterComponent},
                {path: 'login', component: LoginComponent},
            ]
        )
    ]
})

export class AuthModule {}