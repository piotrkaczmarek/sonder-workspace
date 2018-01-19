import {TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {provideMockActions} from '@ngrx/effects/testing';
import {DataPersistence} from '@nrwl/nx';
import {readAll, hot} from '@nrwl/nx/testing';
import {PartiesEffects} from './parties.effects';
import {of} from 'rxjs/observable/of';

describe('PartiesEffects', () => {
  let actions;
  let effects: PartiesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
      ],
      providers: [
        PartiesEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ],
    });

    effects = TestBed.get(PartiesEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', {a: {type: 'LOAD_DATA'}});
      expect(await readAll(effects.loadData)).toEqual([
        {type: 'DATA_LOADED', payload: {}}
      ]);
    });
  });
});
