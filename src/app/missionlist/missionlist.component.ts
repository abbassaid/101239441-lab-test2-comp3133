import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html'
})
export class MissionlistComponent {
  launches: any[] = [];
  flightNum: number | undefined;
  yearSelected: number | undefined;
  launchYears = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  
  constructor(private http: HttpClient) {
    this.loadLaunches();
  }

  loadLaunches() {
    this.http.get('https://api.spacexdata.com/v3/launches').subscribe((launches: any) => {
      this.launches = launches;
    });
  }

  getLaunchByYear(year: string) {
    this.http.get(`https://api.spacexdata.com/v3/launches?launch_year=${year}`).subscribe((response: any) => {
      this.launches = response;
    });
  }

  filterSuccessfulLandings() {
    this.launches = this.launches.filter(launch => {
      return launch.rocket.first_stage.cores[0].land_success === true;
    });  }

  filterFailedLandings() {
    this.launches = this.launches.filter(launch => {
      return launch.rocket.first_stage.cores[0].land_success === false;
    });  }

  filterSuccessfulLaunches() {
    this.launches = this.launches.filter(launch => {
      return launch.launch_success === true;
    });  }

  filterFailedLaunches() {
    this.launches = this.launches.filter(launch => {
      return launch.launch_success === false;
    });  }

  filterLaunch(index: number, year: string) {
    this.getLaunchByYear(year);
    this.yearSelected = index;
  }

  clearFilter() {
    this.loadLaunches();
  }
}
