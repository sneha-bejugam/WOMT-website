import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define a type for the variant for better type safety
export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule], // Needed for ngClass
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent {
  // @Input() allows these properties to be set from the parent component's template
  @Input() variant: BadgeVariant = 'default';
  @Input() className: string = '';

  // This method returns the appropriate Tailwind CSS classes based on the variant
  getVariantClasses(): string {
    const variants = {
      default: 'bg-blue-100 text-blue-800',
      secondary: 'bg-gray-100 text-gray-800',
      outline: 'bg-transparent border border-gray-300 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-orange-100 text-orange-800',
      danger: 'bg-red-100 text-red-800',
    };
    return variants[this.variant];
  }
}
