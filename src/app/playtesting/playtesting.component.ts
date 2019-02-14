import { Component, OnInit } from "@angular/core";
import { UserService } from "src/services/auth.service";
import { NotifyService } from "src/services/notify.service";
import { PuzzleService, Puzzle } from "src/services/puzzle.service";

@Component({
  selector: "view-playtesting",
  template: `
    <p-card>Thank you for your interest in playtesting!</p-card>
    <ng-template #notLoggedIn>
      <h1>Not Logged In</h1>
      <p-card>
        In order to playtest you now need to log in. Certain fields will be
        saved across tests, like your city, this will allow you to save
        keystrokes compared to the old Google Form. Also, you can come back any
        time to see, edit, or add to your testing notes.</p-card
      >
      <p-card
        >For now, we only support Google Authentication to keep it simple (no
        additional user names or passwords to manage), and because, as many of
        you are cherished Game Control volunteers, you will already have them
        from using Google Drive.</p-card
      >
      <p-card
        >Please sign in using the button on the top right now. Thanks!</p-card
      >
    </ng-template>

    <ng-template #noSetSelected><h1>No set selected</h1></ng-template>

    <div *ngIf="(auth.isSignedIn | async); else notLoggedIn">
      <app-puzzle-sets [puzzleSets]="ps.playtestingSets"></app-puzzle-sets>

      <div
        *ngIf="
          (ps.selectedPuzzleSet | async | async) as puzzleSet;
          else noSetSelected
        "
      >
        <h3>
          Set selected is {{ puzzleSet.name }}. Please open each section below
          to playtest a puzzle.
        </h3>
        <p-accordion>
          <div *ngFor="let puzzleRef of puzzleSet.puzzleRefs">
            <p-accordionTab [header]="toTitle(puzzleRef | refToPuzzle | async)">
              <app-puzzle [puzzle]="puzzleRef | refToPuzzle"></app-puzzle>
              <app-puzzle-feedback [puzzleRef]="puzzleRef"></app-puzzle-feedback>
            </p-accordionTab>
          </div>
        </p-accordion>
      </div>
    </div>
  `,
  styles: []
})
export class PlaytestingComponent implements OnInit {
  constructor(
    public auth: UserService,
    private ns: NotifyService,
    public ps: PuzzleService
  ) {}

  ngOnInit() {
    this.ns.setTitle("Playtesting");
  }

  toTitle(puzzle: Puzzle): string {
    if (puzzle) {
      return `(${puzzle.type}) ${puzzle.name}`;
    } else {
      return "Error getting title";
    }
  }
}
