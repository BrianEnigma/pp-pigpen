import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { FSPlaytestFeedback } from "../models/fs-playtest-feedback.model";
import { UserService } from "./user.service";
import { Util } from './util';
import { NotifyService } from './notify.service';

export class PlaytestFeedback {
  inner: FSPlaytestFeedback;
  numPlaytesters_error = "";
  solveMinutes_error = "";
  difficulty_error = "";
  fun_error = "";
  isDirty = false;

  get numPlaytesters() {
    return Util.numToString(this.inner.numPlaytesters);
  }
  set numPlaytesters(s: string) {
    const i = +s;
    this.dirty(i, this.inner.numPlaytesters);
    this.inner.numPlaytesters = i;
    this.numPlaytesters_error =
      Number.isInteger(i) && i > 0
        ? ""
        : "number of playtesters must be a positive whole number";
  }
  get version() {
    return this.inner.version;

  }
  set version(s: string) {
    this.dirty(s, this.inner.version);
    this.inner.version = s;
  }

  get solveMinutes() {
    return Util.numToString(this.inner.solveMinutes);
  }
  set solveMinutes(s: string) {
    const i = +s;
    this.dirty(i, this.inner.solveMinutes);
    this.inner.solveMinutes = i;
    this.solveMinutes_error =
      Number.isInteger(i) && i > 0
        ? ""
        : "solving time must be a positive whole number of minutes";
  }

  get difficulty() {
    return this.inner.difficulty;
  }
  set difficulty(i: number) {
    this.dirty(i, this.inner.difficulty);
    this.inner.difficulty = i;
    this.difficulty_error =
      Number.isInteger(i) && i > 0 ? "" : "please select a difficulty level";
  }
  get fun() {
    return this.inner.fun;
  }
  set fun(i: number) {
    this.dirty(i, this.inner.fun);
    this.inner.fun = i;
    this.fun_error =
      Number.isInteger(i) && i > 0 ? "" : "please select a fun level";
  }
  get errors() {
    return this.inner.errors;

  }
  set errors(s: string) {
    this.dirty(s, this.inner.errors);
    this.inner.errors = s;
  }
  get visual() {
    return this.inner.visual;

  }
  set visual(s: string) {
    this.dirty(s, this.inner.visual);
    this.inner.visual = s;
  }
  get general() {
    return this.inner.general;

  }
  set general(s: string) {
    this.dirty(s, this.inner.general);
    this.inner.general = s;
  }

  private dirty(a: string|number, b: string|number) {
    if (a !== b) {
      this.isDirty = true;
    }
  }

  constructor(private afDoc: AngularFirestoreDocument<FSPlaytestFeedback>, puzzleRef: DocumentReference) {
    this.inner = {
      puzzleRef: puzzleRef,
      numPlaytesters: 0,
      version: "",
      solved: false,
      solveMinutes: 0,
      difficulty: 0,
      fun: 0,
      errors: "",
      visual: "",
      general: ""
    };

    // subscribe to DB updates
    afDoc.valueChanges().subscribe(newfs => {
      if (newfs) {
        Object.assign<FSPlaytestFeedback, FSPlaytestFeedback>(
          this.inner,
          newfs
        );
      }
    });
  }

  save(ns: NotifyService) {
    let go = true;
    if (this.numPlaytesters_error) { ns.error("Invalid Field", this.numPlaytesters_error); go = false; }
    if (this.difficulty_error) { ns.error("Invalid Field", this.difficulty_error); go = false; }
    if (this.solveMinutes_error) { ns.error("Invalid Field", this.solveMinutes_error); go = false; }
    if (this.fun_error) { ns.error("Invalid Field", this.fun_error); go = false; }

    if (go) {
      this.afDoc.set(this.inner);
      this.isDirty = false;
    }
  }
}

@Injectable({
  providedIn: "root"
})
export class PlaytestService {
  playtestCollection: AngularFirestoreCollection<FSPlaytestFeedback> | undefined;

  constructor(
    private readonly af: AngularFirestore,
    private readonly us: UserService
  ) {
    if (us.fsdoc) {
      this.playtestCollection = us.fsdoc.collection<FSPlaytestFeedback>("playtestFeedback");
    }
  }
  // Public interface

  getPlaytestFeedback(puzzleRef: DocumentReference): PlaytestFeedback {
    if (this.playtestCollection) {
      return new PlaytestFeedback(this.playtestCollection.doc(puzzleRef.id), puzzleRef);
    }
    throw new Error("tried to get playtest feedback of user with no id");
  }
}
