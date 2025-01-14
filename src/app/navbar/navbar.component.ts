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
      isActive: false
    },
    {
      route: '/tournaments',
      icon: 'emoji_events',
      label: 'Tournaments',
      isActive: false
    },
    {
      route: '/team',
      icon: 'group',
      label: 'Teams',
      isActive: false
    },
  ]
}
