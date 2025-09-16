import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { DataService } from '../../../core/services/data.service';
import { Lesson } from '../../../core/models/type';

// Import the UI components this component uses
import { CardComponent } from '../../../components/ui/card/card.component';
import { CardHeaderComponent } from '../../../components/ui/card/card-header/card-header.component';
import { CardTitleComponent } from '../../../components/ui/card/card-title/card-title.component';
import { CardContentComponent } from '../../../components/ui/card/card-content/card-content.component';
import { BadgeComponent, BadgeVariant } from '../../../components/ui/badge/badge.component';
import { ButtonComponent } from '../../../components/ui/button/button.component';

// Define a type for the category badge information
type CategoryInfo = {
  label: string;
  variant: BadgeVariant;
};

@Component({
  selector: 'app-recent-lessons',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    BadgeComponent,
    ButtonComponent
  ],
  templateUrl: './recent-lessons.component.html',
  styleUrls: ['./recent-lessons.component.css']
})
export class RecentLessonsComponent implements OnInit {
  recentLessons: Lesson[] = [];

  // Inject the DataService and Angular's Router
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.recentLessons = this.dataService.getRecentLessons();
  }

  // Method to navigate to the full lessons page
  viewAllLessons(): void {
    this.router.navigate(['/lessons']);
  }

  // Helper method to get the correct badge style and text
  getCategoryBadgeInfo(category: string): CategoryInfo {
    const categories: Record<string, CategoryInfo> = {
      pronunciation: { label: 'Pronunciation', variant: 'default' },
      grammar: { label: 'Grammar', variant: 'secondary' },
      vocabulary: { label: 'Vocabulary', variant: 'warning' },
      fluency: { label: 'Fluency', variant: 'success' },
      cultural: { label: 'Cultural', variant: 'outline' },
    };
    return categories[category] || { label: category, variant: 'default' };
  }
}
