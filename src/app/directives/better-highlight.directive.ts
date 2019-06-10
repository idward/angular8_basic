import {
  Directive,
  Renderer2,
  ElementRef,
  OnInit,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string;
  @Input() highlightColor: string;
  @HostBinding('style.background') bc: string = this.defaultColor;

  constructor(private elementRef: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    // this.render.setStyle(this.elementRef.nativeElement, 'background', this.defaultColor);
  }

  @HostListener('mouseenter')
  onmouseover(data: Event) {
    // this.render.setStyle(this.elementRef.nativeElement, 'background', 'green');
    this.bc = this.highlightColor;
  }

  @HostListener('mouseleave')
  onmouseleave() {
    // this.render.setStyle(this.elementRef.nativeElement, 'background', 'red');
    this.bc = this.defaultColor;
  }
}
