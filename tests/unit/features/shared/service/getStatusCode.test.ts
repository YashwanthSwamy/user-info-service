import { expect } from 'chai';
import sinon from 'sinon';
import HttpStatus from 'http-status-codes';
import { Operation } from '../../../../../src/externalServices/database/enums/operation';
import { GetStausCode } from '../../../../../src/features/shared/service/getStatusCode';

describe('GetStausCode', () => {
  let getStatusCode: GetStausCode;

  beforeEach(() => {
    getStatusCode = new GetStausCode();
  });

  describe('operationToStatusCode', () => {
    it('should return OK status code for Success operation', () => {
      const result = getStatusCode.operationToStatusCode(Operation.Success);
      expect(result).to.equal(HttpStatus.OK);
    });

    it('should return CONFLICT status code for AlreadyExists operation', () => {
      const result = getStatusCode.operationToStatusCode(
        Operation.AlreadyExists,
      );
      expect(result).to.equal(HttpStatus.CONFLICT);
    });

    it('should return INTERNAL_SERVER_ERROR status code for Error operation', () => {
      const result = getStatusCode.operationToStatusCode(Operation.Error);
      expect(result).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    it('should return BAD_REQUEST status code for unknown operation', () => {
      const result = getStatusCode.operationToStatusCode(999 as Operation);
      expect(result).to.equal(HttpStatus.BAD_REQUEST);
    });
  });
});
