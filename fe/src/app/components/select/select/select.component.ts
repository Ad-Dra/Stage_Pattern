import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigService } from '../../configService/config.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() formParent: any;
  @Input() bindValue:string="";
  @Input() bindLabel:string="";
  @Input() bindLabel2:string="";
  @Input() formId: string='form';
  @Input() formField:string="";
  @Input() title: string="";
  @Input() readonly:boolean=false;
  @Input() required:boolean=false;
  @Input() maxLen:string='';
  @Input() minLen:string='';
  @Input() items:any=[];
  @Output() action: EventEmitter<any>= new EventEmitter<any>();

  public titolo:string="";

  public submitted:boolean=false;

  constructor(public conf:ConfigService) { 
  }

  ngOnInit(): void {
    let form=document.getElementById(this.formId);

    if(this.required==true)
      this.titolo=this.conf.getLable(this.title)+'*';
    else
      this.titolo=this.conf.getLable(this.title);

    form?.addEventListener('build', (()=>{
      this.submitted=true;
    }),false)
    
    this.formParent.valueChanges.subscribe(()=>{
      this.submitted=true;
    })
  }

  change(ev:any){
    this.action.emit(ev);
  }
}
