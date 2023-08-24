import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-conferma-cancellazione',
  templateUrl: './conferma-cancellazione.component.html',
  styleUrls: ['./conferma-cancellazione.component.scss']
})
export class ConfermaCancellazioneComponent {

  @Output() confermaEliminazione = new EventEmitter<any>();

  constructor(private ngxSmartModalService:NgxSmartModalService){

  }

  confermaCanc(){
    this.confermaEliminazione.emit();
    this.onClose();
  }

  onClose(){
    this.ngxSmartModalService.close("confCancellazione");
  }
}
