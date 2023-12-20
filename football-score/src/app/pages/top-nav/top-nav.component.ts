import { Component, OnInit } from '@angular/core';
import { Country } from '../../model/league-data.model';
import { LeagueDataService } from '../../services/league-data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent implements OnInit{
  countryList: Country[] = [];
  selectedCountry$: BehaviorSubject<string> | undefined;

  constructor(private leagueDataService: LeagueDataService) {}

  ngOnInit(): void {
    this.selectedCountry$ = this.leagueDataService.selectedCountry$;
    this.countryList = this.leagueDataService.getCountryList();
  }
}
