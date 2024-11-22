import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private firestore = inject(Firestore);
  constructor(private http: HttpClient) { }

  // Obtener los libros desde el endpoint
  getBooks(): Observable<any> {
    const endpoint = 'https://gutendex.com/books?ids=1,2,3,4,5,6,7,8,9,10';
    return this.http.get(endpoint);
  }

  // Obtener una imagen de un perro aleatorio
  getDogImage(): Observable<any> {
    const endpoint = 'https://dog.ceo/api/breed/affenpinscher/images/random';
    return this.http.get(endpoint);
  }

  getRobotImage(query: string): Observable<string> {
    const queryForRobot = query.trim();
    const robotImageUrl = `https://robohash.org/${encodeURIComponent(queryForRobot)}`;
    return of(robotImageUrl);
  }

  async saveNoteToFirebase(bookTitle: string, imageUrl: string) {
    try {
      // Referencia a la colección de Firestore
      const notesCollection = collection(this.firestore, 'notes');
      await addDoc(notesCollection, {
        title: bookTitle,
        imageUrl: imageUrl,

      });
      console.log("Nota guardada en Firestore");
    } catch (error) {
      console.error("Error al guardar la nota en Firestore: ", error);
    }
  }


}
