import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { LeagueDataService } from "../../services/league-data.service";
import { Subscription } from "rxjs";
import { StandingResponse } from "../../model/standings.model";

@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrl: './standings.component.scss',
})
export class StandingComponent implements OnInit, OnDestroy {
    selectedCountry: string = '';
    leagueServiceSubscribe: Subscription  = new Subscription();
    standingsResponse: StandingResponse | undefined;

    constructor(private actRoute: ActivatedRoute,
                private leagueService: LeagueDataService) {}

    ngOnInit(): void {
        this.actRoute.params.subscribe( param => {
            this.selectedCountry = param['country'];
            this.leagueService.selectedCountry$.next(this.selectedCountry);
        });

        if( localStorage.getItem('countryData') === null){
            this.leagueServiceSubscribe = this.leagueService.getStandingData(1,2).subscribe(
                data => {
                    this.standingsResponse = data;
                    if ( data !== undefined && data.errors?.length === 0 ) {
                        localStorage.setItem('countryData', JSON.stringify(data));
                    }
                    console.log('Standing Response: ', this.standingsResponse);
                }
            );
        }
        
    }

    ngOnDestroy(): void {
        this.leagueServiceSubscribe.unsubscribe();
    }
}