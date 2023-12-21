import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { LeagueDataService } from "../../services/league-data.service";
import { Subscription } from "rxjs";
import { LeagueArgs, LeagueName, StandingResponse, StandingTeams } from "../../model/standings.model";

@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrl: './standings.component.scss',
})
export class StandingComponent implements OnInit, OnDestroy {
    loadingText: string = 'Loading...';
    leagueId: number = 0;
    standingTableHeaders: string[] = [];
    currentYear: number = new Date().getFullYear();
    selectedCountry: string = '';
    leagueServiceSubscribe: Subscription  = new Subscription();
    standingsResponse: StandingResponse | undefined;
    cachedData: string | null = null;
    leagueName: LeagueName | undefined;
    leagueArgs: LeagueArgs | undefined;
    standingTeam: StandingTeams[] | undefined;

    constructor(private actRoute: ActivatedRoute,
                private leagueService: LeagueDataService) {}

    ngOnInit(): void {
        this.standingTableHeaders = this.leagueService.getsStandingTableHeaders();

        this.actRoute.params.subscribe( param => {
            this.selectedCountry = param['country'];
            this.leagueId = this.leagueService.getleagueId(this.selectedCountry).league;
            this.cachedData = localStorage.getItem('' + this.leagueId + this.currentYear);
            
            if(this.cachedData  === null){
                this.loadingText = 'Loading...';
                this.standingTeam = undefined;

                this.leagueServiceSubscribe = this.leagueService.getStandingData(this.leagueId, this.currentYear)
                .subscribe( 
                    data => {
                        if ( data !== undefined && data.errors.length === 0 ) {
                            localStorage.setItem('' + this.leagueId + this.currentYear, JSON.stringify(data));
                            this.standingsResponse = data;
                            this.dataParse(false);
                            console.log('Standing Response: ', this.standingsResponse);
                        } else {
                            this.loadingText = 'No Data found from Server!';
                            this.standingTeam = undefined;
                        }
                    },
                    error => this.loadingText = 'No Data found from Server!'
                );
            } else {
                this.dataParse(true);
            }
        });
    }

    dataParse(cached: boolean): void{
        cached ? this.standingsResponse = JSON.parse(this.cachedData || '[]') : '';
                
        if ( this.standingsResponse !== undefined && this.standingsResponse.errors.length === 0 ) {
            this.leagueArgs = this.standingsResponse.parameters;
            this.leagueName = this.standingsResponse.response?.[0];
            this.standingTeam = this.leagueName.league.standings?.[0];
            console.log('Standing Team: ', this.standingTeam);
        }
    }

    ngOnDestroy(): void {
        this.leagueServiceSubscribe.unsubscribe();
    }
}