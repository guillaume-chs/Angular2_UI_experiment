import { Component, Input } from '@angular/core';
var module: any;

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styles: [`
        nav {
            margin-bottom: 15px;
        }
        .nav-wrapper {
            margin-right: 15px;
            margin-left: 15px;
        }
    `]
})
export class NavbarComponent {
}
