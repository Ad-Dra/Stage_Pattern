import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigService } from '../../configService/config.service';


@Component({
  selector: 'app-show-hide-psw',
  templateUrl: './show-hide-psw.component.html',
  styleUrls: ['./show-hide-psw.component.css']
})
export class ShowHidePswComponent implements OnInit {

  @Input() formParent: any;
  @Input() formId: string='form';
  @Input() formField:string="";
  @Input() title: string="";
  @Input() readonly:boolean=false;
  @Input() required:boolean=false;
  @Input() maxLen:string='';
  @Input() minLen:string='';

  public titolo:string="";

  public fieldTextType: any=false;

  @Output() action = new EventEmitter<string>();
  @Output() keyupEvent = new EventEmitter<any>();

  constructor(public conf:ConfigService) { }

  ngOnInit(): void {

    if(this.required==true)
      this.titolo=this.conf.getLable(this.title)+'*';
    else
      this.titolo=this.conf.getLable(this.title);
  }

  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
    this.action.emit(this.fieldTextType);
  }

  change(ev:any){
    this.keyupEvent.emit(ev);
  }
}
