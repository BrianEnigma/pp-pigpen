import { Component, OnInit } from "@angular/core";
import { NotifyService } from "src/services/notify.service";
import { PuzzleService, PuzzleSet } from "src/services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: "view-editor",
  template: `
    <app-puzzle-sets></app-puzzle-sets>
    <p-toolbar>
      <div class="ui-toolbar-group-right">
        <p-button
          label="Add New Puzzle Set"
          (onClick)="ps.addPuzzleSet()"
        ></p-button>
      </div>
    </p-toolbar>
    <app-edit-puzzle-set></app-edit-puzzle-set>
  `,
  styles: []
})
export class EditorComponent implements OnInit {
  constructor(private ns: NotifyService, public ps: PuzzleService) {
    ns.setTitle("Editor");
  }

  ngOnInit() {}
}
