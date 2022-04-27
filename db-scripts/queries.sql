
-- create new user
insert into "USER" (username, email) VALUES ('foo', 'foo@mail.com');
insert into "USER" (username, email) VALUES ('bar', 'bar@mail.com');


-- create component
insert into "COMPONENT" (name, html) VALUES ('hello world', '<p>hello world</p>');
insert into "COMPONENT" (name, html) VALUES ('google link', '<a href="https://www.google.com">google</a>');


-- link components
insert into "USER_COMPONENT" (fk_user, fk_component) VALUES ('foo@mail.com', 1);
insert into "USER_COMPONENT" (fk_user, fk_component) VALUES ('foo@mail.com', 2);


-- update
update "COMPONENT"
    set html = '<p>hello world 2</p>'
where id = 1;


-- select
select C.html
from "USER" u
    join "USER_COMPONENT" UC on u.email = UC.fk_user
    join "COMPONENT" C on C.id = UC.fk_component
where u.username = 'foo';

select C.name, C.html
from "USER" u
    join "USER_COMPONENT" UC on u.email = UC.fk_user
    join "COMPONENT" C on C.id = UC.fk_component
where u.username = 'foo';

select C.name, C.html
from "USER" u
    join "USER_COMPONENT" UC on u.email = UC.fk_user
    join "COMPONENT" C on C.id = UC.fk_component
where u.username = 'bar';


-- create folder
insert into "FOLDER"(name, fk_user) values('buttons', 'foo@mail.com');


-- add component to folder
update "COMPONENT" c
set fk_folder = 1
where id = 1;

update "COMPONENT" c
set fk_folder = 1
where id = 2;


-- select all components of "foo" in the "buttons" folder
select c.name, c.html
from "FOLDER" f
    join "USER" u on f.fk_user = u.email
    join "COMPONENT" c on c.fk_folder = f.id
where u.username = 'foo';




-- add new column
alter table "USER"
    add password varchar(20) not null;




-- create enum
CREATE TYPE user_status AS ENUM ('pending', 'active', 'suspended', 'deleted');




-- stored procedure
CREATE OR REPLACE PROCEDURE sign_up (
    username varchar,
    email varchar,
    password varchar,
    confirmation_code text
) AS $$
DECLARE

BEGIN
    insert into "USER" (username, email, password, confirmation_code)
    VALUES ($1, $2, $3, $4);

END;
$$ LANGUAGE plpgsql;