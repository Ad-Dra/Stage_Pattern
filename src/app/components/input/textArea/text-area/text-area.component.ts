import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigService } from 'src/app/components/configService/config.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit {

  @Input() formParent: any;
  @Input() formId: string='form';
  @Input() formField:string="";
  @Input() rows:Number=8;
  @Input() cols:Number=50;
  @Input() title: string="";
  @Input() readonly:boolean=false;
  @Input() required:boolean=false;
  @Input() maxLen:string='';
  @Input() minLen:string='';
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
