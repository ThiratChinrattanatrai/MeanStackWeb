import { Injectable } from '@angular/core';
import { User } from '../class/user';

@Injectable()
export class ValidateService {
    
    validateLogin(user: User){
        if(user.username !== undefined && user.password !== undefined
            && user.username !== "" && user.password !== ""){
            return true;
        }else{
            return false;
        }
    }

    validateRegister(user: User){
        if(user.name !== undefined && user.username !== undefined && user.password !== undefined && user.email !== undefined
            && user.name !== "" && user.username !== "" && user.password !== "" && user.email !== ""){
            return this.validateEmail(user.email);
        }else{
            return false;
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}