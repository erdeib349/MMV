import { LowercasePipe } from './lower-pipe.pipe';

describe('LowercasePipe', () => {
  it('create an instance', () => {
    const pipe = new LowercasePipe();
    expect(pipe).toBeTruthy();
  });
});
