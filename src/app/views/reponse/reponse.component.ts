import { QuestionService } from './../../Services/question.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from '../../Model/Question';
import { ReponseService } from '../../Services/reponse.service';
import { Reponse } from '../../Model/Reponse';

@Component({
  selector: 'app-question',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.scss']
})
export class ReponseComponent implements OnInit {
  reponseform: FormGroup = new FormGroup({
    type_rep: new FormControl(null, Validators.required),
    desc_rep: new FormControl(null, Validators.required),
    sujet_rep: new FormControl(null, Validators.required),

  });
  constructor(private reponseService: ReponseService) { }

  ngOnInit() {
  }

  add() {

    console.log(this.reponseform.value);
    const reponse: Reponse = new Reponse();
    reponse.type_rep = this.reponseform.get(['type_rep']).value;
    reponse.desc_rep = this.reponseform.get(['desc_rep']).value;
    reponse.sujet_rep = this.reponseform.get(['sujet_rep']).value;
    console.log(reponse);
    this.reponseService.add(reponse).subscribe(data => {
      console.log(data.body);
    });
  }
}
