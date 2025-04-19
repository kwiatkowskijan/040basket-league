import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { Team } from '../../../models/team';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-add-edit-team-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    MatTabsModule, MatSelectModule],
  templateUrl: './add-edit-team-form.component.html',
  styleUrl: './add-edit-team-form.component.css'
})
export class AddEditTeamFormComponent {

  @Input() isNew: boolean = false;
  @Input() maxPlayers: number = 0;
  @Input() availblePlayers: Player[] = [];
  @Input() team?: Team;
  @Output() createTeam = new EventEmitter<FormGroup>();

  addEditTeamForm = new FormGroup({});

  ngOnInit() {
    this.addEditTeamForm.addControl('name', new FormControl('', [Validators.required, Validators.maxLength(50)]));
    this.addEditTeamForm.addControl('city', new FormControl('', [Validators.required, Validators.maxLength(50)]));
  }

  ngOnChanges() {
    for (let i = 0; i < this.maxPlayers; i++) {
      this.addEditTeamForm.addControl('player' + i, new FormControl('', [Validators.required]));
      this.addEditTeamForm.addControl('number' + i, new FormControl('', [Validators.required, Validators.min(1), Validators.max(99)]));
    }

    if (!this.isNew) {
      this.addEditTeamForm.setValue({
        name: this.team?.name,
        city: this.team?.city,
      })
    }
  }

  sendTeamData(form: FormGroup) {
    this.createTeam.emit(form);
  }
}
