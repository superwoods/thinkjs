'use strict';

var assert = require('assert');
var thinkit = require('thinkit');
var path = require('path');


for(var filepath in require.cache){
  delete require.cache[filepath];
}
var Index = require('../../../lib/index.js');
var instance = new Index();
instance.load();

think.APP_PATH = path.dirname(__dirname) + '/testApp';

var baseStore = think.adapter('store', 'base');

describe('adapter/store/base', function(){
  it('get instance', function(){
    var instance = new baseStore();
    assert.deepEqual(instance.config, { type: 'base' });
  })
  it('get instance has type', function(){
    var instance = new baseStore({
      type: 'test'
    });
    assert.deepEqual(instance.config, { type: 'test' });
    assert.deepEqual(instance.data, {});
  })
  it('get data, undefined', function(done){
    var instance = new baseStore({
      type: 'test'
    });
    instance.get('test').then(function(data){
      assert.equal(data, undefined);
      done();
    })
  })
  it('get data', function(done){
    var instance = new baseStore({
      type: 'test'
    });
    instance.set('test', 'welefen').then(function(){
      return instance.get('test');
    }).then(function(data){
      assert.equal(data, 'welefen');
      done();
    })
  })
  it('delete data', function(done){
    var instance = new baseStore({
      type: 'test'
    });
    instance.set('test', 'welefen').then(function(){
      return instance.delete('test');
    }).then(function(){
      return instance.get('test');
    }).then(function(data){
      assert.equal(data, undefined);
      done();
    })
  })
  it('get all data', function(done){
    var instance = new baseStore({
      type: 'test'
    });
    instance.set('test', 'welefen').then(function(){
      return instance.list();
    }).then(function(data){
      assert.deepEqual(data, {test: 'welefen'});
      done();
    })
  })
})

