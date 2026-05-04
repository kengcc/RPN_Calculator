import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {
  CalculationHistoryItem,
  CalculatorApiService
} from './calculator-api.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent implements OnInit {
  expression = '2 3 +';
  result: number | null = null;
  error = '';
  loading = false;
  history: CalculationHistoryItem[] = [];

  readonly examples = [
    '2 3 +',
    '7 4 -',
    '6 5 *',
    '12 3 /',
    '2.5 1.25 +',
    '2 3 ^',
    '25 %',
    '5 !'
  ];

  constructor(
    private readonly calculatorApi: CalculatorApiService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  calculate(): void {
    this.loading = true;
    this.error = '';
    this.result = null;

    this.calculatorApi.calculate(this.expression).subscribe({
      next: (response) => {
        this.result = response.result;
        this.loading = false;
        this.changeDetector.detectChanges();
        this.loadHistory();
      },
      error: (response: HttpErrorResponse) => {
        this.error = response.error?.error || 'Unable to calculate expression.';
        this.loading = false;
        this.changeDetector.detectChanges();
        this.loadHistory();
      }
    });
  }

  useExample(example: string): void {
    this.expression = example;
  }

  clearHistory(): void {
    this.calculatorApi.clearHistory().subscribe(() => {
      this.history = [];
      this.changeDetector.detectChanges();
    });
  }

  private loadHistory(): void {
    this.calculatorApi.history().subscribe({
      next: (response) => {
        this.history = response.history;
        this.changeDetector.detectChanges();
      },
      error: () => {
        this.history = [];
        this.changeDetector.detectChanges();
      }
    });
  }
}
