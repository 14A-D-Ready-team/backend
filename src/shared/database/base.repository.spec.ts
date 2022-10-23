import { EntityManager } from "@mikro-orm/mysql";
import BaseRepository from "./base.repository";
import DbOfflineException from "./exceptions/db-offline.exception";

describe("BaseRepository", () => {
  const rep1 = createECONNNREFUSEDRepository();
  const rep2 = createOtherErrorRepository();
  const rep3 = createResolvingRepository();

  it("should intercept ECONNREFUSED errors, and throw DbOfflineError instead", async () => {
    expect((rep1.persistAndFlush as () => unknown)()).rejects.toThrow(
      DbOfflineException,
    );
    expect((rep1.findOne as () => unknown)()).rejects.toThrow(
      DbOfflineException,
    );
    expect((rep1.findOneOrFail as () => unknown)()).rejects.toThrow(
      DbOfflineException,
    );
    expect((rep1.find as () => unknown)()).rejects.toThrow(DbOfflineException);
    expect((rep1.findAndCount as () => unknown)()).rejects.toThrow(
      DbOfflineException,
    );
    expect((rep1.findAll as () => unknown)()).rejects.toThrow(
      DbOfflineException,
    );
    expect((rep1.removeAndFlush as () => unknown)()).rejects.toThrow(
      DbOfflineException,
    );
    expect((rep1.flush as () => unknown)()).rejects.toThrow(DbOfflineException);
    expect((rep1.nativeInsert as () => unknown)()).rejects.toThrow(
      DbOfflineException,
    );
    expect((rep1.nativeUpdate as () => unknown)()).rejects.toThrow(
      DbOfflineException,
    );
    expect((rep1.nativeDelete as () => unknown)()).rejects.toThrow(
      DbOfflineException,
    );
    expect((rep1.populate as () => unknown)()).rejects.toThrow(
      DbOfflineException,
    );
    expect((rep1.count as () => unknown)()).rejects.toThrow(DbOfflineException);
  });

  it("should throw errors other than ECONNREFUSED", async () => {
    expect((rep2.persistAndFlush as () => unknown)()).rejects.toThrow(
      "Other error",
    );
    expect((rep2.findOne as () => unknown)()).rejects.toThrow("Other error");
    expect((rep2.findOneOrFail as () => unknown)()).rejects.toThrow(
      "Other error",
    );
    expect((rep2.find as () => unknown)()).rejects.toThrow("Other error");
    expect((rep2.findAndCount as () => unknown)()).rejects.toThrow(
      "Other error",
    );
    expect((rep2.findAll as () => unknown)()).rejects.toThrow("Other error");
    expect((rep2.removeAndFlush as () => unknown)()).rejects.toThrow(
      "Other error",
    );
    expect((rep2.flush as () => unknown)()).rejects.toThrow("Other error");
    expect((rep2.nativeInsert as () => unknown)()).rejects.toThrow(
      "Other error",
    );
    expect((rep2.nativeUpdate as () => unknown)()).rejects.toThrow(
      "Other error",
    );
    expect((rep2.nativeDelete as () => unknown)()).rejects.toThrow(
      "Other error",
    );
    expect((rep2.populate as () => unknown)()).rejects.toThrow("Other error");
    expect((rep2.count as () => unknown)()).rejects.toThrow("Other error");
  });

  it("should return the resolved value", async () => {
    expect(await (rep3.persistAndFlush as () => unknown)()).toBe(undefined);
    expect(await (rep3.findOne as () => unknown)()).toBe("value");
    expect(await (rep3.findOneOrFail as () => unknown)()).toBe("value");
    expect(await (rep3.find as () => unknown)()).toBe("value");
    expect(await (rep3.findAndCount as () => unknown)()).toBe("value");
    expect(await (rep3.findAll as () => unknown)()).toBe("value");
    expect(await (rep3.removeAndFlush as () => unknown)()).toBe(undefined);
    expect(await (rep3.flush as () => unknown)()).toBe("value");
    expect(await (rep3.nativeInsert as () => unknown)()).toBe("value");
    expect(await (rep3.nativeUpdate as () => unknown)()).toBe("value");
    expect(await (rep3.nativeDelete as () => unknown)()).toBe("value");
    expect(await (rep3.populate as () => unknown)()).toBe("value");
    expect(await (rep3.count as () => unknown)()).toBe("value");
  });
});

function createECONNNREFUSEDRepository() {
  const mockMethod = async () => {
    const err = new Error() as { code?: string };
    err.code = "ECONNREFUSED";
    throw err;
  };

  return mockRepository(mockMethod);
}

function createOtherErrorRepository() {
  const mockMethod = async () => {
    const err = new Error("Other error");
    throw err;
  };

  return mockRepository(mockMethod);
}

function createResolvingRepository() {
  const mockMethod = async () => {
    return "value";
  };

  return mockRepository(mockMethod);
}

function mockRepository(emMethod: () => unknown) {
  const emMock = {
    persistAndFlush: jest.fn().mockImplementation(emMethod),
    findOne: jest.fn().mockImplementation(emMethod),
    findOneOrFail: jest.fn().mockImplementation(emMethod),
    find: jest.fn().mockImplementation(emMethod),
    findAndCount: jest.fn().mockImplementation(emMethod),
    removeAndFlush: jest.fn().mockImplementation(emMethod),
    flush: jest.fn().mockImplementation(emMethod),
    nativeInsert: jest.fn().mockImplementation(emMethod),
    nativeUpdate: jest.fn().mockImplementation(emMethod),
    nativeDelete: jest.fn().mockImplementation(emMethod),
    populate: jest.fn().mockImplementation(emMethod),
    count: jest.fn().mockImplementation(emMethod),
    getContext: jest.fn().mockImplementation(() => emMock),
  } as unknown as EntityManager;

  return new BaseRepository<object>(emMock, Object);
}
