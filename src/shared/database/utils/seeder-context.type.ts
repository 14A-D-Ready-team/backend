import { Buffet } from "@/buffet";
import { Category } from "@/category/entity";
import { User } from "@/user";
import { Dictionary } from "lodash";

export type SeederContext = {
  categories: Dictionary<Category>;
  buffetOwners: User;
  buffets: Dictionary<Buffet>;
};
