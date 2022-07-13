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
    createdAt datetime    default current_timestamp,
    updatedAt datetime on update current_timestamp
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
    createdAt datetime default current_timestamp,
    updatedAt datetime on update current_timestamp
);

insert into categories(brand)
values ('MacOS'),
       ('Dell'),
       ('HP'),
       ('ASUS'), 
       ('Levono'),
       ('MSI');


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
    createdAt  datetime default current_timestamp,
    updatedAt  datetime on update current_timestamp,
    foreign key (category_id) references categories (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Category 01 MacOs
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

-- Category 02 Dell
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Vostro 3400  ',6,2,'Win 10','i5 1135G7','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256GB SSD','3 cell','dell-vostro-3400','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',800);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Inspiron 5415  ',14,2,'Win 10','R5 5500U','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256 GB','3 cell','laptop-dell-inspiron-5415','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',900);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Vostro 5410  ',14,2,'Win 10','i5 - 11320H','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512 GB','4 cell','laptop-dell-vostro-5410','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1000);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Vostro 3510  ',14,2,'Win 11','i3-1115G4','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256 GB','4 cell','laptop-dell-vostro-5410','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',600);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Inspiron 15 3511  ',14,2,'Win 10','i3-1115G4','4 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256 GB','3 cell','laptop-dell-inspiron-n3511','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',600);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Vostro 3405   ',14,2,'Win 10','AMD R5 - 3500U','8 GB','14 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512 GB','3 cell','laptop-dell-vostro-3405','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',800);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell G15 Ryzen Edition 5515   ',14,2,'Win 11','R7 5800H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512 GB','3 cell','laptop-dell-g15-ryzen-edition-5515','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1500);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) values ('Laptop Dell Latitude 3420   ',14,2,'Win 11 Pro','i5-1135G7','8 GB','14 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256 GB','3 cell','image-removebg-preview','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',950);


-- Category 03 HP
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP Gaming VICTUS 16',6,3,'Win 11','R7 5800H','8 GB','16.1 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD','6 cell','Laptop HP Gaming VICTUS 16','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1200);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP 340s G7',6,3,'Win 10','i3-1005G1','4 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256GB SSD','3 cell','Laptop HP 340s G7','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',500);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP EliteBook X360 1040 G8',6,3,'Win 10','i7-1165G7','16 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD','3 cell','Laptop HP EliteBook X360 1040 G8','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2100);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP ZBook Firefly 14 G8',6,3,'Win 10',' i5-1135G7','16 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD','6 cell','Laptop HP ZBook Firefly 14 G8','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1500);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP Envy 13',6,3,'Win 10','i7-1165G7','16 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD','6 cell','Laptop HP Envy 13','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1500);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP Pavilion 15',6,3,'Win 11','i7-1260P','16 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD','3 cell','Laptop HP Pavilion 15','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1200);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP Pavilion x360 14',6,3,'Win 11','i7-1165G7','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD','3 cell','Laptop HP Pavilion x360 14','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1150);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP 14s',6,3,'Win 11','i7-1165G7','8 GB','16.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD','3 cell','Laptop HP 14s','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',900);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP 15s',6,3,'Win 11','i5-1235U','8 GB','16.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD','3 cell','Laptop HP 15s','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',900);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP 240 G8',6,3,'Win 11','i5-1135G7','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD','3 cell','Laptop HP 240 G8','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',750);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP 340s',6,3,'Win 11','i5-1035G1','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD','3 cell','Laptop HP 340s','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',750);
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop HP Probook 450 G8',6,3,'Win 10','i5-1115G4','4 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','256GB SSD','3 cell','Laptop HP Probook 450 G8','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',550);


-- Category 04 Asus
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus TUF Gaming FX506LH',6,4,'Win 11','i5-10300H','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'2 cell','Laptop Asus TUF Gaming FX506LH','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1000);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus Vivobook 15 X1502ZA',6,4,'Win 11','i5-1240P','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Asus Vivobook 15 X1502ZA','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',850);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus ZenBook UX425EA',6,4,'Win 11','i5-1240P','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus ZenBook UX425EA','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1100);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus Gaming ROG Flow Z13 GZ301Z',6,4,'Win 11','i7-12700H','16 GB','13.4 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus Gaming ROG Flow Z13 GZ301Z','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2500);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus Zenbook 14X OLED Space Edition UX5401ZAS',6,4,'Win 11','i7-12700H','16 GB','14 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','1TB SSD',
'3 cell','Laptop Asus Zenbook 14X OLED Space Edition UX5401ZAS','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2000);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus ZenBook Duo UX482EA',6,4,'Win 11','i5-1135G7','8 GB','14 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Asus ZenBook Duo UX482EA','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1600);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus ZenBook UX482EA',6,4,'Win 11','i5-1135G7','8 GB','14 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus ZenBook UX482EA','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1500);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus TUF Gaming FA707RC',6,4,'Win 11','R7-6800H','8 GB','17.3 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus TUF Gaming FA707RC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1400);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus VivoBook Pro 15 OLED K3500P',6,4,'Win 11','i5-11300H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Asus VivoBook Pro 15 OLED K3500P','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1400);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus ZenBook UX325EA',6,4,'Win 11',' i7-1165G7','16 GB','13.3 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus ZenBook UX325EA','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1350);



insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus VivoBook Pro 14x OLED M7400QC',6,4,'Win 11','R5-5600H','16 GB','14 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus VivoBook Pro 14x OLED M7400QC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1400);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus ZenBook UX425E',6,4,'Win 11','i7-1165G7','16 GB','14 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus ZenBook UX425E','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1400);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus ExpertBook B9400CEA',6,4,'Win 11','i5-1135G7','8 GB','14 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus ExpertBook B9400CEA','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1350);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus VivoBook Pro 15 OLED M3500QC',6,4,'Win 11','R5-5600H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Asus VivoBook Pro 15 OLED M3500QC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1350);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus TUF Gaming FX517ZC',6,4,'Win 11','i5-12450H','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus TUF Gaming FX517ZC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1250);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus Rog Zephyrus Gaming G14 GA401QH',6,4,'Win 11',' R7-5800HS','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus Rog Zephyrus Gaming G14 GA401QH','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1250);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus Zenbook 14 OLED UX3402ZA',6,4,'Win 11','i5-1240P','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus Zenbook 14 OLED UX3402ZA','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1200);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus ZenBook Flip UX363EA',6,4,'Win 11','i5-1135G7','8 GB','13.3 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Asus ZenBook Flip UX363EA','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1200);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus ZenBook 14X OLED UM5401QA',6,4,'Win 11','R5-5600H','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Asus ZenBook 14X OLED UM5401QA','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1150);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus TUF Gaming FX706HC',6,4,'Win 11','i5-11400H','8 GB','17.3 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Asus TUF Gaming FX706HC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1100);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus TUF Gaming FX506HC',6,4,'Win 11','i5-11400H','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Asus TUF Gaming FX506HC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1050);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Asus TUF Gaming FX506HCB',6,4,'Win 11','i5-11400H','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Asus TUF Gaming FX506HCB','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1050);



-- Category 05 : Levono
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo IdeaPad Gaming 3 15IHU6',6,5,'Win 11','i5-11300H','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Lenovo IdeaPad Gaming 3 15IHU6','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',850);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo Ideapad 5 15ITL05',6,5,'Win 11','i5-1135G7','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Lenovo Ideapad 5 15ITL05','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',750);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo Ideapad 3 15ITL6',6,5,'Win 11','i5-1135G7','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Lenovo Ideapad 3 15ITL6','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',750);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo Gaming Legion 5 15ITH6',6,5,'Win 11','i7-11800H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'6 cell','Laptop Lenovo Gaming Legion 5 15ITH6','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1650);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo ThinkBook 14p G2 ACH',6,5,'Win 11','R5-5600H','16 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'6 cell','Laptop Lenovo ThinkBook 14p G2 ACH','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1000);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo ThinkPad P15s G2',6,5,'Win 11','i7-1165G7','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Lenovo ThinkPad P15s G2','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2000);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo ThinkPad P14s G2',6,5,'Win 11','i5-1135G7','16 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop Lenovo ThinkPad P14s G2','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1750);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo Yoga Duet 7 13ITL6',6,5,'Win 10','i7-1165G7','16 GB','13.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','1TB SSD',
'6 cell','Laptop Lenovo Yoga Duet 7 13ITL6','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1700);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo Gaming Legion 5 15ACH6',6,5,'Win 11','R7-5800H','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'6 cell','Laptop Lenovo Gaming Legion 5 15ACH6','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1450);


insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo Yoga Slim 7 Carbon 13ITL5',6,5,'Win 11','i5-1135G7','16 GB','13.3 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'6 cell','Laptop Lenovo Yoga Slim 7 Carbon 13ITL5','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1450);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo Ideapad 5 Pro 14ITL6',6,5,'Win 10','i7 -165G7','16 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'6 cell','Laptop Lenovo Ideapad 5 Pro 14ITL6','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1350);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo IdeaPad 5 Pro 16IHU6',6,5,'Win 11','i5-11300H','16 GB','16.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'6 cell','Laptop Lenovo IdeaPad 5 Pro 16IHU6','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1350);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop Lenovo Yoga Slim 7 14ITL05',6,5,'Win 10',' i7-1165G7','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop Lenovo Yoga Slim 7 14ITL05','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1300);


