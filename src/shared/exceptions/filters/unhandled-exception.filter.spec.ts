import { UnhandledExceptionFilter } from "./unhandled-exception.filter";
import { ArgumentsHost, BadRequestException } from "@nestjs/common";
import { createMock } from "@golevelup/ts-jest";
import {
  InvalidDataException,
  InvalidProperty,
} from "@/shared/validation/exceptions";

describe("HttpExceptionFilter", () => {
  let filter: UnhandledExceptionFilter;

  beforeEach(() => {
    filter = new UnhandledExceptionFilter();
  });

  it("should be defined", () => {
    expect(filter).toBeDefined();
  });

  it("should send InternalServerErrorException", () => {
    const mockResponse = {
      status: jest.fn().mockImplementation(() => mockResponse),
      send: jest.fn(),
    } as any;

    const exception = new Error("unexpected error occurred");
    filter.catch(
      exception,
      createMock<ArgumentsHost>({
        switchToHttp: jest.fn().mockReturnValue({
          getResponse: jest.fn().mockReturnValue(mockResponse),
        }),
      }),
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith({
      errorCode: "InternalServerErrorException",
    });
  });
});
