# tidb-dashboard

> tidb web dashboard

## Quick start

```sh
docker run \
  -p 3333:3000 \
  -d \
  -e TIDB=["192.168.0.1"] \
  -e TIKV=["192.168.0.5", "192.168.0.6"] \
  -e PD=["192.168.0.10", "192.168.0.11"] \
  -e CACHE_TIME=1000 \
  you06/tidb-dashboard
```

## Todo

- [x] Server cache
- [ ] Mobile Support
- [ ] A Go socket.io server
