import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";

import { User, auth } from "firebase/app";

import { ReplaySubject } from 'rxjs';
import { SentryService } from "./sentry.service";
import { noSideEffects } from "@angular/core/src/util";
import { NotifyService } from './notify.service';
import { FSUserDoc } from './fs-user-doc.model';

@Injectable({
  providedIn: "root"
})
export class UserService {
  public isSignedIn: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public id = "";
  public name = "";
  public email = "";
  public photo = "";
  public isEditor = false;
  public isCityOps = false;
  public isComms = false;
  public isWebmaster = false;
  public isShowrunner = false;

  public GCCity = "";
  public fsdoc: AngularFirestoreDocument<FSUserDoc> | undefined = undefined;

  // A user consists of two places:
  // Auth from firebase, and user profile.

  private readonly authProvider: auth.GoogleAuthProvider;

  constructor(public afAuth: AngularFireAuth, public af: AngularFirestore, private ss: SentryService, private ns: NotifyService) {
    this.authProvider = new auth.GoogleAuthProvider();

    // get user updates
    afAuth.user.subscribe(
      newFbUser => this.updateFbUser(newFbUser),
      err => {
        // this.updateFbUser(null);  // don't change user state on error, just log it
        ss.handleError(err);
        ns.error("Unknown Autentication Error", "Sorry! An unexepcted error occurred.  The webmaster has been notified.");
      },
      () => {
        ss.log("afAuth.user observable closed",true);
        this.updateFbUser(null);
      }
    );
  }

  public async updateFbUser(newFbUser: User | null) {
    this.id = newFbUser ? newFbUser.uid : "";
    this.name = newFbUser ? newFbUser.displayName || "" : "";
    this.email = newFbUser ? newFbUser.email || "" : "";
    this.photo = newFbUser ? newFbUser.photoURL || "" : "";

    if (newFbUser) {
      const newToken = await newFbUser.getIdTokenResult(true);
      const claims = newToken.claims;
      this.isEditor = claims.Editor;
      this.isCityOps = claims.CityOps;
      this.isComms = claims.Comms;
      this.isWebmaster = claims.Webmaster;
      this.isShowrunner = claims.Showrunner;

      this.GCCity = claims.GCCity;
      this.fsdoc = this.af.doc(`users/${newFbUser.uid}`);
      this.ss.setUser(this.id, this.name, this.email, this.GCCity);
    } else {
      this.isEditor = false;
      this.isCityOps = false;
      this.isComms = false;
      this.isWebmaster = false;
      this.isShowrunner = false;

      this.GCCity = "";

      this.fsdoc = undefined;
    }

    this.isSignedIn.next(!!newFbUser);
  }

  public async signIn() {
    this.ss.breadcrumb("auth","Calling signInWithRedirect");
    const credential = this.afAuth.auth.signInWithRedirect(this.authProvider);
  }

  public signOut() {
    this.afAuth.auth.signOut();
  }
}
