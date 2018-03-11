import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import {AppState} from './app.interfaces';
import {LoadData, DataLoaded} from './app.actions';

@Injectable()
export class AppEffects {

  constructor(private actions: Actions) {}
}
