import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CalculatorComponent } from './calculator.component';
import { CalculatorApiService } from './calculator-api.service';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let api: jasmine.SpyObj<CalculatorApiService>;

  beforeEach(async () => {
    api = jasmine.createSpyObj<CalculatorApiService>('CalculatorApiService', [
      'calculate',
      'history',
      'clearHistory'
    ]);
    api.history.and.returnValue(of({ history: [] }));
    api.clearHistory.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        { provide: CalculatorApiService, useValue: api }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('displays calculation results', () => {
    api.calculate.and.returnValue(of({ expression: '2 3 +', result: 5 }));

    component.expression = '2 3 +';
    component.calculate();

    expect(component.result).toBe(5);
    expect(component.error).toBe('');
  });

  it('displays calculation errors', () => {
    api.calculate.and.returnValue(throwError(() => ({
      error: { error: 'Operator "+" requires two operands.' }
    })));

    component.expression = '2 +';
    component.calculate();

    expect(component.result).toBeNull();
    expect(component.error).toContain('requires two operands');
  });

  it('loads history', () => {
    api.history.and.returnValue(of({
      history: [
        {
          _id: '1',
          expression: '5 !',
          result: 120,
          status: 'success',
          errorMessage: null,
          createdAt: '2026-05-04T00:00:00.000Z'
        }
      ]
    }));

    component.ngOnInit();

    expect(component.history.length).toBe(1);
  });
});
