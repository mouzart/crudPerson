import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html'
})
export class CandidatesComponent {
  public _http: HttpClient;
  public _baseUrl: string;

  public candidates: Candidate[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;
    this.getCandidates();
  }

  public getCandidates() {
    this._http.get<Candidate[]>(this._baseUrl + 'api/candidates').subscribe(result => {
      this.candidates = result;
    }, error => console.error(error));
  }

  public delete(id: number) {
    this._http.delete<Candidate>(this._baseUrl + 'api/candidates/' + id).subscribe(result => {
      if (result.id) {
        alert("O candidato " + result.name + " foi deletado com sucesso!");
        this.getCandidates();
      }
    }, error => console.error(error));
  }

}

