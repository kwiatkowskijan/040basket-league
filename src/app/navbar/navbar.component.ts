import { Component, inject } from '@angular/core';
import { RouterModule, RouterLink, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

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
      icon: 'emoji_events',
      label: 'Tournaments',
    },
    {
      route: '/players',
      icon: 'group',
      label: 'Players'
    }
  ];

  activatedTournamentNavItem = [
    {
      route: '/tournament',
      icon: 'emoji_events',
      label: 'Dashboard'
    }
  ];

  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  tournamentId!: string;

  constructor() { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.startsWith('/tournament/')) {
          const urlParts = event.urlAfterRedirects.split('/');
          this.tournamentId = urlParts[urlParts.length - 1];

          this.activatedTournamentNavItem = [
            {
              route: `/tournament/${this.tournamentId}`,
              icon: 'emoji_events',
              label: 'Dashboard'
            }
          ];
        }
      }
    });

    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.tournamentId = params['id'];
        console.log('Tournament ID from params:', this.tournamentId);
      }
    });
  }


  clearTournamentId() {
    this.tournamentId = '';
  }
}
