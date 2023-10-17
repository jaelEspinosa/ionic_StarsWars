import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Data, CharactersResponse, DataByCategoryAndPage, } from '../interfaces/starsWars';
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
  public  lastPage: boolean = false;

  private dataByCategoryAndPage: DataByCategoryAndPage = {}

  private executeQuery<T>( endpoint:string ){
    console.log(endpoint)
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


 public getDataByCategory( category:string, loadMore: boolean = false ):Observable<Data[]>{

    if(loadMore){
      return this.getCardsByCategory( category )
    }

    if(this.dataByCategoryAndPage[category]){
      return of(this.dataByCategoryAndPage[category].data)
    }

    return this.getCardsByCategory( category );
  }

 private getCardsByCategory( category: string):Observable<Data[]> {

  if(!Object.keys(this.dataByCategoryAndPage).includes(category)){
    // no existe
    this.dataByCategoryAndPage[category] = {
      page: 1,
      data: []
    }
  }

  const page = this.dataByCategoryAndPage[category].page + 1

  return this.executeQuery<CharactersResponse>(`/${ category }?page=${ page }`)
    .pipe(
      map(resp => {
        console.log(resp)
        this.dataByCategoryAndPage[category]={
          page: page,
          data: [...this.dataByCategoryAndPage[category].data, ...resp.data]
        }
        if(!resp.info.next){

          this.dataByCategoryAndPage[category].data[this.dataByCategoryAndPage[category].data.length-1].lastItem = true;
        }
      return this.dataByCategoryAndPage[category].data;
      })
    )
 }

}
