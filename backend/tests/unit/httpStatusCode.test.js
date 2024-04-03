const chai = require('chai');
const mocha = require('mocha');

const { describe, it } = mocha;
const { expect } = chai;

const httpStatusCode = require('../../src/httpStatusCode');

describe('httpStatusCode', () => {
  describe('OK', () => {
    it('should return 200', () => {
      expect(httpStatusCode.OK).to.be.equal(200);
    });
  });

  describe('CREATED', () => {
    it('should return 201', () => {
      expect(httpStatusCode.CREATED).to.be.equal(201);
    });
  });

  describe('NO_CONTENT', () => {
    it('should return 204', () => {
      expect(httpStatusCode.NO_CONTENT).to.be.equal(204);
    });
  });

  describe('UNPROCESSABLE_ENTITY', () => {
    it('should return 422', () => {
      expect(httpStatusCode.UNPROCESSABLE_ENTITY).to.be.equal(422);
    });
  });

  describe('NOT_FOUND', () => {
    it('should return 404', () => {
      expect(httpStatusCode.NOT_FOUND).to.be.equal(404);
    });
  });

  describe('INTERNAL_SERVER_ERROR', () => {
    it('should return 500', () => {
      expect(httpStatusCode.INTERNAL_SERVER_ERROR).to.be.equal(500);
    });
  });
});