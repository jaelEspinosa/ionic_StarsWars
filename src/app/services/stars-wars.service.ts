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
  private searchPage: number = 1;
  private dataByCategoryAndPage: DataByCategoryAndPage = {}
  private searchedResults: Data[] = []

  public  lastPage: boolean = false;

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


public getAllCardsAndFindByname(name: string, loadMore: boolean = false ):Observable<Data[]> {

  if (loadMore) {
    this.searchPage =+ 1
    return this.executeQuery<CharactersResponse>(`/characters?page=${this.searchPage}`)
        .pipe(
          map(resp => {
            const data = resp.data.filter(item => item.name.toUpperCase().includes(name.toUpperCase()))
            this.searchedResults = [...this.searchedResults, ...data]
            if (!resp.info.next){
              this.searchedResults[this.searchedResults.length-1].lastItem = true
            }
            return this.searchedResults
         })
        )
  } else {

    this.searchedResults = []
    return this.executeQuery<CharactersResponse>(`/characters?page=${this.searchPage}`)
        .pipe(
          map(resp => {
            const data = resp.data.filter(item => item.name.toUpperCase().includes(name.toUpperCase()))
            this.searchedResults = [...this.searchedResults, ...data]

            return this.searchedResults
        })
        )
  }


}


/* private findCardsByName (pages:number , name:string ):Observable<Data[]>{

  console.log('vamos a buscar por: ',name,' en un total de ',pages,' paginas')



      return this.executeQuery<CharactersResponse>(`/characters?page=${1}`)
       .pipe(
        map(resp =>{
          const data = resp.data.filter(item => item.name.toUpperCase().includes(name.toUpperCase()))
          console.log('la data es',data)
          this.searchedResults = [...this.searchedResults, ...data]
          return this.searchedResults
        })
       )


} */

}
