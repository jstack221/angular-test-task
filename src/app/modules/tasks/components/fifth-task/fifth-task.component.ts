import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-fifth-task',
  templateUrl: './fifth-task.component.html',
  styleUrls: ['./fifth-task.component.scss']
})
export class FifthTaskComponent implements OnInit {
  @Input('themes') themes : string[];
  @Output() themeChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onHandleChange($event: Event) {
    this.themeChange.emit(($event.target as HTMLInputElement).value);
  }
}
