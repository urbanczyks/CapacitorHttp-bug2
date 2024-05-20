import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  doPost(url: string, host:String, code:String) {
    const options: HttpOptions = {
      responseType: 'json',
      url,
      headers: {
        'Accept-Encoding': 'gzip',
        'content-type':'application/json'
      },
      data: {
        //This is a test data object to be tracked so try this or create your own!
        access_token: "super_secure",
        host: host,
        external_id: code
      },
    };
    return from(CapacitorHttp.post(options));
  }
}
