import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  books: any[] = [];
  images: string[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Obtener los libros desde el servicio
    this.dataService.getBooks().subscribe((data: any) => {
      this.books = data.results;
      const imageRequests = this.books.map((book: any, index: number) => {
        if (index % 2 === 0) {
          return this.dataService.getDogImage();
        } else {
          return this.dataService.getRobotImage(book.title);
        }
      });

      forkJoin(imageRequests).subscribe((imageResponses: any[]) => {
        imageResponses.forEach((response, index) => {
          if (index % 2 === 0) {
            this.images.push(response.message);
          } else {
            console.log(this.images);
            this.images.push(response);
          }
        });
      });
    });

  }
  // Método para guardar en Firebase
  saveToFirebase(bookTitle: string, imageUrl: string) {
    this.dataService.saveNoteToFirebase(bookTitle, imageUrl);
  }

}
