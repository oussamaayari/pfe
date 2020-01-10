import { QuestionService } from './../../Services/question.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from '../../Model/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questionform: FormGroup = new FormGroup({
    type_ques: new FormControl(null, Validators.required),
    desc_ques: new FormControl(null, Validators.required),
    date_ques: new FormControl(null, Validators.required),

  });
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  add() {

    console.log(this.questionform.value);
    const question: Question = new Question();
    question.type_ques = this.questionform.get(['type_ques']).value;
    question.desc_ques = this.questionform.get(['desc_ques']).value;
    question.date_ques = this.questionform.get(['date_ques']).value;
    console.log(question);
    this.questionService.add(question).subscribe(data => {
      console.log(data.body);
    });
  }
}
