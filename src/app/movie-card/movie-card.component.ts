import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  actors: any[] = [];
  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public router:Router,
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  removeCommas(): void {
    this.actors.join(' ');
  }

  getMovies() {
    this.fetchApiData
      .getAllMovies()
      .subscribe((res: any[]) => {
         this.movies = res;
         this.actors = res.map((movie: any) => movie.actor.replace(/,/g, ''));
         console.log(this.actors);
    });
  }
  openGenreDialog(genreName: string): void {
    this.dialog.open(GenreComponent, {
      width: '280px',
      data: {
        genreName: genreName
      }
    });
  }
  openDirectorDialog(directorName: string): void {
    this.dialog.open(DirectorComponent, {
      width: '280px',
      data: {
        directorName: directorName
      }
    });
  }
  openSynopsisDialog(synopsis: string, title: string): void {
    this.dialog.open(SynopsisComponent, {
      width: '280px',
      data: {
        title,
         synopsis,
      }
    });
  }
}
