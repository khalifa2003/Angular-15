import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioElements: { [key: string]: HTMLAudioElement } = {};

  constructor() {}

  preloadAudio(key: string, src: string) {
    const audio = new Audio(src);
    this.audioElements[key] = audio;
  }

  playAudio(key: string) {
    const audio = this.audioElements[key];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    } else {
      console.warn(`Audio with key "${key}" not found.`);
    }
  }
}
