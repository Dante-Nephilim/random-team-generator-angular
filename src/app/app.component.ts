import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  teamArray: string[] = [];
  newTeamMember: string = '';
  numberOfTeams: number = 0;
  title = 'team-generator';
  teams: string[][] = [];
  isNumberofTeamsZero: boolean = false;
  isNumberofMembersZero: boolean = false;
  isMoreTeamMembersNeeded: boolean = false;
  isTeamFormationNotPossible: boolean = false;

  //   let teamSet = new Set<string>();
  // teamSet.add("Prem");
  // teamSet.add("teja");
  // teamSet.add("manjula");
  // teamSet.add("premkumar");
  // // console.log(teamSet.size);
  generate(x: Set<string>, number: number): string[][] {
    let ResultArray: string[][] = [];
    let xCopy: Set<string> = x;
    let Result = new Set<Set<string>>();
    let teamCapacity: number = Math.floor(x.size / number);
    for (let j = 0; j < number; j++) {
      let bufferStringSet = new Set<string>();
      for (let i = 0; i < teamCapacity; i++) {
        let teamMemberArray: string[] = Array.from(x);
        let randomMember: string =
          teamMemberArray[Math.floor(Math.random() * teamMemberArray.length)];
        // console.log(randomMember);
        if (!bufferStringSet.has(randomMember) && xCopy.has(randomMember)) {
          bufferStringSet.add(randomMember);
          xCopy.delete(randomMember);
        } else {
          i--;
        }
      }
      Result.add(bufferStringSet);
    }

    // Result.forEach((value) => value.forEach((str) => console.log(str)));
    Result.forEach((value) => ResultArray.push(Array.from(value)));
    // console.log(ResultArray);
    return ResultArray;
  }

  generateTeams(n: number): void {
    this.isNumberofTeamsZero = false;
    this.isNumberofMembersZero = false;
    this.isMoreTeamMembersNeeded = false;
    this.isTeamFormationNotPossible = false;

    if (n !== 0) {
      this.isNumberofTeamsZero = false;
      if (this.teamArray.length != 0) {
        this.isNumberofMembersZero = false;
        if (this.teamArray.length >= n) {
          this.isMoreTeamMembersNeeded = false;

          if (this.teamArray.length % n === 0) {
            this.isTeamFormationNotPossible = false;
            let teamSet = new Set(this.teamArray);
            this.teams = this.generate(teamSet, n);
          } else {
            this.isTeamFormationNotPossible = true;
          }
        } else {
          this.isMoreTeamMembersNeeded = true;
        }
      } else {
        this.isNumberofMembersZero = true;
      }
    } else {
      this.isNumberofTeamsZero = true;
    }
  }
  addTeamMember(newString: string): void {
    if (newString !== '') {
      this.teamArray.push(newString);
      this.newTeamMember = '';
    }
  }
}
