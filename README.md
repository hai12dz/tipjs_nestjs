section 29
string redis
string redis-cli
---
# Redis
redis kieu du lieu string bao gom cac cach luu data nhu sau: embstring luu data <= 44bytes >,raw >44 bytes ,int luu so; sử dụng string redis làm 1 đối tượng cache trong db. vi du khi trien khai 3 server cho web, user login o 1 server, thanh cong, server se luu thong tin user vao redis, khi user request o server khac, server do se lay thong tin user tu redis de xac thuc ma khong can phai login lai
# Cac lenh thao tac voi string redis
set key value 
get key
del key
exists key
incr key //tang gia tri value cua key len 1
decr key //giam gia tri value cua key xuong 1
incrby key 10 //tang gia tri key len 10
decrby key 10 //giam gia tri key xuong 10
mset key1 value1 key2 value2
mget key1 key2
keys 'n*' //tim tat ca key bat dau bang n
expire key 60 //dat thoi gian song cho key la 60s
ttl key //xem thoi gian con lai cua key
type key //xem kieu du lieu cua key
set key value ex 60 //dat ten key,value,thoi gian song cho key la 60s
setnx key value //chi dat key neu key chua ton tai

redis hash, su dung hash o anh duoi
hset key field value //tao hash
hget key field //lay value cua field trong hash
hdel key field //xoa field trong hash
hmset key field1 value1 field2 value2 //tao hash voi nhieu field
hmget key field1 field2 //lay value cua nhieu field trong hash
hgetall key //lay tat ca field va value trong hash
hlen key //dem so field trong hash
hexists key field //kiem tra field co ton tai trong hash khong
hincrby key field 10 //tang gia tri cua field len 10
hkeys key //lay tat ca field trong hash
hvals key //lay tat ca value trong hash
![alt text](image.png)


redis list, su dung lam hang doi tin nhan
lpush key value1 value2 //them value vao ben trai list
rpush key value1 value2 //them value vao ben phai list
lrange key start stop //lay tat ca phan tu trong list (start va stop la chi so cua phan tu trong list, bat dau tu 0, ket thuc la -1)
lpop key //lay va xoa 1 phan tu ben trai list
rpop key //lay va xoa 1 phan tu ben phai list
lpop key count //lay va xoa count phan tu ben trai list
rpop key count //lay va xoa count phan tu ben phai list
lindex key index //lay phan tu tai chi so index trong list
llen key //dem so phan tu trong list
lrem key count value //xoa count phan tu co gia tri value trong list
ltrim key start stop //cat list tu chi so start den chi so stop
exists key //kiem tra list co ton tai khong
lset key index value //cap nhat phan tu tai chi so index trong list
linsert key before|after pivot value //chen value vao truoc hoac sau phan tu co gia tri pivot trong list

redis set, su dung de luu tru cac gia tri khong trung lap, phat trien tinh nang like, ban chung nhu facebook
sadd key member1 member2 //them member vao set
srem key member1 member2 //xoa member khoi set
smembers key //lay tat ca member trong set
scard key //dem so member trong set
sismember key member //kiem tra member co ton tai trong set khong
srandmember key count //lay ngau nhien count member trong set
spop key count //lay va xoa ngau nhien count member trong set
smove source destination member //chuyen member tu set source sang set destination
sinter key1 key2 //lay giao cua 2 set
sdiff key1 key2 //lay nhung member khong co trong set key2

redis sorted set, xep hang san pham
zadd key score1 member1 score2 member2 //them member vao sorted set voi diem so tuong ung
zrem key member1 member2 //xoa member khoi sorted set
zrange key start stop //lay tat ca member trong sorted set theo thu tu tang dan cua diem so (start va stop la chi so cua member trong sorted set, bat dau tu 0, ket thuc la -1)
zrevrange key start stop //lay tat ca member trong sorted set theo thu tu giam dan cua diem so (start va stop la chi so cua member trong sorted set, bat dau tu 0, ket thuc la -1)
zcard key //dem so member trong sorted set
zincrby key increment member //tang diem so cua member len increment
zrangebyscore key min max //lay tat ca member trong sorted set co diem so trong khoang tu min den max
zscore key member //lay diem so cua member trong sorted set

transaction redis
multi //bat dau giao dich
exec //ket thuc giao dich
discard //huy giao dich
watch key1 key2 //theo doi thay doi cua key1,key2 neu co thay doi thi giao dich se bi huy

