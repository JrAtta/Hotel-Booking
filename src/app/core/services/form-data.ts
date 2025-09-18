import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormData {

  private formData:WritableSignal<any> = signal<any>(null);

  data = this.formData.asReadonly();

  setFormData(data:any){
    this.formData.set(data);
  }


  }
