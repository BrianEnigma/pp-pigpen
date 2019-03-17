import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { tap, map, shareReplay, first } from 'rxjs/operators';

export class Util {
  public static improperSlug(slug: string): boolean {
    return /[^a-z]/.test(slug);
  }

  public static fromFS<T, K extends T>(afDoc: AngularFirestoreDocument<T>): Observable<K> {
    const obs: Observable<T | undefined> = afDoc.valueChanges();
    return obs.pipe(
      tap(
        doc => {
          if (doc) { console.log("firestore read:", doc); }
        }),
      map(fs => { return { afDoc, ...fs } as unknown as K; }),
      shareReplay(1)
    );
  }

  public static numToString(n: number) {
    if (n && n > 0) { return n.toString(); }
    return "";
  }

  public static async single<T>(obs: Observable<T>): Promise<T> {
    return await obs.pipe(first()).toPromise<T>();
  }

  public static isEmailValid(email: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
}
