import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Country, StandingResponse } from '../model/standings.model';
import { FixtureResponse } from '../model/fixture.model';
import { Observable, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeagueDataService {
    constructor(private http: HttpClient) {}

    private standingTableHeaders = ['','','Name','W','L','D','Goal Difference','Points'];
    private countryList: Country[] = [
        {countryName: 'England', league: 39},
        {countryName: 'Spain', league: 140},
        {countryName: 'France', league: 61},
        {countryName: 'Germany', league: 78},
        {countryName: 'Italy', league: 135}
    ];
    getsStandingTableHeaders: Function = (): string[] => this.standingTableHeaders;
    getCountryList: Function = (): Country[] => this.countryList;
    getleagueId(countryName: string){
        return this.countryList.filter((item) => countryName === item.countryName)[0];
    }

    private headers: HttpHeaders = new HttpHeaders()
    .set('x-rapidapi-host', 'fsf')
    .set('x-rapidapi-key', 'fsfssf');
    // .set('x-rapidapi-host', 'v3.football.api-sports.io/')
    // .set('x-rapidapi-key', 'f75763cbfa3d6ba3b01304a55ee4f81b');

    getStandingData(id: number, season: number): Observable<StandingResponse> {
        /* return this.http.get<StandingResponse>(
            `https://v3.football.api-sports.io/standings?league=${id}&season=${season}`,
            { headers: this.headers }
        );*/
        return this.http.get<StandingResponse>('../assets/England.json').pipe(delay(2000));
    }

    getFixtureData(id: number, season: number, teamID: number): Observable<FixtureResponse> {
        /* return this.http.get(
          `https://v3.football.api-sports.io/fixtures?league=${id}&season=${season}&team=${teamID}`,
          { headers: this.headers }
        ); */
        return this.http.get('../assets/Fixtures.json').pipe(delay(2000));
    }
}
