import { Component } from '@angular/core';
import { AudioService } from './services/audio.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular-15';
  constructor(private audioService: AudioService, private router: Router) {}

  ngOnInit() {
    this.audioService.preloadAudio('addToWishlist', 'assets/audio/add.mp3');
    this.audioService.preloadAudio(
      'removeFromWishlist',
      'assets/audio/remove.mp3'
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
