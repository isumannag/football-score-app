import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Country } from "../model/league-data.model";
import { StandingResponse } from '../model/standings.model';
import { FixtureResponse } from '../model/fixture.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeagueDataService {
    selectedCountry$ = new BehaviorSubject('England');
    
    headers: HttpHeaders = new HttpHeaders()
    .set('x-rapidapi-host', 'fsf')
    .set('x-rapidapi-key', 'fsfssf');
    // .set('x-rapidapi-host', 'v3.football.api-sports.io/')
    // .set('x-rapidapi-key', 'f75763cbfa3d6ba3b01304a55ee4f81b');

    constructor(private http: HttpClient) {}

    private countryList: Country[] = [
        {countryName: 'England', league: 39, selected: true},
        {countryName: 'Spain', league: 140, selected: false},
        {countryName: 'France', league: 61, selected: false},
        {countryName: 'Germany', league: 78, selected: false},
        {countryName: 'Italy', league: 135, selected: false}
    ];

    getCountryList: Function = () => this.countryList;

    getStandingData(id: number, season: number): Observable<StandingResponse> {
        console.log('service - dsd');
        /* return this.http.get(
            `https://v3.football.api-sports.io/standings?league=${id}&season=${season}`,
            { headers: this.headers }
        );*/
        return this.http.get('../assets/England.json');
    }

    getFixtureData(id: number, season: number, teamID: number): Observable<FixtureResponse> {
        console.log('service - fix data');
        return this.http.get(
          `https://v3.football.api-sports.io/fixtures?league=${id}&season=${season}&team=${teamID}`,
          { headers: this.headers }
        );
    }
}
