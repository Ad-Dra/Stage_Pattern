import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/components/configService/config.service';


@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})

export class InputTextComponent implements OnInit {

  @Input() formParent: any;
  @Input() value?: any;
  @Input() formId: string='form';
  @Input() formField:string="";
  @Input() title: string="";
  @Input() readonly:boolean=false;
  @Input() required:boolean=false;
  @Input() maxLen:string='';
  @Input() minLen:string='';
  @Input() type:string='text';
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

  changeItem(ev:any){
    this.action.emit(ev);
  }

}
