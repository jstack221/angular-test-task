import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TasksComponent implements OnInit {
  @ViewChild('dataTheme') dataTheme: ElementRef;
  themes = ['light', 'dark'];
  selectedTheme = 'light';

  constructor() {}

  ngOnInit(): void {
  }

  themeChange(selectedTheme: string) {
    this.selectedTheme = selectedTheme;
  }
}
