import { Component } from '@angular/core';
import { ConvertorComponent } from "./components/convertor/convertor.component";

@Component({
  selector: 'app-root',
  imports: [ConvertorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rate-calculator-angular';
}
