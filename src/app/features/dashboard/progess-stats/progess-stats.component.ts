import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { DataService } from '../../../core/services/data.service';
import { User } from '../../../core/models/type';

// 1. Import the specific icons you need from the library
import { Mic, BookOpen, Archive, Zap, Award } from 'angular-feather/icons';

// Import child components
import { CardComponent } from '../../../components/ui/card/card.component';
import { CardHeaderComponent } from '../../../components/ui/card/card-header/card-header.component';
import { CardTitleComponent } from '../../../components/ui/card/card-title/card-title.component';
import { CardContentComponent } from '../../../components/ui/card/card-content/card-content.component';
import { ProgressBarComponent } from '../../../pages/progess-bar/progess-bar.component';
import { AchievementBadgesComponent } from '../achievement-badges/achievement-badges.component';
// Ensure ProgressBarComponent is exported as standalone: true in its @Component decorator

// 2. Create a constant to hold the imported icons
const icons = {
  Mic,
  BookOpen,
  Archive,
  Zap,
  Award
};

@Component({
  selector: 'app-progress-stats',
  standalone: true,
  imports: [
    CommonModule,
    // 3. Import FeatherModule (icons should be configured in the app bootstrap or main module)
    FeatherModule,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardTitleComponent,
    ProgressBarComponent,
    AchievementBadgesComponent // Make sure ProgressBarComponent is standalone, otherwise import its module instead
  ],
  templateUrl: './progess-stats.component.html',
  styleUrls: ['./progess-stats.component.css']
})
export class ProgressStatsComponent implements OnInit {
  currentUser!: User;
  progressItems: { label: string; value: number; color: 'blue' | 'green' | 'orange' | 'purple'; }[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.currentUser = this.dataService.getCurrentUser();
    this.progressItems = [
      {
        label: 'Pronunciation',
        value: this.currentUser.progress.pronunciation,
        color: 'blue'
      },
      {
        label: 'Grammar',
        value: this.currentUser.progress.grammar,
        color: 'green'
      },
      {
        label: 'Vocabulary',
        value: this.currentUser.progress.vocabulary,
        color: 'orange'
      },
      {
        label: 'Fluency',
        value: this.currentUser.progress.fluency,
        color: 'purple'
      },
    ];
  }

  /**
   * Returns the name of the feather icon based on the skill label.
   */
  getIconName(label: string): string {
    switch (label.toLowerCase()) {
      case 'pronunciation': return 'mic';
      case 'grammar': return 'book-open';
      case 'vocabulary': return 'archive';
      case 'fluency': return 'zap';
      default: return 'award'; // A fallback icon
    }
  }

  /**
   * Returns the Tailwind CSS background color class for the icon container.
   */
  getIconBgColor(color: string): string {
    switch (color) {
      case 'blue': return 'bg-blue-100';
      case 'green': return 'bg-green-100';
      case 'orange': return 'bg-orange-100';
      case 'purple': return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  }

  /**
   * Returns the Tailwind CSS text color class for the icon and percentage.
   */
  getIconTextColor(color: string): string {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'green': return 'text-green-600';
      case 'orange': return 'text-orange-600';
      case 'purple': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  }
}

