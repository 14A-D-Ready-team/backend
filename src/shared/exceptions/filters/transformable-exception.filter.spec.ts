import { DbOfflineException } from "@/shared/database/exceptions";
import { createMock } from "@golevelup/ts-jest";
import { ArgumentsHost } from "@nestjs/common";
import { TransformableExceptionFilter } from "./transformable-exception.filter";

describe("TransformableExceptionFilter", () => {
  let filter: TransformableExceptionFilter;

  beforeEach(() => {
    filter = new TransformableExceptionFilter();
  });

  it("should be defined", () => {
    expect(filter).toBeDefined();
  });

  it("should transform transformable exceptions", () => {
    const mockResponse = {
      status: jest.fn().mockImplementation(() => mockResponse),
      send: jest.fn(),
    } as any;

    const exception = new DbOfflineException();
    filter.catch(
      exception,
      createMock<ArgumentsHost>({
        switchToHttp: jest.fn().mockReturnValue({
          getResponse: jest.fn().mockReturnValue(mockResponse),
        }),
      }),
    );

    expect(mockResponse.status).toHaveBeenCalledWith(503);
    expect(mockResponse.send).toHaveBeenCalledWith({
      errorCode: "ServiceUnavailableException",
    });
  });
});
