import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CalculationResponse {
  expression: string;
  result: number;
}

export interface CalculationHistoryItem {
  _id: string;
  expression: string;
  result: number | null;
  status: 'success' | 'error';
  errorMessage: string | null;
  createdAt: string;
}

export interface CalculationHistoryResponse {
  history: CalculationHistoryItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorApiService {
  constructor(private readonly http: HttpClient) {}

  calculate(expression: string): Observable<CalculationResponse> {
    return this.http.post<CalculationResponse>(`${environment.apiBaseUrl}/calculate`, {
      expression
    });
  }

  history(): Observable<CalculationHistoryResponse> {
    return this.http.get<CalculationHistoryResponse>(`${environment.apiBaseUrl}/history`);
  }

  clearHistory(): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/history`);
  }
}
