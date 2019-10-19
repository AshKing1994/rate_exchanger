import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  loginUser (credentials){
      if(credentials.email=='test@example.com' && credentials.password == '123456')
      {
        return true;
      }else{
         return false;
      }
  }
}
