import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  elements: string[];
  inputText: string;

  constructor() {
    this.inputText = '';
    this.elements = [];
  }

  ngOnInit(): void {
  }

  inputToArray(): void {
    this.elements.push(this.inputText);
    this.inputText = '';
  }

  remove(index: number): void {
    this.elements.splice(index, 1);
    console.log("remove " + index)
  }

}
