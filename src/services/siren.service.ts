// siren.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SirenService {

  //  vérifier la validité du SIREN à partir d'une chaine de caracteres entrée 
  CheckSirenValidity(siren: string): boolean {
    if (this.validateFullSirenSize(siren)) {

      let sirenWithoutControlNumber = this.ComputeFullSiren(siren);
      return this.CheckSirenNumber(sirenWithoutControlNumber) &&
        this.calculateControlNumber(sirenWithoutControlNumber);
    }
    return false;
  }


  // la chaine de caracteres entrée doit avoir une longueur minimim de 9 char
  validateFullSirenSize(sirenWithoutControlNumber: string): boolean {
    return sirenWithoutControlNumber.length >= 9;

  }
  // doit etre number 

  CheckSirenNumber(siren: string): boolean {
    const regex = /^[0-9]{9}$/;
    return regex.test(siren)
  }
  // Le SIREN  doit avoir une longueur de 9 chiffres.
  ComputeFullSiren(siren: string): string {
    return siren.substring(0, 9);
  }

  // Calcul et validité d'un numéro SIREN
  private calculateControlNumber(siren: string): boolean {

    let sum: number = 0;
    let multipleNumber: number = 0;
    for (let i = 0; i < siren.length; i++) {
      const factor = i % 2 === 1 ? 2 : 1;
      // 1- Résultat après multiplication
      multipleNumber = parseInt(siren.charAt(i)) * factor;
      // 2- Résultat après somme des chiffres 
      multipleNumber = multipleNumber.toString().split('').map(Number).reduce(function (a, b) { return a + b; }, 0);

      sum += multipleNumber;
    }

    return sum % 10 === 0;

  }
}
