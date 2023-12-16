import { expect, test } from "bun:test";
import { findHandType } from './part2';
import { Hand } from './common';

test('five of a kind', () => {
  const hand: Hand = { cards: ['2', '2', '2', '2', '2'], bid: 1 }
  expect(findHandType(hand)).toBe('five of a kind');
});

test('joker five of a kind', () => {
  const hand: Hand = { cards: ['J', '2', '2', '2', '2'], bid: 1 }
  expect(findHandType(hand)).toBe('five of a kind');
});

test('four of a kind', () => {
  const hand: Hand = { cards: ['2', '2', '2', '2', '3'], bid: 1 }
  expect(findHandType(hand)).toBe('four of a kind');
});

test('joker four of a kind', () => {
  const hand: Hand = { cards: ['J', '2', '2', '2', '3'], bid: 1 }
  expect(findHandType(hand)).toBe('four of a kind');
});

test('full house', () => {
  const hand: Hand = { cards: ['2', '2', '2', '3', '3'], bid: 1 }
  expect(findHandType(hand)).toBe('full house');
});

test('joker full house', () => {
  const hand: Hand = { cards: ['J', '2', '2', '3', '3'], bid: 1 }
  expect(findHandType(hand)).toBe('full house');
});

test('three of a kind', () => {
  const hand: Hand = { cards: ['2', '2', '2', '3', '4'], bid: 1 }
  expect(findHandType(hand)).toBe('three of a kind');
});

test('joker three of a kind', () => {
  const hand: Hand = { cards: ['J', '2', '2', '3', '4'], bid: 1 }
  expect(findHandType(hand)).toBe('three of a kind');
});

test('two pair', () => {
  const hand: Hand = { cards: ['2', '2', '3', '3', '4'], bid: 1 }
  expect(findHandType(hand)).toBe('two pair');
});

test('one pair', () => {
  const hand: Hand = { cards: ['2', '2', '3', '4', '5'], bid: 1 }
  expect(findHandType(hand)).toBe('one pair');
});

test('joker one pair', () => {
  const hand: Hand = { cards: ['J', '2', '3', '4', '5'], bid: 1 }
  expect(findHandType(hand)).toBe('one pair');
});

test('high card', () => {
  const hand: Hand = { cards: ['2', '3', '4', '5', '6'], bid: 1 }
  expect(findHandType(hand)).toBe('high card');
});
