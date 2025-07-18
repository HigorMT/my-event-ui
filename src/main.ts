import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { routes } from './app.routes';



bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes), provideAnimations()]
}).catch((err) => console.error(err));