# vi du
neu trong transaction co loi cu phap thi khi exec xong toan bo giao dich se bi huy
neu trong transaction co 1 key bi thay doi boi ben ngoai thi khi exec xong toan bo giao dich se bi huy
neu trong transaction ko co loi cu phap nhung co loi logic thi khi exec xong toan bo giao dich van duoc thuc hien, dong nao loi thi se bi loi.


### mysql index
create index idx_name on table_name(column_name(length)) [asc|desc];
alter table table_name add index idx_name(column_name(length)) [asc|desc];
alter table table_name drop index idx_name;


1.normal index: index binh thuong, ko co bat ki rang buoc nao, muc dich la cai thien hieu suat truy van
create index idx_name on table_name(column_name(length)) [asc|desc];
example: create index idx_name on users(name(10)) asc;
2.unique index: index duy nhat, ko cho phep gia tri trung lap, hay dung cho email hoac cccd
create unique index idx_name on table_name(column_name(length)) [asc|desc];
example: create unique index idx_name on users(email(20)) desc;
3.fulltext index: index toan van, chi su dung cho cac truong kieu text, varchar, char
create fulltext index idx_name on table_name(column_name);
example: create fulltext index idx_name on posts(content);
4.primary index: index chinh, moi bang chi co 1 primary index, ko cho phep gia tri null, gia tri phai duy nhat
Primary key(id) //id la primary key
5.composite index: index hop, index tren nhieu cot
create index idx_name on table_name(column1(length), column2(length)) [asc|desc];
example: create index idx_name on users(name(10), email(20)) asc;

### vi du ve composite index
“Nguyên tắc ngoài cùng bên trái” = Khi tạo index nhiều cột, bạn chỉ phát huy index được nếu WHERE,
ORDER BY, GROUP BY, JOIN bắt đầu từ cột đầu tiên (ngoài cùng bên trái) trong định nghĩa index.
Vì BTREE index lưu dữ liệu theo thứ tự từ trái sang phải:
Đầu tiên sắp xếp theo a.
Trong cùng 1 giá trị a, sắp xếp tiếp theo b.
Trong cùng 1 giá trị (a,b), sắp xếp tiếp theo c.
👉 Nếu bạn bỏ qua a, MySQL không biết nhảy vào nhánh nào của cây, nên buộc phải bỏ index và quét toàn bảng.
CREATE TABLE test_table_001 (
    id INT PRIMARY KEY,
    a INT,
    b INT,
    c INT,
    d INT,
    INDEX idx_abc (a, b, c) -- Composite index on columns a, b, and c
);

danh composite index theo cong thuc sau:
cot nao ma co nhieu du lieu trung lap thi dat o cot cuoi cung
cot nao ma co it du lieu trung lap thi dat o cot dau tien.
cach nhan biet la lay count(distinct column_name) / count(*) neu ket qua < 0.1 thi dat o cot cuoi cung, neu > 0.1 thi dat o cot dau tien. cot nao lon hon thi dat truoc, cot nao nho hon thi dat sau

SHOW INDEX FROM test_table_001

EXPLAIN SELECT * FROM test_table_001 WHERE a = 1; --OK su dung index idx_abc
EXPLAIN SELECT * FROM test_table_001 WHERE a = 1 and b =2; --OK su dung index idx_abc
EXPLAIN SELECT * FROM test_table_001 WHERE b = 2; --KO su dung index idx_abc
EXPLAIN SELECT * FROM test_table_001 WHERE c = 3; --KO su dung index idx_abc
EXPLAIN SELECT * FROM test_table_001 WHERE a = 1 and c=2 ; --OK su dung index idx_abc nhung chi su dung phan a
EXPLAIN SELECT * FROM test_table_001 WHERE a = 1 and b=2 and c=3; --OK su dung index idx_abc

type: all-cho biet toan bo truy van duoc thuc hien tren bang
system - cho biet 1 phan du lieu trong bang duoc truy van
const - cho biet sql index duoc thuc hien trong truy van cua cau lenh hien tai
index - chi muc phu dang duoc su dung
range - cho biet truy van duoc thuc hien trong khoang thoi gian nhat dinh
ref - cho biet truy van chi muc thong thuong dang duoc su dung
![alt text](image-2.png)
![alt text](image-1.png)

