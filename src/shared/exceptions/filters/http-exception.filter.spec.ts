import { HttpExceptionFilter } from "./http-exception.filter";
import { ArgumentsHost, BadRequestException } from "@nestjs/common";
import { createMock } from "@golevelup/ts-jest";
import {
  InvalidDataException,
  InvalidProperty,
} from "@/shared/validation/exceptions";

describe("HttpExceptionFilter", () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });

  it("should be defined", () => {
    expect(filter).toBeDefined();
  });

  it("should transform http exceptions", () => {
    const mockResponse = {
      status: jest.fn().mockImplementation(() => mockResponse),
      send: jest.fn(),
    } as any;

    const exception = new BadRequestException();
    filter.catch(
      exception,
      createMock<ArgumentsHost>({
        switchToHttp: jest.fn().mockReturnValue({
          getResponse: jest.fn().mockReturnValue(mockResponse),
        }),
      }),
    );

    expect(mockResponse.status).toHaveBeenCalledWith(exception.getStatus());
    expect(mockResponse.send).toHaveBeenCalledWith({
      errorCode: exception.name,
    });
  });

  it("should transform InvalidData exceptions", () => {
    const mockResponse = {
      status: jest.fn().mockImplementation(() => mockResponse),
      send: jest.fn(),
    } as any;

    const exception = new InvalidDataException(
      new Map([
        [
          "test",
          new InvalidProperty(
            new Map([["constraint1", "constraint1 failed"]]),
            new Map(),
          ),
        ],
      ]),
    );
    filter.catch(
      exception,
      createMock<ArgumentsHost>({
        switchToHttp: jest.fn().mockReturnValue({
          getResponse: jest.fn().mockReturnValue(mockResponse),
        }),
      }),
    );

    expect(mockResponse.status).toHaveBeenCalledWith(exception.getStatus());
    expect(mockResponse.send).toHaveBeenCalledWith({
      errorCode: exception.name,
      invalidProperties: {
        test: {
          errorMessages: { constraint1: "constraint1 failed" },
          children: {},
        },
      },
    });
  });
});
