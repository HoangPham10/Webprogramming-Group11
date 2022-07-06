drop table if exists users;
drop table if exists products;
drop table if exists orders_products;
drop table if exists categories;
drop table if exists orders;
drop table if exists shipments;
drop table if exists payments;
drop table if exists reviews;
drop table if exists tokens;

create table if not exists users
(
    id         int primary key auto_increment,
    username   varchar(20) unique not null,
    password   varchar(256)       not null,
    name       varchar(30),
    email      varchar(40),
    role       varchar(20) default 'user',
    address    varchar(50),
    phone      varchar(20),
    created_at datetime    default current_timestamp,
    updated_at datetime on update current_timestamp
);
insert into users(username, password, name, email, role, address, phone)
values ('dangvh', '$2y$10$2jWElpzfcMw9mi6p.uZr5e7IA1Mjo7yTNYJEYbzgexPssafiY9U0S', 'Vu Hai Dang', 'dangvh@gmail.com',
        'user', 'Bac Ninh Bac Ninh', '0911989755'),
       ('hoangtl', '$2y$10$2jWElpzfcMw9mi6p.uZr5e7IA1Mjo7yTNYJEYbzgexPssafiY9U0S', 'Tran Le Hoang', 'hoangtl@gmail.com',
        'user', 'Ha Noi Ha Noi', '0911989756'),
       ('van', '$2y$10$2jWElpzfcMw9mi6p.uZr5e7IA1Mjo7yTNYJEYbzgexPssafiY9U0S', 'Van H', 'van@gmail.com', 'user',
        'Ha Noi Ha Noi', '0911989757'),
       ('xon', '$2y$10$2jWElpzfcMw9mi6p.uZr5e7IA1Mjo7yTNYJEYbzgexPssafiY9U0S', 'Xon T', 'xon@gmail.com', 'user',
        'Ha Noi Ha Noi', '0911989758'),
       ('user1', '$2y$10$2jWElpzfcMw9mi6p.uZr5e7IA1Mjo7yTNYJEYbzgexPssafiY9U0S', 'User U1', 'user1@gmail.com', 'user',
        'BHa Noi Ha Noi', '0911989759'),
       ('user2', '$2y$10$2jWElpzfcMw9mi6p.uZr5e7IA1Mjo7yTNYJEYbzgexPssafiY9U0S', 'User U2', 'user2@gmail.com', 'user',
        'BHa Noi Ha Noi', '0911989751'),
       ('admin', '$2y$10$2jWElpzfcMw9mi6p.uZr5e7IA1Mjo7yTNYJEYbzgexPssafiY9U0S', 'Admin admin', 'admin@gmail.com',
        'admin', 'admin home', '01686868686');

create table if not exists categories
(
    id         int primary key auto_increment,
    brand      varchar(50),
    created_at datetime default current_timestamp,
    updated_at datetime on update current_timestamp
);

insert into categories(brand)
values ('IPhone'),
       ('Dell'),
       ('Xiaomi'),
       ('Oppo'), 
       ('Realme'),
       ('BlackBerry');


