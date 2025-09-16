import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    CommonModule, // Required for *ngIf and ngClass
    FeatherModule   // Required for the <i-feather> fallback icon
  ],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  // @Input() decorator marks a property as an input that can be set from a parent component
  @Input() src: string | null | undefined;
  @Input() alt: string = 'User Avatar'; // Default value if not provided
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() className: string = '';

  // This method returns the correct Tailwind CSS class based on the size input
  getSizeClasses(): string {
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    };
    return sizes[this.size];
  }
}
