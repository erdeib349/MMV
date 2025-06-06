import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KosarComponent } from './pages/kosar/kosar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BerletComponent } from './pages/berlet/berlet.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard, publicGuard } from './shared/guards/auth.guard';
import { ProfileComponent } from './pages/profil/profile.component';

export const routes: Routes = [
    { path: "home", title: "MMV főoldal", component: HomeComponent },
    { path: "kosar", title: "Kosár", component: KosarComponent,canActivate: [authGuard] },
    { path: "berlet", title: "Bérlet", component: BerletComponent },
    { path: "login", title: "Bejelentkezés", component: LoginComponent,canActivate: [publicGuard] },
    {path: "signup", title: "Regisztráció", component: SignupComponent,canActivate: [publicGuard]},
    {path: "profile", title: "Profil", component: ProfileComponent,canActivate: [authGuard]},
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", title: "pageNotFound", component: PagenotfoundComponent },
];

