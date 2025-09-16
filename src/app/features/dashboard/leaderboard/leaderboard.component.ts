import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { DataService } from '../../../core/services/data.service';

// Import the UI components this component uses
import { CardComponent } from '../../../components/ui/card/card.component';
import { CardHeaderComponent } from '../../../components/ui/card/card-header/card-header.component';
import { CardTitleComponent } from '../../../components/ui/card/card-title/card-title.component';
import { CardContentComponent } from '../../../components/ui/card/card-content/card-content.component';
import { AvatarComponent } from '../../../components/ui/avatar/avatar.component';
import { BadgeComponent } from '../../../components/ui/badge/badge.component';

// Define a type for the leaderboard users for clarity
type LeaderboardUser = {
  id: string;
  name: string;
  points: number;
  avatar: string;
};

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    AvatarComponent,
    BadgeComponent
  ],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: LeaderboardUser[] = [];

  // Inject the DataService to fetch data
  constructor(private dataService: DataService) {}

  // ngOnInit is a lifecycle hook that runs once when the component is initialized
  ngOnInit(): void {
    this.leaderboard = this.dataService.getLeaderboard();
  }
}
