select * from user;

-- get room list 
select *
from room r
join participant p on r.no = p.roomNo
where p.userNo = 1
;

-- chat list
select * -- p.nickname, p.roomNo, c.notReadCount, c.contents
from participant p 
join chat c on p.no = c.participantNo
where p.roomNo = 1
;