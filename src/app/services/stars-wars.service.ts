import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, Subject, interval, map, of } from 'rxjs';
import { Data, CharactersResponse, DataByCategoryAndPage } from '../interfaces/starsWars';
import { environment } from 'src/environments/environment';



const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class StarsWarsService implements OnInit{

  constructor() { }
  ngOnInit(): void {
    this.searchPage = 1;
    this.page=1
  }
  private http = inject ( HttpClient )

  private characters: Data[] = []
  private page: number = 1
  private dataByCategoryAndPage: DataByCategoryAndPage = {}
  private searchedResults: Data[] = []

  private  searchPage: number = 1;
  public   lastPage: boolean = false;
  public   totalItems: number = 0;


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



  this.searchedResults = []
  let currentPage:number = 1;
  const dataSubject: Subject<Data[]> = new Subject<Data[]>();

  const subscription = interval(250).subscribe(() =>{
    this.executeQuery<CharactersResponse>(`/characters?page=${currentPage}`)
     .subscribe(resp => {
      const data = resp.data.filter(item => item.name.toUpperCase().includes(name.toUpperCase()))
      this.searchedResults = [...this.searchedResults, ...data]
      console.log(this.searchedResults)
      currentPage++
      if (currentPage >=  97) {
       subscription.unsubscribe();
       dataSubject.next(this.searchedResults); // Emitir los resultados una vez que se complete la búsqueda
       dataSubject.complete(); // Completar el subject
     }
     })
  })



    return dataSubject.asObservable() // Devolver el Observable del subject

}



}
