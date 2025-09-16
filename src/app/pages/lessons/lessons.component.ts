import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { DataService } from '../../core/services/data.service';
import { LessonModule } from '../../core/models/type'; // Assuming your file is named 'type.ts'

// Import all the UI components this page uses
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { BadgeComponent } from '../../components/ui/badge/badge.component';

@Component({
  selector: 'app-lessons-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FeatherModule,
    CardComponent,
    CardContentComponent,
    ButtonComponent,
    BadgeComponent
  ],
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsPageComponent implements OnInit {
  allLessons: LessonModule[] = [];
  searchQuery = '';
  selectedCategory: string | null = null;
  selectedDifficulty: string | null = null;

  categories = [
    { id: 'grammar', label: 'Grammar' },
    { id: 'vocabulary', label: 'Vocabulary' },
    { id: 'pronunciation', label: 'Pronunciation' },
    { id: 'fluency', label: 'Fluency' },
    { id: 'cultural', label: 'Cultural' },
  ];

  difficulties = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.allLessons = this.dataService.getLessonModules();
  }

  // A getter that computes the filtered lessons based on current state
  get filteredLessons(): LessonModule[] {
    // No changes needed here, this logic is correct!
    return this.allLessons.filter(lesson => {
      const matchesSearch = this.searchQuery === '' ||
        lesson.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCategory = this.selectedCategory === null || lesson.category === this.selectedCategory;
      const matchesDifficulty = this.selectedDifficulty === null || lesson.difficulty === this.selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }

  // Method to clear all active filters
  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = null;
    this.selectedDifficulty = null;
  }

  // THIS IS THE FIX: The method is now empty.
  // The (ngModelChange) in the template will update the filter properties,
  // and the getter above will automatically handle the rest.
  onFilterChange(): void {
    // This function can remain empty. Its presence in the template
    // simply ensures Angular's change detection runs when a filter is changed.
  }

  gotolesson(lessonId: string): void {
     this.router.navigate(['lessons/', lessonId]);
  }
}
