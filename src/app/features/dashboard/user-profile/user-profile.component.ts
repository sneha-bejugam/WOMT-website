import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { DataService } from '../../../core/services/data.service';
import { User } from '../../../core/models/type';

// Import the UI components this component uses
import { CardComponent } from '../../../components/ui/card/card.component';
import { CardContentComponent } from '../../../components/ui/card/card-content/card-content.component';
import { AvatarComponent } from '../../../components/ui/avatar/avatar.component';
import { ProgressBarComponent } from '../../../pages/progess-bar/progess-bar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    CardComponent,
    CardContentComponent,
    AvatarComponent,
    ProgressBarComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser!: User;
  nextLevelXP: number = 0;
  xpProgress: number = 0;

  // Inject the DataService to fetch data
  constructor(private dataService: DataService) {}

  // ngOnInit is a lifecycle hook that runs once when the component is initialized
  ngOnInit(): void {
    this.currentUser = this.dataService.getCurrentUser();
    this.calculateXP();
  }

  // Calculates the user's progress towards the next level
  private calculateXP(): void {
    if (!this.currentUser) return;

    const currentLevelXP = this.currentUser.level * 1000;
    this.nextLevelXP = (this.currentUser.level + 1) * 1000;
    
    const progress = this.currentUser.points - currentLevelXP;
    const required = this.nextLevelXP - currentLevelXP;
    
    this.xpProgress = (progress / required) * 100;
  }
}
