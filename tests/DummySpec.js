/**
 * Created by michogarcia on 29/12/16.
 */

import Dummy from '../src'

describe('Dummy', () => {
  it('should be dumb', () => {
    const dummy = new Dummy()
    expect(dummy.AmIDumb).toBeTruthy()
  })
})
