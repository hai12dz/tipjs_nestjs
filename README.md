section 29
string redis
string redis-cli
---
# Redis
redis kieu du lieu string bao gom cac cach luu data nhu sau: embstring luu data <= 44bytes >,raw >44 bytes ,int luu so
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