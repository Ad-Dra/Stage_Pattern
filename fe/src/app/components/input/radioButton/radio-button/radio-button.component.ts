import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigService } from 'src/app/components/configService/config.service';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {

  @Input() formParent: any;
  @Input() formId: string='form';
  @Input() formField:string="";
  @Input() title: string="";
  @Input() readonly:boolean=false;
  @Input() required:boolean=false;
  @Input() items:any=[];
  @Output() action: EventEmitter<any>= new EventEmitter<any>();

  public titolo:string="";
  public submitted:boolean=false;
  
  constructor(public conf:ConfigService) { }

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

  changeItem(item:any){
    this.action.emit(item);
  }

}
