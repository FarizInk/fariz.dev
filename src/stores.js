import { writable } from 'svelte/store';

export const spotifyToken = writable(null);
export const spotifyPhoto = writable(null);
export const spotifyName = writable(null);
export const spotifyNowPlaying = writable(false);
export const spotifySongStatus = writable(0);
export const spotifySongPhoto = writable(null);
export const spotifySongTitle = writable({
    name: null,
    url: null
});
export const spotifySongArtist = writable([]);