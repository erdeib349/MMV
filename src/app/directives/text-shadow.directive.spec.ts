import { TextShadowDirective } from './text-shadow.directive';
import { ElementRef } from '@angular/core';

describe('TextShadowDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    const mockRenderer2 = jasmine.createSpyObj('Renderer2', ['setStyle']);
    const directive = new TextShadowDirective(mockElementRef, mockRenderer2);
    expect(directive).toBeTruthy();
  });
});
