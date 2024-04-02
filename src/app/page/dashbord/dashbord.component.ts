import { Component } from '@angular/core';
import { NavComponent } from "../../common/nav/nav.component";

@Component({
    selector: 'app-dashbord',
    standalone: true,
    templateUrl: './dashbord.component.html',
    styleUrl: './dashbord.component.css',
    imports: [NavComponent]
})
export class DashbordComponent {

}