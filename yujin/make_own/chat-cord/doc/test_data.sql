-- test data

-- user
desc user;
select * from user;
insert into user values(null,'user1','tae','N',now(),null,null,null,'user');
insert into user values(null,'user2','dada','N',now(),null,null,null,'user');
insert into user values(null,'user3','we','N',now(),null,null,null,'user');

-- room
desc room;
select * from room;
insert into room values(null,'JavaScript',null,'public', now());
insert into room values(null,'Python',null,'public', now());
insert into room values(null,'PHP',null,'public', now());
insert into room values(null,'C#',null,'public', now());
insert into room values(null,'Ruby',null,'public', now());
insert into room values(null,'Java',null,'public', now());

-- participant
desc participant;
select * from participant;
-- insert into participant values(null,1,1,'