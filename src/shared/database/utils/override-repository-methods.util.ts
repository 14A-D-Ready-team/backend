import BaseRepository from "../base.repository";
import DbOfflineException from "../exceptions/db-offline.exception";

export default function overrideRepositoryMethods<T extends object>(
  repository: BaseRepository<T>,
) {
  const methodsToOverride: Array<keyof typeof repository> = [
    "persistAndFlush",
    "findOne",
    "findOneOrFail",
    "find",
    "findAndCount",
    "findAll",
    "removeAndFlush",
    "flush",
    "nativeInsert",
    "nativeUpdate",
    "nativeDelete",
    "populate",
    "count",
  ];

  methodsToOverride.forEach(m => {
    const originalMethod = repository[m] as (...args: unknown[]) => unknown;

    const wrapper = async (...args: unknown[]) => {
      try {
        return await originalMethod.bind(repository)(...args);
      } catch (error) {
        if (error?.code === "ECONNREFUSED") {
          throw new DbOfflineException();
        }
        throw error;
      }
    };

    Object.defineProperty(repository, m, { value: wrapper });
  });
}
