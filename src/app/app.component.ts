import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'my-first-app';
  selectedType: string = 'recipe';

  constructor() {}

  ngOnInit(): void {}

  onNavigate(feature: string) {
    this.selectedType = feature;
  }
}
