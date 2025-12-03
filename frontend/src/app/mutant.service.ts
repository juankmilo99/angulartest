import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MutantResponse {
  isMutant: boolean;
  message: string;
}

export interface MutantRequest {
  dna: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MutantService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  checkMutant(dna: string[]): Observable<MutantResponse> {
    return this.http.post<MutantResponse>(`${this.apiUrl}/mutant`, { dna });
  }

  getApiHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
}