import { Component } from '@angular/core';
import { Stage } from '../stage/stage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements Stage{
  renew(newType: Stage): void {
    throw new Error('Method not implemented.');
  }

  ciao(){
    
  }

}
