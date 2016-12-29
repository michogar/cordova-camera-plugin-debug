/**
 * Created by michogarcia on 29/12/16.
 */

let context = require.context('./tests', true, /Spec\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);