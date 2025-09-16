import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() fullWidth: boolean = false;
  @Input() className: string = '';
  @Input() routerLink: string | any[] | null | undefined;
  @Input() disabled: boolean = false;

  getButtonClasses(): string {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none no-underline';
    
    const variants = {
      primary: 'bg-[#0993B2] text-white hover:bg-[#077d96]',
      secondary: 'bg-[#BFDBFE] text-[#1E40AF] hover:bg-[#93C5FD]',
      outline: 'bg-[#EBF5FF] text-[#1E40AF] hover:bg-[#DBEAFE] border border-[#1E40AF]',
      ghost: 'bg-transparent hover:bg-gray-100',
      link: 'bg-transparent underline-offset-4 hover:underline text-blue-600'
    };
    
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-11 px-6 text-lg'
    };
    
    const widthClass = this.fullWidth ? 'w-full' : '';
    const variantClass = variants[this.variant];
    const sizeClass = sizes[this.size];
    
    return `${baseStyles} ${variantClass} ${sizeClass} ${widthClass} ${this.className}`.trim();
  }
}