import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }
  getIpAddress() {
    return this.http
          .get('https://api.ipify.org/?format=json')
          .pipe(catchError(this.processHTTPMsgService.handleError));
  }   
}
