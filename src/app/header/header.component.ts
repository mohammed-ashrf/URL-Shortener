import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private homeComponent:HomeComponent) { }

  toggleVeiw() {
    if(this.homeComponent.svgVisible == true) {
      this.homeComponent.popupVisible = true;
      this.homeComponent.svgVisible = false;
    }else {
      this.homeComponent.svgVisible = true;
      this.homeComponent.popupVisible = false;
    }
  } 

  ngOnInit() {
  }

}
