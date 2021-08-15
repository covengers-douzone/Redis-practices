-- test data
use chat;

-- user
desc user;
select * from user;
insert into user values(null,'user1','tae','N',now(),null,null,null,'user');
insert into user values(null,'user2','dada','N',now(),null,null,null,'user');
insert into user values(null,'user3','we','N',now(),null,null,null,'user');
insert into user values(null,'user4','wae','N',now(),null,null,null,'user');

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

update participant p join user u on p.userNo = u.no join room r on  p.roomNo = r.no 
set status = 'false'
where p.no > 1;
-- where u.name = 'tae' and r.title = 'JavaScript';

-- 방'JavaScript'에 host tae, member dada & we (participant no :1,2,3)
insert into participant values(null,'host','true',now(),now(),1,1);     -- participant no 1
insert into participant values(null,'member','true',now(),now(),1,2);
insert into participant values(null,'member','true',now(),now(),1,3);
-- 방'JavaScript'에 host tae, member we (participant no :4,5)
insert into participant values(null,'host','true',now(),now(),2,1);
insert into participant values(null,'member','true',now(),now(),2,3);

-- chat
desc chat;
select * from chat;
insert into chat values(null, 'text', now(), 'hi, I am tae',  0, 1);
insert into chat values(null, 'text', now(), 'hello~',  0, 2);