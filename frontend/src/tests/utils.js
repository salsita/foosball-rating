import React from 'react'
import { shallow } from 'enzyme'

export const shallowWithProps = (componentConstructor, props) =>
  shallow(React.createElement(componentConstructor, props))

const expectNext = (gen, suppliedValue, expected) => {
  expect(gen.next(suppliedValue)).toStrictEqual(expected)
}
const expectThrow = (gen, suppliedValue, expected) => {
  expect(gen.throw(suppliedValue)).toStrictEqual(expected)
}
export const expectNextUndoneValue = gen => suppliedValue => {
  return {
    toBe: value => {
      expectNext(gen, suppliedValue, { value, done: false })
    },
  }
}
export const expectThrowUndoneValue = gen => suppliedValue => {
  return {
    toBe: value => {
      expectThrow(gen, suppliedValue, { value, done: false })
    },
  }
}
export const expectNextDone = gen => suppliedValue => {
  expectNext(gen, suppliedValue, { value: undefined, done: true })
}

export const sagaTest = gen => {
  return {
    expectNextUndoneValue: expectNextUndoneValue(gen),
    expectThrowUndoneValue: expectThrowUndoneValue(gen),
    expectNextDone: expectNextDone(gen),
  }
}
