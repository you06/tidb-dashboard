# tidb-dashboard

> tidb web dashboard

## Quick start

```sh
docker run \
  -p 3333:3000 \
  -d \
  -e TIDB=["http://172.19.0.13:10080"] \
  -e PD=["http://172.19.0.6:2379", "http://172.19.0.8:2379", "http://172.19.0.4:2379"] \
  -e CACHE_TIME=1000 \
  you06/tidb-dashboard
```

## Todo

- [x] Server cache
- [ ] Mobile Support
- [ ] A Go socket.io server
- [ ] Server render initial status
