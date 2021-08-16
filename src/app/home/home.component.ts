import { Component, OnInit } from '@angular/core';
import { ShortcodeService } from '../services/shortcode.service';
import { shortLinkArray } from '../shared/shortLinkArray';

import { IpAddressService } from '../services/ip-address.service';
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
  ipaddress:string;
  shortenLink:any;
  originalLink:any;
  LinksObject:any;
  isShorted:boolean = false;
  isClicked:boolean = false;
  postedRes:any;
  Info:any;
  copiedLink:any;
  content:string;
  shortLinkArray;
  constructor(private shortcodeService: ShortcodeService,
    private ipAdressService: IpAddressService) { }

  ngOnInit() {
    this.ipAdressService.getIpAddress().subscribe(res => {
      this.ipaddress = res['ip'];
      console.log(`${this.ipaddress}`);
    });
    this.shortLinkArray = this.shortcodeService.getRelativeContent(this.ipaddress);
  }

  // copytext() {
  //   this.copiedLink =document.getElementById('shortenLink');
  //   this.content = this.copiedLink.value;
  //   this.clipboardApi.copyFromContent(this.content);
  // }
  onClick() {
    this.input = document.getElementById('shorten-input');
    this.link = this.input.value;
    console.log(this.link);
    this.isClicked = true;
    this.shortcodeService.getShortenURL(this.link).subscribe(res => {
      this.isClicked = false;
      // this.shortenLink = res['result']['full_short_link2'];
      // this.originalLink = res['result']['original_link'];
      this.LinksObject = {
        'ip': this.ipaddress,
        'recived': res,
      };
      this.shortLinkArray.push(this.LinksObject);
      console.log(this.shortLinkArray);
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
