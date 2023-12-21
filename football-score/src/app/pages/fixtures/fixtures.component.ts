import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeagueDataService } from '../../services/league-data.service';
import { FixtureResponse, FixturesList } from '../../model/fixture.model';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.scss',
})
export class FixtureComponent implements OnInit {
  time = new Date();
  errMsg: string = '';
  loadingText: string = 'Loading...'
  fixtureResponse: FixtureResponse | undefined;
  cachedData: string | null = null;
  cachedId: string = '';
  fixturesList: FixturesList[] | undefined;
  selectedleague: number | undefined;
  selectedSeason: number | undefined;
  selectedId: number | undefined;

  constructor( private leagueDataService: LeagueDataService, 
               private actRoute: ActivatedRoute, 
               private router: Router) {}

  ngOnInit(): void {
    this.selectedleague = this.actRoute.snapshot.queryParams['leagueId'];
    this.selectedSeason = this.actRoute.snapshot.queryParams['season'];
    this.selectedId = this.actRoute.snapshot.queryParams['id'];
    this.cachedId = ''+ this.selectedleague + this.selectedSeason + this.selectedId;

    const currentTime = this.time.getTime() + this.time.getTimezoneOffset() * 60000;
    this.cachedData = localStorage.getItem(this.cachedId);

    if ( this.selectedleague && this.selectedSeason && this.selectedId && this.cachedData === null) {
      this.loadingText = 'Loading...';

      this.leagueDataService.getFixtureData(this.selectedleague, this.selectedSeason, this.selectedId)
        .subscribe(
          data => {
            if (data !== undefined && data.errors?.length === 0 ) {
                localStorage.setItem(this.cachedId, JSON.stringify(data));
                this.fixtureResponse = data;
                this.dataParse(false, currentTime);
                console.log('Fixture Response: ', this.fixtureResponse);
            } else {
                this.loadingText = 'No Data found from Server!';
                this.fixturesList = undefined;
            }
          },
          error => this.loadingText = 'No Data found from Server!'
        );
    } else {
        this.dataParse(true, currentTime);
    }
  }

  dataParse(cached: boolean, currentTime: number): void{
    cached ? this.fixtureResponse = JSON.parse(this.cachedData || '[]') : '';

    if (this.fixtureResponse !== undefined && this.fixtureResponse.errors?.length === 0) {
      this.fixturesList = this.fixtureResponse.response?.filter((val: any) => {
        const fixtureDate = val.fixture?.timestamp;
        if (fixtureDate !== undefined && currentTime / 1000 >= fixtureDate) {
          return val.fixture;
        }
      });
      this.fixturesList = this.fixturesList?.sort((a, b) => {
        if (a.fixture?.timestamp !== undefined && b.fixture?.timestamp !== undefined ) {
          return b.fixture?.timestamp - a.fixture?.timestamp;
        }
        return 0;
      });
    }
  }

  backButton(): void {
    this.router.navigate(['/']);
  }
}
