import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {

  constructor( private http: HttpClient) { }

  getQuery (query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCgLbmr2c83qODV0wTZCyRe_pXmUM8g8xTA8o2qYeoDali2LFqSa1aZkMYCMk-xAy2QL0okW2XWQn0FO0fT3Ppm1Nq2guFE_unjYH1tkkCt-XryGKfbfqCOekyZF3VyoPJSGJilFQ'
    });
    return this.http.get(url, {headers});
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe( map( data => data['albums'].items));
  }

  getArtists( termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe( map( data => {
      return data['artists'].items;
    }));
  }
  getArtist( id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe( map( data => {
    //   return data['artists'].items;
    // }));
  }
  getTopTracks( id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe( map( data => {
      return data['tracks'];
    }));
  }
}
