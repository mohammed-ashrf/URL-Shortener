import { Component, OnInit } from '@angular/core';
import { ShortcodeService } from '../services/shortcode.service';
import { shortLinkArray } from '../shared/shortLinkArray';
import { IpAddressService } from '../services/ip-address.service';
import { visibility } from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    visibility(),
  ]
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
  popupVisible:boolean = false;
  svgVisible:boolean = true;
  postedRes:any;
  Info:any;
  copiedLink:any;
  content:string;
  theClipboard;
  shortLinkArray = shortLinkArray;
  shortlinkArrayCopy;
  shortLinksArray;
  local = window.localStorage;
  visibility = 'shown';
  constructor(private shortcodeService: ShortcodeService,
    private ipAdressService: IpAddressService) { }

  ngOnInit() {
    this.ipAdressService.getIpAddress().subscribe(res => {
      this.ipaddress = res['ip'];
      console.log(this.ipaddress);
      // this.shortLinkArray = this.shortcodeService.getRelativeContent(this.ipaddress);
    });
    if (window.localStorage.length === 0){
      console.log ('there is no link');
      window.localStorage.setItem('Placeholder','placeholder');
    }else {
      // let data = JSON.parse(localStorage.getItem("dataSource"));
      // console.log(data);
      // let keys = Object.keys(window.localStorage);
      // console.log(keys);
      // for (let key of keys) {
        // this.shortLinksArray = JSON.parse(window.localStorage.getItem(`${key}`));
        // }
      this.shortLinksArray = JSON.parse(window.localStorage.getItem('linksArray'));
      console.log(this.shortLinksArray);
      console.log(window.localStorage);
    }
  }

  hamburgerClick() {
    if(this.svgVisible == true) {
      this.popupVisible = true;
      this.svgVisible = false;
    }else {
      this.svgVisible = true;
      this.popupVisible = false;
    }
  }
  copytext(val) {
    let button= document.getElementById('shorten-button');
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    button.innerText = 'cobied!';
    button.style.backgroundColor = 'hsl(257, 27%, 26%)';
  }
  onClick() {
    this.input = document.getElementById('shorten-input');
    this.link = this.input.value;
    console.log(this.link);
    this.isClicked = true;
    var count = localStorage.getItem("count")==null?1:localStorage.getItem("count");
    count=Number(count)+1;
    count.toString;
    localStorage.setItem("count", JSON.stringify(count));
    this.shortcodeService.getShortenURL(this.link).subscribe(res => {
      // window.localStorage.setItem('dataSource',JSON.stringify(res));
      this.isClicked = false;
      this.shortenLink = res['result']['full_short_link2'];
      this.originalLink = res['result']['original_link'];
      this.LinksObject = {
        'ip': this.ipaddress,
        'recived': res,
      };
      this.shortlinkArrayCopy = this.shortLinkArray;
      this.shortlinkArrayCopy.push(this.LinksObject);
      window.localStorage.setItem('linksArray',JSON.stringify(this.shortlinkArrayCopy));
      // window.localStorage.setItem(`link${this.counter}`,JSON.stringify(res));
      // console.log(this.shortLinkArray);
      this.shortcodeService.getInfo(res['result']['code']).subscribe(resInfo => {
        this.Info = resInfo;
        // console.log(resInfo);
      },
      errmess => {this.errMess = <any>errmess;});
      // console.log(res);
      this.isShorted= true;
    },
    errmess => {this.errMess = <any>errmess;});
    this.input.value = '';
  }
}
