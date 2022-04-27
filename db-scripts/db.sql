create table "USER"
(
    username varchar(20),
    email    varchar(50) not null
        constraint """user""_pk"
            primary key
);

alter table "USER"
    owner to postgres;

create unique index """user""_email_uindex"
    on "USER" (email);

create unique index """user""_username_uindex"
    on "USER" (username);



-------------------------------------------

create table "USER_COMPONENT"
(
    fk_user      varchar(50) not null
        constraint fk_user
            references "USER"
            on update cascade on delete cascade,
    fk_component integer     not null
        constraint fk_component
            references "COMPONENT"
            on update cascade on delete cascade,
    constraint user_component_pk
        primary key (fk_user, fk_component)
);

alter table "USER_COMPONENT"
    owner to postgres;



-------------------------------------------



create table "FOLDER"
(
    id      serial
        constraint """folder""_pk"
            primary key,
    name    varchar(50) default '(no name)'::character varying,
    fk_user varchar(50) not null
        constraint folder_user_email_fk
            references "USER"
            on update cascade on delete cascade
);

alter table "FOLDER"
    owner to postgres;

create unique index """folder""_id_uindex"
    on "FOLDER" (id);


-------------------------------------------


create table "COMPONENT"
(
    id        serial
        constraint """component""_pk"
            primary key,
    name      varchar(50) default '(no name)'::character varying,
    notes     text        default ''::text,
    html      text        default ''::text,
    css       text        default ''::text,
    js        text        default ''::text,
    fk_folder integer
        constraint component_folder_id_fk
            references "FOLDER"
            on delete set null
);

alter table "COMPONENT"
    owner to postgres;

create unique index """component""_id_uindex"
    on "COMPONENT" (id);



-------------------------------------------



create sequence products_id_seq
    as integer;

alter sequence products_id_seq owner to postgres;

alter sequence products_id_seq owned by products.id;

-------------------------------------------


create sequence "COMPONENT_id_seq"
    as integer;

alter sequence "COMPONENT_id_seq" owner to postgres;

alter sequence "COMPONENT_id_seq" owned by "COMPONENT".id;


-------------------------------------------
create sequence "FOLDER_id_seq"
    as integer;

alter sequence "FOLDER_id_seq" owner to postgres;

alter sequence "FOLDER_id_seq" owned by "FOLDER".id;

