import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';

interface Styles {
  fontSize?: string;
  backgroundColor?: string;
  margin?: string;
}

@Component({
  selector: 'ng-rating-bar',
  templateUrl: './ng-rating-bar.component.html',
  styleUrls: ['./ng-rating-bar.component.scss']
})
export class NgRatingBarComponent implements OnInit, OnChanges {
  @Input() ratingCount: number;
  @Input() colorActive: string;
  @Input() colorDefault: string;
  @Input() disabled: boolean;
  @Input() resetAble: boolean;

  @Input() control: FormControl;

  @Input() styles: Styles;

  @Input() value: number;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() hoverChange: EventEmitter<number> = new EventEmitter<number>();

  numbers: any = [];
  hoverIndex = -1;
  selectedValue = 0;
  halfValue = 0;
  halfIndex = -1;
  isHovered = false;
  constructor() {}

  ngOnInit() {
    this.ratingCount = this.ratingCount || 5;
    this.colorActive = this.colorActive || '#edb867';
    this.colorDefault = this.colorDefault || '#d2d2d2';


    if (!this.styles) {
      this.styles = {
        fontSize: '28px',
        backgroundColor: '',
        margin: '5px'
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value || this.control) {
      this.initNumbers();
      this.calculateHalfValue();
    }
  }

  initNumbers() {
    this.numbers = Array(this.ratingCount)
      .fill(0)
      .map((x, i) => i);
    if (this.control) {
      this.selectedValue = this.control.value;
    } else {
      this.selectedValue = this.value;
    }

    this.hoverIndex = this.selectedValue - 1;
  }

  enter(i: number) {
    if (this.disabled) {
      return;
    }
    this.isHovered = true;
    this.hoverIndex = i;
    this.hoverChange.emit(1 + i);


  }
  leave(i: number) {
    if (this.disabled) {
      return;
    }
    this.isHovered = false;
    this.hoverIndex = this.selectedValue - 1;
  }

  setSelected(i: number) {
    if (this.disabled) {
      return;
    }

    // set/unset  selected value on same value click
    if (this.resetAble && this.selectedValue === i + 1) {
      this.selectedValue = 0;
    } else {
      this.selectedValue = i + 1;
    }

    if (this.control) {
      this.control.setValue(this.selectedValue || null);
      this.control.markAsTouched();
    } else {
      this.valueChange.emit(this.selectedValue);
    }
    this.isHovered = false;
    this.calculateHalfValue();
  }

  calculateHalfValue() {
    this.halfValue = Math.round(100 * (this.selectedValue - Math.floor(this.selectedValue)) );
    this.halfIndex = Math.ceil(this.selectedValue) - 1;
  }

}
