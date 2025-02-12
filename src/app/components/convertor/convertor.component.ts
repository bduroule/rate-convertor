import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectConvertorFixedRate, selectConvertorHistory, selectConvertorRate } from '../../store/conertor.selector';
import { resetFixedRate, setFixedRate, setHistory } from '../../store/convertor.action.';
import { combineLatestWith, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-convertor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './convertor.component.html',
  styleUrl: './convertor.component.css'
})
export class ConvertorComponent {
  rate$: any;
  fixedRate$: any;
  history$: any;
  amount: any =  new FormControl(1);
  converted: any = new FormControl(0);
  currencyFrom: string = 'EUR'
  curencyTo: string = 'USD'

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.rate$ = this.store.select(selectConvertorRate);
    this.fixedRate$ = this.store.select(selectConvertorFixedRate);
    this.history$ = this.store.select(selectConvertorHistory);
  }

  public convert() {
    this.rate$.subscribe((rate: number) => {
      const amountValue = this.amount.value || 0;

      this.converted.setValue(
        this.currencyFrom === 'EUR' ? amountValue * rate : amountValue / rate,
        { emitEvent: false }
      );
    })

    this.rate$.pipe(
      combineLatestWith(this.fixedRate$),
      take(1)
    ).subscribe(([rate, fixedRate]: [number, number]) => {
      const value = { from: this.currencyFrom, to: this.curencyTo, amount: this.amount.value, converted: this.converted.value, rate: rate, fixed: fixedRate }

      this.store.dispatch(setHistory({ value }))
    });
  }

  public switch() {
    [this.currencyFrom, this.curencyTo] = [this.curencyTo, this.currencyFrom];

    const newAmount = this.converted.value;
    const newConverted = this.amount.value;

    this.amount.setValue(newAmount, { emitEvent: false })
    this.converted.setValue(newConverted, { emitEvent: false })

  }

  public setFixedRate() {
    this.rate$.pipe(take(1)).subscribe((rate: number) => this.store.dispatch(setFixedRate({ rate })));
  }

  public resetFixedRate() {
    this.store.dispatch(resetFixedRate());
  }
}