-- Category 06 : MSI
insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Modern 14 B5M',6,6,'Win 11','R5-5500U','8 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop MSI Modern 14 B5M','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',700);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming GF63 Thin 10SC',6,6,'Win 10','i7-10750H','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop MSI Gaming GF63 Thin 10SC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',950);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming GE66 Raider 11UG',6,6,'Win 10','i7-11800H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','2TB SSD',
'4 cell','Laptop MSI Gaming GE66 Raider 11UG','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2950);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Creator Z16P B12UGST',6,6,'Win 11','i7-12700H','32 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','2TB SSD',
'4 cell','Laptop MSI Creator Z16P B12UGST','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',4000);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming GE66 Raider 11UH',6,6,'Win 10','i7-11800H','32 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','2TB SSD',
'4 cell','Laptop MSI Gaming GE66 Raider 11UH','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',3850);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming GS66 Stealth 11UG',6,6,'Win 10','i7-11800H','32 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','2TB SSD',
'4 cell','Laptop MSI Gaming GS66 Stealth 11UG','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',3200);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Creator Z16 A12UET',6,6,'Win 10','i7-12700H','16 GB','16.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','2TB SSD',
'4 cell','Laptop MSI Creator Z16 A12UET','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',3000);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming Vector GP66 12UGS',6,6,'Win 10','i7-12700H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','2TB SSD',
'4 cell','Laptop MSI Gaming Vector GP66 12UGS','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2750);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming Leopard GP76 11UG',6,6,'Win 10','i7-11800H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','2TB SSD',
'4 cell','Laptop MSI Gaming Leopard GP76 11UG','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2600);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming Stealth 15M A11UEK',6,6,'Win 10','i7-11375H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop MSI Gaming Stealth 15M A11UEK','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',2050);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Creator M16 A12UC',6,6,'Win 11','i7-12700H','16 GB','16.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop MSI Creator M16 A12UC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1700);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming Pulse GL66 11UDK',6,6,'Win 10','i7-11800H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop MSI Gaming Pulse GL66 11UDK','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1700);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Katana GF76 11UE',6,6,'Win 11','i7-11800H','16 GB','17.3 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop MSI Katana GF76 11UE','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1550);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming GF65 10UE',6,6,'Win 11','i7-10750H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop MSI Gaming GF65 10UE','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1450);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming GF65 Thin 10UE',6,6,'Win 11','i5-10500H','16 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'4 cell','Laptop MSI Gaming GF65 Thin 10UE','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1350);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Katana Gaming GF66 11UC',6,6,'Win 11','i7-11800H','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop MSI Katana Gaming GF66 11UC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1300);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Prestige 14 A11SC',6,6,'Win 10','i7-1195G7','16 GB','14.0 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop MSI Prestige 14 A11SC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1250);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming GF63 Thin 11UD',6,6,'Win 11','i7-11800H','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop MSI Gaming GF63 Thin 11UD','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1200);

insert into products(name, quantity, category_id, os, chipset, ram, display, resolution,             camera, memory, pin, image, description, price) 
values ('Laptop MSI Gaming GF63 Thin 11UC',6,6,'Win 10','i7-11400H','8 GB','15.6 inch FHD','1920 x 1080 Pixels','1 camera 12 MP','512GB SSD',
'3 cell','Laptop MSI Gaming GF63 Thin 11UC','Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.',1000);

create table if not exists reviews
(
    id         int primary key auto_increment,
    username    varchar(20) not null,
    product_id int not null,
    content    text,
    rating     int,
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp,
    unique (username, product_id)
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
    createdAt  datetime default current_timestamp,
    updatedAt  datetime on update current_timestamp
);
insert into shipments(method, fee, description)
values ('By bike', '5', 'Delivery by bike'),
        ('Pick up in store', '0', 'Pick up in store');

create table if not exists payments
(
    id          int primary key auto_increment,
    method      text not null,
    description text,
    createdAt  datetime default current_timestamp,
    updatedAt  datetime on update current_timestamp
);
insert into payments(method, description)
values ('COD', 'Cash on delivery');

insert into payments(method, description)
values ('Paypal', 'Paypal');

create table tokens
(
    id          int         not null primary key auto_increment,
    username    varchar(20) not null,
    token       text        not null,
    is_expired  int         not null default 0,
    expire_date datetime    not null default current_timestamp on update current_timestamp
)