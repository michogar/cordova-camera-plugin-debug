/**
 * Created by michogarcia on 29/12/16.
 */

const context = require.context('./tests', true, /Spec\.js$/)
context.keys().forEach(context)
