import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navItems = [
    {
      route: '/',
      icon: 'home',
      label: 'Dashboard',
    },
    {
      route: '/tournaments',
      icon: 'emoji_events',
      label: 'Tournaments',
    },
    {
      route: '/team',
      icon: 'group',
      label: 'Teams',
    },
    {
      route: '/players',
      icon: 'group',
      label: 'Players'
    }
  ]
}
