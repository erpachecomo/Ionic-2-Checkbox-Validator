//import { CheckBoxValidator } from './../../validators/checkbox';
import { ShowDataPage } from './../show-data/show-data';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public interests: any={};

  public myForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {

    this.myForm = this.formBuilder.group({
      //se añade un control  de tipo formgroup (formgroup anidado) con los intereses dentro de este formgroup (que son controles)
      interests: this.formBuilder.group({
        otro: false,
        meca: false,
        tics: false
      }, {//Se añade el validator que retorna lo del metodo validateInterests (final de archivo)
        validator: (formGroup: FormGroup) => {
          return this.validateInterests(formGroup);
        }
      })
    });

    this.interests = this.myForm.controls['interests']
  }

  sendData() {
    let data = {
      interests: this.interests.value
    };
    console.log(data);
    this.navCtrl.push(ShowDataPage, data);

  }

  //Recorre los controles del formGroup
  private validateInterests(formGroup: FormGroup) {
  for (let key in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(key)) {
      let control: FormControl = <FormControl>formGroup.controls[key];
      if (control.value) {
        //Si el value del control es 'true' quiere decir que al menos uno esta seleccionado sino
        return null;
      }
    }
  }
  //retorna false
  return {
    validateInterests: {
      valid: false
    }
  };
}

}
