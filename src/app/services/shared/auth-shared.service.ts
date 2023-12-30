import { Injectable } from "@angular/core";
import { AuthResponse } from "src/app/models/auth-response.model";

@Injectable({providedIn: 'root'})
export class AuthShared {

    public static instance: AuthShared = null as any

    loggedUser: AuthResponse

    constructor(){
        return AuthShared.instance = AuthShared.instance || this
    }

    public static getInstance(){
        if(this.instance == null){
          this.instance = new AuthShared();
        }
        return this.instance;
      }
    

}