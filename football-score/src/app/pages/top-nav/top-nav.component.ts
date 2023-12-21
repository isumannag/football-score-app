import { Component, OnInit } from '@angular/core';
import { LeagueDataService } from '../../services/league-data.service';
import { Country } from '../../model/standings.model';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent implements OnInit{
  countryList: Country[] = [];
  constructor(private leagueDataService: LeagueDataService) {}

  ngOnInit(): void {
    this.countryList = this.leagueDataService.getCountryList();
  }
}
