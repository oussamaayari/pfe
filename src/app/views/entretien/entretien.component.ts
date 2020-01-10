import { Entretien } from '../../Model/Entretien';
import { EntretienService } from '../../Services/entretien.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.scss']
})
export class EntretienComponent implements OnInit {


  entretienform: FormGroup = new FormGroup({
    type_entr: new FormControl(null, Validators.required),
    lieu_entr: new FormControl(null, Validators.required),
    date_entr: new FormControl(null, Validators.required),
     // entretien_date: new FormControl(null, Validators.required)
  });
  constructor(private entretienService: EntretienService) { }

  ngOnInit() {
  }

  add() {

    console.log(this.entretienform.value);
    const entretien: Entretien = new Entretien();
    entretien.lieu_entr = this.entretienform.get(['lieu_entr']).value;
    entretien.type_entr =  this.entretienform.get(['type_entr']).value;
    entretien.date_entr =  this.entretienform.get(['date_entr']).value;
    console.log(entretien);
    this.entretienService.add(entretien).subscribe(data => {
      console.log(data.body);
    });
  }

}
