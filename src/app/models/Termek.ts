import { Jegy } from './Jegy';
import { Berlet } from './Berlet';

/*export type Termek = 
  | (Jegy & { tipus: 'jegy' })
  | (Berlet & { tipus: 'berlet' }); */


  export type Termek =
  | (Jegy & { tipus: 'jegy' })
  | (Berlet & { tipus: 'berlet' });
