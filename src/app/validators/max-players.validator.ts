import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxPlayersInTeamValidator(maxPlayersInTeam: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        return 
    }
}