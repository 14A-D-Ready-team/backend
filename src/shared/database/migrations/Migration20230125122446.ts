import { Migration } from '@mikro-orm/migrations';

export class Migration20230125122446 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `category` (`id` int unsigned not null auto_increment primary key, `name` varchar(80) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `product` (`id` int unsigned not null auto_increment primary key, `name` varchar(100) not null, `description` varchar(500) not null, `full_price` numeric(10,0) not null, `discounted_price` numeric(10,0) null, `stock` mediumint not null, `category_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `product` add index `product_category_id_index`(`category_id`);');

    this.addSql('create table `customization` (`id` int unsigned not null auto_increment primary key, `description` varchar(120) not null, `option_count` tinyint not null, `product_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `customization` add index `customization_product_id_index`(`product_id`);');

    this.addSql('create table `option` (`id` int unsigned not null auto_increment primary key, `name` varchar(120) not null, `extra_cost` numeric(10,0) not null, `customization_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `option` add index `option_customization_id_index`(`customization_id`);');

    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `type` tinyint not null, `name` varchar(50) not null, `email` varchar(80) not null, `password` varchar(255) null, `status` tinyint not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');

    this.addSql('create table `token` (`id` varchar(36) not null, `type` tinyint not null, `user_id` int unsigned not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `token` add index `token_user_id_index`(`user_id`);');

    this.addSql('create table `customer` (`user_id` int unsigned not null, primary key (`user_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `buffet_worker` (`user_id` int unsigned not null, primary key (`user_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `buffet_owner` (`user_id` int unsigned not null, primary key (`user_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `admin` (`user_id` int unsigned not null, primary key (`user_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('alter table `product` add constraint `product_category_id_foreign` foreign key (`category_id`) references `category` (`id`) on update cascade;');

    this.addSql('alter table `customization` add constraint `customization_product_id_foreign` foreign key (`product_id`) references `product` (`id`) on update cascade;');

    this.addSql('alter table `option` add constraint `option_customization_id_foreign` foreign key (`customization_id`) references `customization` (`id`) on update cascade;');

    this.addSql('alter table `token` add constraint `token_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');

    this.addSql('alter table `customer` add constraint `customer_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `buffet_worker` add constraint `buffet_worker_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `buffet_owner` add constraint `buffet_owner_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `admin` add constraint `admin_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');
  }

}
