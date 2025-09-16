import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define types for the inputs for better type safety
export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarColor = 'blue' | 'green' | 'orange' | 'purple';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule], // Needed for *ngIf, [ngClass], and [style.width]
  template: `
    <div class="w-full" [ngClass]="className">
      <!-- Label and Value: Only rendered if a 'label' is provided -->
      <div *ngIf="label" class="flex justify-between items-center mb-1">
        <span class="text-sm font-medium text-gray-700">{{ label }}</span>
        <!-- Value percentage: Only shown if 'showValue' is true -->
        <span *ngIf="showValue" class="text-sm font-medium text-gray-500">{{ value }}%</span>
      </div>

      <!-- Progress Bar Container -->
      <div class="w-full bg-gray-200 rounded-full" [ngClass]="getContainerClasses()">
        <!-- Inner Progress Bar -->
        <div
          class="rounded-full"
          [ngClass]="getBarClasses()"
          [style.width.%]="percentage"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    /*
      Component-specific styles can go here.
      All styling for this component is currently handled by Tailwind CSS classes in the template.
    */
  `]
})
export class ProgressBarComponent {
  // Define the inputs that can be passed to this component
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() label?: string;
  @Input() showValue: boolean = true;
  @Input() size: ProgressBarSize = 'md';
  @Input() color: ProgressBarColor = 'blue';
  @Input() className: string = '';

  // Calculates the percentage value for the progress bar's width
  get percentage(): number {
    // Ensure the value is between 0 and 100
    return Math.min(Math.max(0, (this.value / this.max) * 100), 100);
  }

  // Returns the appropriate Tailwind CSS classes based on the inputs
  getContainerClasses(): string {
    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };
    return sizes[this.size];
  }

  getBarClasses(): string {
    const colors = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      orange: 'bg-orange-500',
      purple: 'bg-purple-600',
    };
    // Combines the color and size classes for the inner bar
    return `${colors[this.color]} ${this.getContainerClasses()}`;
  }
}
