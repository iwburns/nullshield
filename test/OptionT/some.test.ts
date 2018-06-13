import { OptionT } from '../../src/nullshield';
import { expectASome, expectANone } from '../util';

describe('#OptionT - Some', () => {
  it('should have the function isSome', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.isSome()).toEqual(true);
  });

  it('should have the function isNone', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.isNone()).toEqual(false);
  });

  it('should have the function toString', () => {
    const one = OptionT.some(1);

    expectASome(one);

    expect(one.toString()).toEqual('Some( 1 )');
  });

  it('should have the function expect', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.unwrap('it failed')).toEqual(1);
  });

  it('should have the function unwrap', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.unwrap()).toEqual(1);
  });

  it('should have the function unwrapOr', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.unwrapOr(10)).toEqual(1);
  });

  it('should have the function unwrapOrElse', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.unwrapOrElse(() => 2)).toEqual(1);
  });

  it('should have the function map', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const two = one.map(val => 2);

    expectASome(two);
    expect(two.isSome()).toEqual(true);
    expect(two.unwrap()).toEqual(2);

    const three = one.map(() => null);

    expectANone(three);
    expect(three.isSome()).toEqual(false);

    const four = one.map(() => {return;});

    expectANone(four);
    expect(four.isSome()).toEqual(false);
  });

  it('should have the function and', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const two = OptionT.some(2);
    const maybeTwo = one.and(two);

    expectASome(two);
    expect(maybeTwo.isSome()).toEqual(true);
    expect(maybeTwo.unwrap()).toEqual(2);

    const none = OptionT.none();
    const maybeThree = one.and(none);

    expectANone(maybeThree);
    expect(maybeThree.isSome()).toEqual(false);
  });

  it('should have the function flatMap', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const maybeTwo = one.flatMap((val) => {
      return OptionT.some(val * 2);
    });

    expectASome(maybeTwo);
    expect(maybeTwo.isSome()).toEqual(true);
    expect(maybeTwo.unwrap()).toEqual(2);

    const maybeThree = one.flatMap(() => {
      return OptionT.none();
    });

    expectANone(maybeThree);
    expect(maybeThree.isSome()).toEqual(false);
  });

  it('should have the function or', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const two = OptionT.some(2);
    const maybeOne = one.or(two);

    expectASome(maybeOne);
    expect(maybeOne.isSome()).toEqual(true);
    expect(maybeOne.unwrap()).toEqual(1);

    const three = OptionT.none();
    const maybeOneAgain = one.or(three);

    expectASome(maybeOneAgain);
    expect(maybeOneAgain.isSome()).toEqual(true);
    expect(maybeOneAgain.unwrap()).toEqual(1);
  });

  it('should have the function orElse', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const maybeOne = one.orElse(() => OptionT.some(2));

    expectASome(maybeOne);
    expect(maybeOne.isSome()).toEqual(true);
    expect(maybeOne.unwrap()).toEqual(1);

    const maybeOneAgain = one.orElse(() => OptionT.none());

    expectASome(maybeOneAgain);
    expect(maybeOneAgain.isSome()).toEqual(true);
    expect(maybeOneAgain.unwrap()).toEqual(1);
  });

  it('should have the function match', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const doubled = one.match({
      some: val => val * 2,
      none: () => 0,
    });

    expect(doubled).toEqual(2);

    let three = 0;
    one.match({
      some: () => three = 3,
      // tslint:disable-next-line:no-empty
      none: () => {},
    });

    expect(three).toEqual(3);
  });

  it('should have the function filter', () => {
    const one = OptionT.some(1);
    expectASome(one);

    const filtered = one.filter(x => x > 0);
    expectASome(filtered);

    expect(filtered.unwrap()).toEqual(1);
    expect(filtered).toBe(one); // they should be the same object

    const filteredAgain = one.filter(x => x < 0);
    expectANone(filteredAgain);
  });

  it('should have the function forEach', () => {
    const one = OptionT.some(1);
    expectASome(one);

    let val = 0;

    one.forEach(x => val = x);
    expect(val).toEqual(1);
  });
});