create table if not exists products
(
    id          int primary key auto_increment,
    name        varchar(100) unique not null,
    quantity    int                not null,
    category_id int,
    OS          varchar(30),
    chipset     varchar(256),
    ram         varchar(20),
    display     varchar(30),
    resolution  varchar(50),
    camera      varchar(100),
    memory      varchar(30),
    pin         varchar(20),
    image       text,
    description text,
    price       double             not null,
    created_at  datetime default current_timestamp,
    updated_at  datetime on update current_timestamp,
    foreign key (category_id) references categories (id) ON DELETE CASCADE ON UPDATE CASCADE
);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 16" 2021 M1 Pro Ram 32GB',6,1,'MacOS Ventura','Apple M1 Pro','32 GB','mini LED 16"','3456 x 2234 Pixels','1080p','1 TB','7756 mAh','product-1','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2799);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 16" 2021 M1 Pro 512GB  ',14,1,'MacOS Ventura','Apple M1 Pro','16 GB','mini LED 16"','3456 x 2234 Pixels','1080p','512 GB','7756 mAh','product-2','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2399);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 14" 2021 M1 Pro 512GB  ',17,1,'MacOS Ventura','Apple M1 Pro','16 GB','mini LED 14"','3024 x 1964 Pixels','1080p','512 GB','6687 mAh','product-3','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2199);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 14" 2021 M1 Pro Ram 32GB  ',14,1,'MacOS Ventura','Apple M1 Pro','32 GB','mini LED 14"','3024 x 1964 Pixels','1080p','512 GB','6687 mAh','product-4','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2299);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 13" 2020 M1 Ram 16GB  ',2,1,'MacOS Ventura','Apple M1','16 GB','Retina','2560 x 1600 Pixels','720p','512 GB','6687 mAh','product-5','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1599);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 13" 2022 M2 Ram 24GB  ',10,1,'MacOS Ventura','Apple M2','24 GB','Retina','2560 x 1600 Pixels','720p','512GB','5770 mAh','product-6','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1399);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Air 13" 2020 M1 512GB  ',9,1,'MacOS Ventura','Apple M1','8 GB','Retina','2560 x 1600 Pixels','720p','512 GB','5770 mAh','product-7','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1399);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Air 13" 2022 M2 New  ',2,1,'MacOS Ventura','Apple M2','32 GB','mini LED','3024 x 1964 Pixels','1080p','512 GB','5770 mAh','product-8','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1299);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 16" 2021 M1 Pro Max 512GB  ',9,1,'MacOS Ventura','Apple M1 Pro Max','16 GB','mini LED 16"','3456 x 2234 Pixels','1080p','512 GB','7756 mAh','product-11','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2799);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 16" 2021 M1 Pro Max 1TB  ',10,1,'MacOS Ventura','Apple M1 Pro Max','16 GB','mini LED 16"','3456 x 2234 Pixels','1080p','1 TB','7756 mAh','product-13','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2999);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 16" 2021 M1 Pro Max Ram 32GB  ',2,1,'MacOS Ventura','Apple M1 Pro Max','32 GB','mini LED 16"','3456 x 2234 Pixels','1080p','1 TB','7756 mAh','product-12','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',3299);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 14" 2021 M1 Pro Max 512GB  ',9,1,'MacOS Ventura','Apple M1 Pro Max','16 GB','mini LED 14"','3024 x 1964 Pixels','1080p','512 GB','6687 mAh','product-15','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2599);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 14" 2021 M1 Pro Max 1TB  ',10,1,'MacOS Ventura','Apple M1 Pro Max','16 GB','mini LED 14"','3024 x 1964 Pixels','1080p','1 TB','6687 mAh','product-9','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2799);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 14" 2021 M1 Pro Max Ram 32GB  ',2,1,'MacOS Ventura','Apple M1 Pro Max','32 GB','mini LED 14"','3024 x 1964 Pixels','1080p','1 TB','6687 mAh','product-10','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',3099);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 13" 2020 M1 512GB  ',17,1,'MacOS Ventura','Apple M1','8 GB','Retina"','2560 x 1600 Pixels','720p','512 GB','5770 mAh','product-16','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1499);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Macbook Pro 13" 2020 M1 8GB 256GB  ',14,1,'MacOS Ventura','Apple M1','8 GB','Retina','2560 x 1600 Pixels','720p','256 GB','5770 mAh','product-14','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1199);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Vostro 3400  ',6,2,'Win 10','i5 1135G7','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256GB SSD','3 cell','dell-vostro-3400','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',800);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Inspiron 5415  ',14,2,'Win 10','R5 5500U','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256 GB','3 cell','laptop-dell-inspiron-5415','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',900);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Vostro 5410  ',14,2,'Win 10','i5 - 11320H','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512 GB','4 cell','laptop-dell-vostro-5410','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1000);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Vostro 3510  ',14,2,'Win 11','i3-1115G4','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256 GB','4 cell','laptop-dell-vostro-5410','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',600);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Inspiron 15 3511  ',14,2,'Win 10','i3-1115G4','4 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256 GB','3 cell','laptop-dell-inspiron-n3511','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',600);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Vostro 3405   ',14,2,'Win 10','AMD R5 - 3500U','8 GB','14 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512 GB','3 cell','laptop-dell-vostro-3405','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',800);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell G15 Ryzen Edition 5515   ',14,2,'Win 11','R7 5800H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512 GB','3 cell','laptop-dell-g15-ryzen-edition-5515','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1500);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Latitude 3420   ',14,2,'Win 11 Pro','i5-1135G7','8 GB','14 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256 GB','3 cell','image-removebg-preview','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',950);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy A32 ',18,2,'Android 11','MediaTek Helio G80 8 nhân','6 GB','Super AMOLED 6.4','Full HD+ (1080 x 2400 Pixels)','Chính 64 MP & Phụ 8 MP, 5MP, 5MP, 20 MP','128 GB','5000 mAh','product-17','Bảo hành chính hãng 12 tháng. Bao xài đổi trả trong 15 ngày.',246);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy S21 Ultra 256GB 5G ',12,2,'Android 11','Exynos 2100 8 nhân','12 GB','Dynamic AMOLED 2X 6.8','2K+ (1440 x 3200 Pixels)','Chính 108 MP & Phụ 12 MP, 10 MP, 10 MP, 40 MP','256 GB','5000 mAh','product-18','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong vòng 15 ngày đầu.',1067);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy S21 Ultra 128GB 5G ',18,2,'Android 11','Exynos 2100 8 nhân','12 GB','Dynamic AMOLED 2X 6.8','2K+ (1440 x 3200 Pixels)','Chính 108 MP & Phụ 12 MP, 10 MP, 10 MP, 40 MP','128 GB','5000 mAh','product-19','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong vòng 15 ngày đầu.',950);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy S21 Plus 128GB 5G ',23,2,'Android 11','Exynos 2100 8 nhân','8 GB','Dynamic AMOLED 2X 6.7','Full HD+ (1080 x 2400 Pixels)','Chính 12 MP & Phụ 64 MP, 12 MP, 10 MP','128 GB','4800 mAh','product-20','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong vòng 15 ngày đầu.',745);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy S21 Plus 256GB 5G ',13,2,'Android 11','Exynos 2100 8 nhân','8 GB','Dynamic AMOLED 2X 6.7','Full HD+ (1080 x 2400 Pixels)','Chính 12 MP & Phụ 64 MP, 12 MP, 10 MP','256 GB','4800 mAh','product-21','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong vòng 15 ngày đầu.',825);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy A12 ',20,2,'Android 10','MediaTek Helio G35 8 nhân','4 GB','PLS TFT LCD','HD+ (720 x 1600 Pixels)','Chính 48 MP & Phụ 5 MP, 2 MP, 2 MP, 8 MP','128 GB','5000 mAh','product-22','Bảo hành chính hãng 12 tháng. Bao xài đổi trả 15 ngày đầu.',151);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy Note 20 Ultra ',6,2,'Android 10','Exynos 990 8 nhân','8 GB','Dynamic AMOLED 2X','2K+ (1440 x 3088 Pixels)','Chính 108 MP & Phụ 12 MP, 12 MP, cảm biến Laser AF, 10 MP','256 GB','4500 mAh','product-23','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong vòng 15 ngày đầu.',803);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy A52 ',12,2,'Android 11','Snapdragon 720G 8 nhân','8 GB','Super AMOLED','Full HD+ (1080 x 2400 Pixels)','Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP, 32 MP','128 GB','4500 mAh','product-24','Bảo hành chính hãng 12 tháng. Bao xài đổi trả trong 15 ngày.',336);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy A72 ',10,2,'Android 11','Snapdragon 720G 8 nhân','8 GB','Super AMOLED 6.7','Full HD+ (1080 x 2400 Pixels)','Chính 64 MP & Phụ 12 MP, 8 MP, 5 MP, 32 MP','256 GB','5000 mAh','product-25','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong vòng 15 ngày đầu.',425);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy A02s 4GB/64GB ',13,2,'Android 10','Snapdragon 450 8 nhân','4 GB','PLS TFT LCD 6.5','HD+ (720 x 1600 Pixels)','Chính 13 MP & Phụ 2 MP, 2 MP, 5 MP','64 GB','5000 mAh','product-26','Bảo hành chính hãng 12 tháng. Bao xài đổi trả trong 15 ngày đầu.',129);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Samsung Galaxy S20 FE 256GB ',17,2,'Android 11','Snapdragon 865 8 nhân','8 GB','Super AMOLED','Full HD+ (1080 x 2400 Pixels)','Chính 12 MP & Phụ 12 MP, 8 MP, 32 MP','256 GB','4500 mAh','product-27','Bảo hành 12 tháng chính hãng. bao xài đổi trả trong vòng 15 ngày đầu.',608);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Xiaomi Redmi Note 10 6GB/128GB ',15,3,'Android 11','Snapdragon 678 8 nhân','6 GB','AMOLED 6.43','Full HD+ (1080 x 2400 Pixels)','Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP, 13 MP','128 GB','5000 mAh','product-28','Bảo hành chính hãng 18 tháng. Bao xài đổi trả trong 15 ngày.',195);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Xiaomi Mi 10T Pro 5G - 8GB/128GB',18,3,'Android 10','Snapdragon 865 8 nhân','8 GB','IPS LCD 6.67','Full HD+ (1080 x 2440 Pixels), Tần số quét 144Hz','Chính 108 MP & Phụ 13 MP, 5 MP, 20 MP','128 GB','5000 mAh','product-29','Bảo hành 24 tháng chính hãng, bao xài đổi trả trong 15 ngày đầu.',433);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Xiaomi Mi 10T Pro 5G - 8GB/256GB',7,3,'Android 10','Snapdragon 865 8 nhân','8 GB','IPS LCD 6.67','Full HD+ (1080 x 2440 Pixels), Tần số quét 144Hz','Chính 108 MP & Phụ 13 MP, 5 MP, 20 MP','256 GB','5000 mAh','product-30','Bảo hành 24 tháng chính hãng, bao xài đổi trả trong 15 ngày đầu.',476);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Xiaomi Redmi 9T 4GB/64GB  DGW',7,3,'Android 10','Snapdragon 662 8 nhân','4 GB','IPS LCD','Full HD+ (1080 x 2340 Pixels)','Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP, 8 MP','64 GB','6000 mAh','product-31','Bảo hành chính hãng 18 tháng. Bao xài đổi trả trong 15 ngày đầu.',156);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Xiaomi Redmi Note 10S ',14,3,'Android 11','MediaTek Helio G95 8 nhân','8 GB','AMOLED','Full HD+ (1080 x 2400 Pixels)','Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP, 13 MP','128 GB','5000 mAh','product-32','Bảo hành chính hãng 18 tháng. Bao xài đổi trả trong 15 ngày đầu.',282);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Xiaomi Redmi Note 10 5G ',21,3,'Android 11','MediaTek Dimensity 700 8 nhân','4 GB','IPS LCD','Full HD+ (1080 x 2400 Pixels)','Chính 48 MP & Phụ 2 MP, 2 MP, 8 MP','128 GB','5000 mAh','product-33','Bảo hành chính hãng 18 tháng. Bao xài đổi trả trong 15 ngày đầu.',216);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Xiaomi Redmi Note 10 Pro 8GB/128GB  Phiên bản MiFan Edition ',17,3,'Android 11','Snapdragon 732G','8 GB','AMOLED','Full HD+ (1080 x 2400 Pixels)','Chính 108 MP & Phụ 8 MP, 5 MP, 2 MP, 16 MP','128 GB','5020 mAh','product-34','Bảo hành chính hãng 18 tháng. Bao xài đổi trả trong 15 ngày đầu.',295);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Xiaomi Redmi Note 10 Pro 6GB/128GB ',23,3,'Android 11','Snapdragon 732G 8 nhân','6 GB','AMOLED 6.67','Full HD+ (1080 x 2400 Pixels)','Chính 108 MP & Phụ 8 MP, 5 MP, 2 MP, 16 MP','128 GB','5020 mAh','product-35','Bảo hành chính hãng 18 tháng. Bao xài đổi trả trong 15 ngày.',273);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Xiaomi Redmi Note 10 Pro 8GB/128GB ',18,3,'Android 11','Snapdragon 732G 8 nhân','8 GB','AMOLED 6.67','Full HD+ (1080 x 2400 Pixels)','Chính 108 MP & Phụ 8 MP, 5 MP, 2 MP, 16 MP','128 GB','5020 mAh','product-36','Bảo hành chính hãng 18 tháng. Bao xài đổi trả trong 15 ngày.',295);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Xiaomi Redmi Note 10 4GB/64GB ',21,3,'Android 11','Snapdragon 678 8 nhân','4 GB','AMOLED 6.43','Full HD+ (1080 x 2400 Pixels)','Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP, 13 MP','64 GB','5000 mAh','product-37','Bảo hành chính hãng 18 tháng. Bao xài đổi trả trong 15 ngày.',169);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('OPPO Reno5 ',5,4,'Android 11','Snapdragon 720G 8 nhân','8 GB','AMOLED 6.43','Full HD+ (1080 x 2400 Pixels)','Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP, 44 MP','128 GB','4310 mAh','product-38','Bảo hành chính hãng 12 tháng. Bao xài đổi trả 15 ngày đầu.',377);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Oppo A74 8G/128G',10,4,'Android 11','Snapdragon 662 8 nhân','8 GB','AMOLED','Full HD+ (1080 x 2400 Pixels)','Chính 48 MP & Phụ 2 MP, 2 MP, 16 MP','128 GB','5000 mAh','product-39','Bảo hành 12 tháng chính hãng',290);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('OPPO Find X3 Pro 5G ',11,4,'Android 11','Snapdragon 888 8 nhân','12 GB','AMOLED','Đang cập nhật','Đang cập nhật, 32 MP','256 GB','4500 mAh','product-40','Bảo hành 12 tháng chính hãng',1173);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('OPPO A54 ',19,4,'Android 10','MediaTek Helio P35 8 nhân','4 GB','IPS LCD','HD+ (720 x 1600 Pixels)','Chính 13 MP & Phụ 2 MP, 2 MP, 16 MP','128 GB','5000 mAh','product-41','Bảo hành chính hãng 12 tháng. Bao xài đổi trả trong 15 ngày đầu.',182);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('OPPO A94 ',9,4,'Android 11','MediaTek Helio P95 8 nhân','8 GB','OLED 6.4','Full HD+ (1080 x 2400 Pixels)','Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP, 16 MP','128 GB','4310 mAh','product-42','THÔNG TIN BẢO HÀNH',334);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('OPPO Reno5 5G ',15,4,'Android 11','Snapdragon 765G 8 nhân','8 GB','AMOLED 6.43','Full HD+ (1080 x 2400 Pixels)','Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP, 32 MP','128 GB','4300 mAh','product-43','THÔNG TIN BẢO HÀNH',441);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('OPPO A15s ',20,4,'Android 10','MediaTek Helio P35 8 nhân','4 GB','LCD 6.52','HD+ (720 x 1600 Pixels)','Chính 13 MP & Phụ 2 MP, 2 MP, 8 MP','64 GB','4230 mAh','product-44','Bảo hành 12 tháng chính hãng',173);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Oppo A93 - 8GB/128GB ',21,4,'Android 10','MediaTek Helio P95 8 nhân','8 GB','AMOLED','Full HD+ (1080 x 2400 Pixels)','Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP, Chính 16 MP & Phụ 2 MP','128 GB','4000 mAh','product-45','Bảo hành 12 tháng chính hãng, bao xài đổi trả 15 ngày đầu.',241);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('OPPO A15 ',23,4,'Android 10','MediaTek Helio P35 8 nhân','3 GB','IPS LCD 6.52','HD+ (720 x 1600 Pixels)','Chính 13 MP & Phụ 2 MP, 2 MP, 8 MP','32 GB','4230 mAh','product-46','Bảo hành chính hãng 12 tháng. Bao xài đổi trả 15 ngày đầu.',151);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Oppo A12 - 3GB/32GB ',11,4,'Android 11','Đang cập nhật','3 GB','IPS LCD 6.22','HD+ (720 x 1520 Pixels)','Chính 13 MP & Phụ 2 MP, 5 MP','32 GB','4230 mAh','product-47','Chính hãng 12 tháng, bao xài - đổi trả trong 15 ngày đầu. Gói bảo hành mở rộng H-care, Vip-Care và H-Care Platinum để An tâm bảo hành - Sử dụng lâu dài',110);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Oppo A53 - 4GB/128GB ',23,4,'Android 11','Đang cập nhật','4 GB','IPS LCD 6.5','HD+ (720 x 1600 Pixels)','Chính 13 MP & Phụ 2 MP, 2 MP, 16 MP','128 GB','5000 mAh','product-48','Chính hãng 12 tháng, bao xài - đổi trả trong 15 ngày đầu, Gói bảo hành mở rộng H-care, Vip-Care và H-Care Platinum để An tâm bảo hành - Sử dụng lâu dài',171);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Oppo Reno4',7,4,'Android 11','Đang cập nhật','8 GB','AMOLED 6.4','Full HD+ (1080 x 2400 Pixels)','Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP, Chính 32 MP & Phụ cảm biến thông minh A.I','128 GB','4015 mAh','product-49','Chính hãng 12 tháng, bao xài - đổi trả trong 15 ngày đầu. Gói bảo hành mở rộng H-care, Vip-Care và H-Care Platinum để An tâm bảo hành - Sử dụng lâu dài',280);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Oppo Reno4 Pro',9,4,'Android 11','Đang cập nhật','8 GB','AMOLED 6.5','Full HD+ (1080 x 2400 Pixels)','Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP, 32 MP','256 GB','4000 mAh','product-50','- Chính hãng 12 tháng, bao xài - đổi trả trong 15 ngày đầu. Gói bảo hành mở rộng H-care, Vip-Care và H-Care Platinum để An tâm bảo hành - Sử dụng lâu dài',425);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme 8 Pro ',22,5,'Android 11','Snapdragon 720G 8 nhân','8 GB','Super AMOLED','Full HD+ (1080 x 2400 Pixels)','Chính 108 MP & Phụ 8 MP, 2 MP, 2 MP, 16 MP','128 GB','4500 mAh','product-51','Bảo hành chính hãng 12 tháng. Bao xài đổi trả trong 15 ngày đầu.',377);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme 8 ',10,5,'Android 11','MediaTek Helio G95','8 GB','Super AMOLED','Full HD+ (1080 x 2400 Pixels)','Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP, 16 MP','128 GB','5000 mAh','product-52','Bảo hành chính hãng 12 tháng. Bao xài đổi trả trong 15 ngày đầu.',316);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme C25 ',19,5,'Android 11','MediaTek Helio G70','4 GB','IPS LCD','HD+ (720 x 1600 Pixels)','Chính 48 MP & Phụ 2 MP, 2 MP, 8 MP','128 GB','6000 mAh','product-53','Bảo hành 12 tháng chính hãng',193);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme C20 ',11,5,'Android 10','MediaTek Helio G35 8 nhân','2 GB','LCD 6.5','HD+ (720 x 1600 Pixels)','8 MP, 5 MP','32 GB','5000 mAh','product-54','Bảo hành chính hãng 12 tháng. Bao xài đổi trả trong 15 ngày đầu.',106);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme C15 ',24,5,'Android 10','Snapdragon 460 8 nhân','4 GB','IPS LCD','HD+ (720 x 1600 Pixels)','Chính 13 & Phụ 8 MP, 2 MP, 2 MP, 8 MP','64 GB','6000 mAh','product-55','Bảo hành chính hãng 12 tháng. Bao xài đổi trả 15 ngày đầu.',164);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme C17 - 6GB/128GB ',10,5,'Android 10','Snapdragon 460 8 nhân','6 GB','IPS LCD 6.5','HD+ (720 x 1600 Pixels)','Chính 13 MP & Phụ 8 MP, 2 MP, 2 MP, 8 MP','128 GB','5000 mAh','product-56','Bảo hành chính hãng 12 tháng. Bao xài đổi trả 15 ngày đầu.',202);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme C12 - 3GB/32GB - Pin 6000 mAh',17,5,'Android 11','Đang cập nhật','3 GB','IPS LCD 6.52','HD+ (720 x 1600 Pixels)','Chính 13 MP & Phụ 2 MP, 2 MP, 5 MP','32 GB','6000 mAh','product-57','Bảo hành 12 tháng chính hãng. Bao xài đổi trả trong vòng 15 ngày đầu tiên',141);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme 7 ',20,5,'Android 10','MediaTek Helio G95 8 nhân','8 GB','IPS LCD','Full HD+ (1080 x 2400 Pixels)','Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP, 16 MP','128 GB','5000 mAh','product-58','Bảo hành 12 tháng chính hãng. Bao xài đổi trả trong vòng 15 ngày đầu tiên',216);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme 7 pro ',22,5,'Android 10','Snapdragon 720G 8 nhân','8 GB','Super AMOLED 6.4','Full HD+ (1080 x 2400 Pixels)','Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP, 32 MP','128 GB','4500 mAh','product-59','Bảo hành 12 tháng chính hãng. Bao xài đổi trả trong vòng 15 ngày đầu tiên',323);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme C11 - 2GB/32GB ',15,5,'Android 10','MediaTek Helio G35 8 nhân','2 GB','IPS LCD 6.5','HD+ (720 x 1560 Pixels)','Chính 13 MP & Phụ 2 MP, 5 MP','32 GB','5000 mAh','product-60','Bảo hành 12 tháng chính hãng. Bao xài đổi trả trong vòng 15 ngày đầu tiên',106);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme C11 - 2021',5,5,'Android 10','Mali-G52 MC2','2 GB','IPS LCD 6.5','HD+ (720 x 1560 Pixels)','Chính 13 MP & Phụ 2 MP, 5 MP','32 GB','5000 mAh','product-61','Bảo hành 12 tháng chính hãng. Bao xài đổi trả trong vòng 15 ngày đầu tiên',106);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Realme 7i ',23,5,'Android 10','Snapdragon 662 8 nhân','8 GB','IPS LCD 6.5','HD+ (720 x 1600 Pixels)','Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP, 16 MP','128 GB','5000 mAh','product-62','Bảo hành 12 tháng chính hãng. bao xài đổi trả trong vòng 15 ngày đầu.',233);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Blackberry Key One - Black ',15,6,'Android 11','Đang cập nhật','4 GB','IPS LCD 4.5','1080 x 1620 Pixels','12 MP, 8 MP','64 GB','3505 mAh','product-63','Bảo hành chính hãng 12 tháng. Bao xài đổi trả trong 15 ngày đầu.',186);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Blackberry Key One - Silver ',25,6,'Android 11','Đang cập nhật','3 GB','IPS LCD 4.5','1080 x 1620 Pixels','12 MP, 8 MP','32 GB','3505 mAh','product-64','Chính hãng 12 tháng',173);

