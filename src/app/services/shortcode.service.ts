import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShortcodeService {

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }

    getShortenURL(link) {
      let url = `https://api.shrtco.de/v2/shorten?url=${link}`; 
        return this.http
              .get(url)
              .pipe(catchError(this.processHTTPMsgService.handleError));
      } 
    getInfo(code) {
      let url = `https://api.shrtco.de/v2/info?code=${code}`;
      return this.http
              .get(url)
              .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    postShortenURL(link,res) {
      let url = `https://api.shrtco.de/v2/shorten?url=${link}`;
      return this.http.post(url,res)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
