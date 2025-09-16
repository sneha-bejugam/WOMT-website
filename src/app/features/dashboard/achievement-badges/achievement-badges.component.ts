import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { User, Badge } from '../../../core/models/type';
import { DataService } from '../../../core/services/data.service';

// Import the UI components this component uses
import { CardComponent } from '../../../components/ui/card/card.component';
import { CardHeaderComponent } from '../../../components/ui/card/card-header/card-header.component';
import { CardTitleComponent } from '../../../components/ui/card/card-title/card-title.component';
import { CardContentComponent } from '../../../components/ui/card/card-content/card-content.component';

@Component({
  selector: 'app-achievement-badges',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent
  ],
  templateUrl: './achievement-badges.component.html',
  styleUrls: ['./achievement-badges.component.css']
})
export class AchievementBadgesComponent implements OnInit {
  badges: Badge[] = [];

  // Inject the DataService to fetch data
  constructor(private dataService: DataService) {}

  // ngOnInit is a lifecycle hook that runs once when the component is initialized
  ngOnInit(): void {
    const currentUser = this.dataService.getCurrentUser();
    this.badges = currentUser.badges;
  }
}