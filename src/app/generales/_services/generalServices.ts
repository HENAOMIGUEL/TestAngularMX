import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GeneralServices {
  public apiURL = environment.apiURL;
  public auth_token = 'Bearer ' + localStorage.getItem('tokenscloud');

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
  * GET ALL CORPORATIVES
  */
  getAPIServiceCorporativos(): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: this.auth_token
    });
    return this.httpClient.get<HttpResponse<Object>>(this.apiURL + '/corporativos', { headers: httpHeaders });
  }


  /**
* GET CORPORATIVE DETAIL
*/
  getAPIServiceCorporativosDetail(id): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: this.auth_token
    });
    return this.httpClient.get<HttpResponse<Object>>(this.apiURL + '/corporativos/' + id, { headers: httpHeaders });
  }

  /**
* UPDATE CORPORATIVE INFO
*/
  updateCorporativosInfo(corporative): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: this.auth_token
    });
    return this.httpClient.put<HttpResponse<Object>>(this.apiURL + '/corporativos/' + corporative.id, corporative, { headers: httpHeaders });
  }

  /**
* CREATE CONTACT 
*/
  createContact(contact): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: this.auth_token
    });
    return this.httpClient.post<HttpResponse<Object>>(this.apiURL + '/contactos', contact, { headers: httpHeaders });
  }

  /**
* UPDATE CONTACT 
*/
  updateContact(contact, idContact): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: this.auth_token
    });
    return this.httpClient.put<HttpResponse<Object>>(this.apiURL + '/contactos/' + idContact, contact, { headers: httpHeaders });
  }

  /**
* DELETE CONTACT 
*/
  deleteContact(idContact): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: this.auth_token
    });
    return this.httpClient.delete<HttpResponse<Object>>(this.apiURL + '/contactos/' + idContact, { headers: httpHeaders });
  }


}
