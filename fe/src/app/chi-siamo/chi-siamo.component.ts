import { Component } from '@angular/core';
import { Stage } from '../stage/stage';

@Component({
  selector: 'app-chi-siamo',
  templateUrl: './chi-siamo.component.html',
  styleUrls: ['./chi-siamo.component.scss']
})
export class ChiSiamoComponent implements Stage{


  
  renew(newType: Stage): void {
    throw new Error('Method not implemented.');
  }

}
