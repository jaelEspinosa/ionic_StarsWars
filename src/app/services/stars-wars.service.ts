import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Data, CharactersResponse, } from '../interfaces/starsWars';
import { environment } from 'src/environments/environment';


const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class StarsWarsService {

  constructor() { }
  private http = inject ( HttpClient )

  private characters: Data[] = []
  private page: number = 1
  public lastPage: boolean = false;


  private executeQuery<T>( endpoint:string ){

    return this.http.get<T>(`${apiUrl}${endpoint}`)
  }



  public getAllCharacters(category:string , loadMore: boolean = false ):Observable<Data[]>{

    if (loadMore){
     this.page= this.page + 1
     return this.executeQuery<CharactersResponse>(`/${category}?page=${this.page}`)
     .pipe(
       map( res =>{
        if(!res.info.next) {
           this.lastPage = true
        }
        return this.characters = [...this.characters, ...res.data]
       })
     )
    }

      return this.executeQuery<CharactersResponse>( `/${category}`)
        .pipe(
          map(res => {

            return this.characters = [...this.characters, ...res.data]
          })
        )

  }


  getDataByCategory( category:string):Observable<Data[]>{
     return this.executeQuery<CharactersResponse>(`/${ category }`)
      .pipe(
        map(res=>{
          return res.data
        })
      )
  }

}