create table if not exists reviews
(
    id         int primary key auto_increment,
    user_id    int not null,
    product_id int not null,
    content    text,
    rating     int,
    created_at datetime default current_timestamp,
    unique (user_id, product_id)
);

create table if not exists orders_products
(
    id          int primary key auto_increment,
    order_id    int not null,
    product_id  int not null,
    unique (order_id, product_id),
    product_qty int not null check ( product_qty >= 0 )
);
insert into orders_products(id, order_id, product_id, product_qty)
values (1, 1, 1, 1);

create table if not exists orders
(
    id          int primary key auto_increment,
    user_id     int         not null,
    phone       varchar(20) not null,
    address     text        not null,
    shipment_id int         not null,
    payment_id  int         not null,
    date        datetime default current_timestamp,
    total_bill  double
);
insert into orders(id, user_id, phone, address, shipment_id, payment_id, total_bill)
values (1, 1, '09', 'abc', 1, 1, 1100);

create table if not exists shipments
(
    id          int primary key auto_increment,
    method      text   not null,
    fee         double not null,
    description text,
    created_at  datetime default current_timestamp,
    updated_at  datetime on update current_timestamp
);
insert into shipments(method, fee, description)
values ('By bike', '5', 'Delivery by bike'),
        ('Pick up in store', '0', 'Pick up in store');

create table if not exists payments
(
    id          int primary key auto_increment,
    method      text not null,
    description text,
    created_at  datetime default current_timestamp,
    updated_at  datetime on update current_timestamp
);
insert into payments(method, description)
values ('COD', 'Cash on delivery');

create table tokens
(
    id          int         not null primary key auto_increment,
    username    varchar(20) not null,
    token       text        not null,
    is_expired  int         not null default 0,
    expire_date datetime    not null default current_timestamp on update current_timestamp
)