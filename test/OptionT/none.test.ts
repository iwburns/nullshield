import { OptionT } from '../../src/nullshield';
import { expectANone, expectASome } from '../util';

describe('#OptionT - None', () => {
  it('should have the function isSome', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(none.isSome()).toEqual(false);
  });

  it('should have the function isNone', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(none.isNone()).toEqual(true);
  });

  it('should have the function toString', () => {
    const none = OptionT.none();

    expectANone(none);

    expect(none.toString()).toEqual('None()');
  });

  it('should have the function expect', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(() => none.unwrap('failed')).toThrow('failed');
  });

  it('should have the function unwrap', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(() => none.unwrap()).toThrow('Called unwrap on a None value');
  });

  it('should have the function unwrapOr', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(none.unwrapOr(10)).toEqual(10);
  });

  it('should have the function unwrapOrElse', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(none.unwrapOrElse(() => 1)).toEqual(1);
  });

  it('should have the function map', () => {
    const none = OptionT.none();

    expectANone(none);

    const mapResult = none.map((x: number) => x * 2);
    expect(mapResult.isNone()).toEqual(true);
  });

  it('should have the function and', () => {
    const none = OptionT.none();

    expectANone(none);

    expect(none.and(OptionT.some(1)).isNone()).toEqual(true);
    expect(none.and(OptionT.none()).isNone()).toEqual(true);
  });

  it('should have the function or', () => {
    const none = OptionT.none();

    expectANone(none);

    const orResult = none.or(OptionT.some(1));
    expect(orResult.isSome()).toEqual(true);
    expect(orResult.unwrap()).toEqual(1);
    expect(none.or(OptionT.none()).isNone()).toEqual(true);
  });

  it('should have the function flatMap', () => {
    const none = OptionT.none();
    const nothing = () => OptionT.none();
    const something = () => OptionT.some(1);

    expectANone(none);

    expect(none.flatMap(nothing).isNone()).toEqual(true);
    expect(none.flatMap(something).isNone()).toEqual(true);
  });

  it('should have the function orElse', () => {
    const none = OptionT.none();
    const nothing = () => OptionT.none();
    const something = () => OptionT.some(1);

    expectANone(none);

    expect(none.orElse(nothing).isNone()).toEqual(true);
    expect(none.orElse(something).isSome()).toEqual(true);
    expect(none.orElse(() => OptionT.some('foobar')).unwrap()).toEqual('foobar');
  });

  it('should have the function match', () => {
    const none = OptionT.none();

    expectANone(none);

    expect(none.match({
      some: () => 1,
      none: () => 0,
    })).toEqual(0);
  });

  it('should have the function filter', () => {
    const none = OptionT.none();
    expectANone(none);

    const filtered = none.filter(x => x > 0);
    expectANone(filtered);
  });

  it('should have the function forEach', () => {
    const none = OptionT.none();
    expectANone(none);

    let val = 0;

    none.forEach(x => val = x);
    expect(val).toEqual(0);
  });
});
