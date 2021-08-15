import { Component, OnInit } from '@angular/core';
import { ShortcodeService } from '../services/shortcode.service';
import { SHORTENLINKS } from '../shared/shortens';
import { Shorten } from '../shared/shorten';
import { Result } from '../shared/result';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  input:any;
  output:any;
  errMess: string;
  link:any;
  shortenLink:any;
  originalLink:any;
  shorten: Shorten;
  LinksObject = SHORTENLINKS;
  isShorted:boolean = false;
  postedRes:any;
  Info:any;
  copiedLink:any;
  content:string;
  constructor(private shortcodeService: ShortcodeService,
    private clipboardApi: ClipboardService) { }

  ngOnInit() {
  }

  copytext() {
    this.copiedLink =document.getElementById('shortenLink');
    this.content = this.copiedLink.value;
    this.clipboardApi.copyFromContent(this.content);
  }
  onClick() {
    this.input = document.getElementById('shorten-input');
    this.link = this.input.value;
    console.log(this.link);
    this.shortcodeService.getShortenURL(this.link).subscribe(res => {
      this.shortenLink = res['result']['full_short_link2'];
      this.originalLink = res['result']['original_link'];
      this.shortcodeService.getInfo(res['result']['code']).subscribe(resInfo => {
        this.Info = resInfo;
        console.log(resInfo);
      },
      errmess => {this.errMess = <any>errmess;});
      console.log(res);
      this.isShorted= true;
    },
    errmess => {this.errMess = <any>errmess;});
    this.input.value = '';
  }
}
