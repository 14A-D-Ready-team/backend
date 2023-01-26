import { Category } from "@/category/entity";
import { Dictionary } from "lodash";

export type SeederContext = {
  categories: Dictionary<Category>;
};
